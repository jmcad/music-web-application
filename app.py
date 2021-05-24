from flask.helpers import flash
from setup_db import getHashForLogin, getUserByID, getUserByName
from flask import Flask, request, g, abort, session
from werkzeug.security import check_password_hash
import sqlite3
import json
import uuid


app = Flask(__name__)
app.secret_key = 'some_secret'

def get_db():
    if not hasattr(g, '_database'):
        g._database = sqlite3.connect('database.db')
    return g._database

@app.teardown_appcontext
def teardown_db(error):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def valid_login(username, password):
    db = get_db()

    hash = getHashForLogin(db, username)

    if hash != None:
        return check_password_hash(hash, password)
    return False


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/login', methods=['POST'])
def login():
    userdata = request.get_json()
    print(userdata)
    if not valid_login(userdata.get("username", ""), userdata.get("password", "")):
        abort(404)
        
    db = get_db()
    user = getUserByName(db, userdata["username"])

    session["userid"] = user["userid"]
    return user

@app.route("/logout")
def logout():
    session.pop("userid")
    return "OK"


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

        try:
            myplaylist = ("INSERT INTO playlists (playlistid, name, description) VALUES(?,?,?)")
            cur.execute(myplaylist, (playlistid, name, description))
            db.commit()
        except sqlite3.Error as err:
            print(err)
        finally:
            cur.close()

    return json.dumps(getPlaylists())


@app.route('/tracks/<track_id>', methods=['GET'])
def getTrackByID(track_id):
    db = get_db()
    cur = db.cursor()

    try:
        sql = ("SELECT trackid, title, artist, length, cover, source FROM tracks WHERE trackid=?")
        cur.execute(sql, (track_id,))
        for row in cur:
            (trackid, title, artist, length, cover, source) = row
            print(row)
            return {
                "trackid": trackid,
                "title": title,
                "artist": artist,
                "length": length,
                "cover": cover,
                "source": source
            }
    except sqlite3.Error as err:
        print(err)
    finally:
        cur.close()


@app.route('/playlists/<playlist_id>', methods=['PUT','DELETE'])
def singlePlaylist(playlist_id):
    db = get_db()
    cur = db.cursor()

    if request.method == 'PUT':
        playlist_data = request.get_json()
        name = playlist_data.get('name')
        description = playlist_data.get('description')
        try:
            sql = ("UPDATE playlists SET name=?, description=? WHERE playlistid=?")
            cur.execute(sql, (name, description, playlist_id))
            db.commit()
        except sqlite3.Error as err:
            print(err)
        finally:
            cur.close()

    if request.method == 'DELETE':
        try:
            sql = ("DELETE FROM playlists WHERE playlistid=?")
            cur.execute(sql, (playlist_id,))
            db.commit()
        except sqlite3.Error as err:
            print(err)
        finally:
            cur.close()
    
    return json.dumps(getPlaylists())


def getTracks():
    db = get_db()
    cur = db.cursor()
    
    tracks = []

    sql = ("SELECT `trackid`, `title`, `artist`, `length`, `cover`, `source` FROM `tracks`")
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

    sql = "SELECT `playlistid`, `name`, `description` FROM `playlists`"
    cur.execute(sql)
    for (playlistid, name, description) in cur:
        playlists.append({
            "playlistid": playlistid,
            "name": name,
            "description": description
        })

    return playlists


if __name__ == "__main__":
    app.run(debug=True)


