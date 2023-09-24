from pytube import Search
from pytube import YouTube
import os


def downloadSong(name , artist, directory):

   #format url
   base  = "https://www.youtube.com/watch?v="
   song = str(Search(name + " " + artist).results[0])

   #gives error if " mark name, so remove if it has
   if(('"') in name):
      name = name.replace('"','')

   filename = name + '.mp3'


   url = base + song.split('=')[1]
   url = url[:len(url)-1]
   #format url

   download_directory = directory

   try:
      video = YouTube(url)
      stream = video.streams.get_audio_only()
      stream.default_filename
      stream.download(download_directory, filename, None, True, None, 0)
      print(name + " is downloaded in MP3")
   except KeyError:
      print("Unable to fetch video information. Please check the video URL or your network connection.")

