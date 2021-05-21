import uuid
from flask import Flask, request, g
import json
import sqlite3

app = Flask(__name__)

def get_db():
    if not hasattr(g, '_database'):
        g._database = sqlite3.connect('database.db')
    return g._database

@app.teardown_appcontext
def teardown_db(error):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/tracks')
def tracks():
    return json.dumps(getTracks())


@app.route('/playlists', methods=['GET', 'POST'])
def playlists():
    db = get_db()
    cur = db.cursor()

    if request.method == 'POST':
        playlist_data = request.get_json()
        print(playlist_data)
        playlistid = uuid.uuid4().hex
        name = playlist_data.get('name')
        description = playlist_data.get('description')

        myplaylist = ("INSERT INTO `playlists` (`playlist_id`, `name`, `description`) VALUES(?,?,?)")

        try:
            cur.execute(myplaylist, (playlistid, name, description))
            db.commit()
        except sqlite3.Error as err:
            print("hello")
            print(err)
        finally:
            cur.close()

    return json.dumps(getPlaylists())


@app.route('/playlists/<playlist_id>', methods=['DELETE'])
def singlePlaylist(playlist_id):
    db = get_db()
    cur = db.cursor()

    if request.method == 'DELETE':


def getTracks():
    db = get_db()
    cur = db.cursor()
    
    tracks = []

    sql = "SELECT `track_id`, `title`, `artist`, `length`, `cover`, `source` FROM `tracks`"
    cur.execute(sql)
    for (trackid, title, artist, length, cover, source) in cur:
        tracks.append({
            "trackid": trackid,
            "title": title,
            "artist": artist,
            "length": length,
            "cover": cover,
            "src": source
        })

    return tracks


def getPlaylists():
    db = get_db()
    cur = db.cursor()

    playlists = []

    sql = "SELECT `playlist_id`, `name`, `description` FROM `playlists`"
    cur.execute(sql)
    for (playlistid, name, description) in cur:
        playlists.append({
            "playlistid": playlistid,
            "name": name,
            "description": description
        })

    return playlists

def removePlaylist(playlist_id):
    for playlist in getPlaylists():
        if playlist['playlistid'] == playlist_id:
            getPlaylists().remove(playlist)
            return True
    return False


if __name__ == "__main__":
    app.run(debug=True)


