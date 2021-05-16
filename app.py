from flask import Flask, request, g
import json
import math
import sqlite3

app = Flask(__name__)

TRACKS = [
                {
                    "title": "Renegades",
                    "artist": "ONE OK ROCK",
                    "img": "renegades.jpg",
                    "src": "/static/assets/renegades.mp3"
                },
                {
                    "title": "Need You",
                    "artist": "Lost Sky",
                    "img": "lostsky-needyou.jpg",
                    "src": "/static/assets/Lost Sky - Need You [NCS Release].mp3"
                },
                {
                    "title": "Royalty",
                    "artist": "Egzod, Maestro Chives, Neoni",
                    "img": "royalty.jpg",
                    "src": "/static/assets/Egzod, Maestro Chives, Neoni - Royalty [NCS Release].mp3"
                },
                {
                    "title": "Track3 title",
                    "artist": "Track3 artist",
                    "img": "musictrack.jpg",
                    "src": "/static/assets/ghost.mp3"
                },
                {
                    "title": "Track4 title",
                    "artist": "Track4 artist",
                    "img": "musictrack.jpg",
                    "src": "/static/assets/ghost.mp3"
                },
                {
                    "title": "Track5 title",
                    "artist": "Track5 artist",
                    "img": "musictrack.jpg",
                    "src": "/static/assets/ghost.mp3"
                },
                {
                    "title": "Track6 title",
                    "artist": "Track6 artist",
                    "img": "musictrack.jpg",
                    "src": "/static/assets/ghost.mp3"
                },
                {
                    "title": "Track7 title",
                    "artist": "Track7 artist",
                    "img": "musictrack.jpg",
                    "src": "/static/assets/ghost.mp3"
                },
    ]


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

if __name__ == "__main__":
    app.run(debug=True)


