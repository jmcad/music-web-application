from flask import Flask, request, g
import json
import math
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

# TODO: Get data fro database
def getPlaylists():
    db = get_db()
    cur = db.cursor()

    playlists = []

    sql = "SELECT `name`, `description` FROM `playlists`"

    return playlists


if __name__ == "__main__":
    app.run(debug=True)


