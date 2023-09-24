from dotenv import load_dotenv
import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


load_dotenv()
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")


def getPlaylist(url):
    spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id,client_secret,))
    results = spotify.playlist_tracks(url)
    return results['items']


