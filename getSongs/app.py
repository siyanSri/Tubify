import os
import re
import zipfile
from dotenv import load_dotenv
from flask import Flask, render_template,request,jsonify, send_file
from fetcher import getPlaylist
from utube import downloadSong


# VARIABLES
progress = 0 #progress tracking, range(0-1)
total = 0 #total tracks in given playlist

playlist = [] #Contains all info on playlist
                #includes: track name, artists, album, release date

file_path = 'D:\songs' #download path, !IMPORTANT(a empty 'songs' folder needs to exsist before running)
zip_file_path = 'D:\songs.zip' #upload zip file

#APP initialize
app = Flask(__name__, static_url_path='', static_folder = os.getcwd()+'\getSongs\static\dist')
app.secret_key = os.getenv("SECRET_KEY") #IMPORTANT add some random key

#Render webpage
@app.route('/')
def index():
    return app.send_static_file('index.html')

#Response to submit in form
@app.route('/process', methods=['POST'])
def process_input():
    global playlist
    global file_path
    global zip_file_path
    
    input_data = request.json.get('input_data')
    if(not(is_valid_spotify_url(input_data))):
       return jsonify(output = "Not A Valid Playlist URL\nTry Again")
    convert(input_data)
    zipper()
    playlist = [] #empty list
    return jsonify(output = "Download Ready")

#download file request
@app.route('/download')
def download():
    global zip_file_path
    return send_file(zip_file_path, as_attachment=True)

#update progress in program
@app.route('/get_progress')
def get_progress():
    return jsonify(progress = getProg())

#individual track info 
@app.route('/get_cardInfo')
def get_cardInfo():
    return jsonify(songs = tracks_info())


def is_valid_spotify_url(url):
    # Define a regular expression pattern for a Spotify playlist URL
    spotify_playlist_pattern = r'https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+'

    # Check if the URL matches any of the Spotify URL patterns
    if (re.match(spotify_playlist_pattern, url)):
        return True
    else:
        return False


#retrive track info
def tracks_info():
    global playlist
    names = []
    artists = []
    albums = []
    year = []
    thumbnail = []

    for track in playlist:
        names.append(track['track']['name'])
        artist_names = [artist['name'] for artist in track['track']['artists']]
        artists.append(', '.join(artist_names))
        albums.append(track['track']['album']['name'])
        year.append(track['track']['album']['release_date'])
        thumbnail.append(track['track']['album']['images'][0]['url'])
    
    all = (names,artists,albums,year,thumbnail)
    return all


#using track info, download each track
def convert(url):
    global total 
    global progress
    global playlist
    
    tracks = []
    artists = []

    playlist = getPlaylist(url)

    tracks = tracks_info()[0] 
    artists = tracks_info()[1] 

    #progress logic
    total = len(tracks)
    progress = total/5 #initial progress

    for i in range(0,len(tracks)):
        downloadSong(tracks[i], artists[i], file_path)
        progress += (total)*(4/5)/total #update progress after each download

#zips all files inside songs folder
def zipper():
    global file_path
    global zip_file_path

    folder_path =   file_path
    zip_filename = zip_file_path


    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(folder_path):
            for file in files:
                file_path = os.path.join(root, file)
                zipf.write(file_path, os.path.relpath(file_path, folder_path))

    return send_file(zip_filename, as_attachment=True)


#access progress variable
def getProg():
    global progress
    global total

    if(progress == 0 or total == 0):
        return 0;

    return progress*1.0/total


if __name__ == '__main__':
    app.run(host = os.getenv("IP_ADDRESS"),port=5000, debug=True)



