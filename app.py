from flask import Flask, request, g
import json
import math

app = Flask(__name__)

TRACKS = [
                {
                    "title": "Renegades",
                    "artist": "ONE OK ROCK",
                    "img": "renegades.jpg",
                    "src": "/static/assets/music.mp3"
                },
                {
                    "title": "Track1",
                    "artist": "Track1 Artist",
                    "img": "musictrack.jpg",
                    "src": "/static/assets/ghost.mp3"
                },
                {
                    "title": "Track2 title",
                    "artist": "Track2 artist",
                    "img": "musictrack.jpg",
                    "src": "/static/assets/ghost.mp3"
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
    return json.dumps(TRACKS)

def getTracks():
    # TODO: Fetch data from database

    tracks = {}

    return tracks

if __name__ == "__main__":
    print(TRACKS)
    app.run()


