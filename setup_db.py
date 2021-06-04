from werkzeug.security import generate_password_hash
import sqlite3
import uuid

# DATA
music_data = [
                (uuid.uuid4().hex, 'Renegades', 'ONE OK ROCK', 'Rock', 'Single', '/static/images/renegades.jpg', '/static/assets/renegades.mp3'),
                (uuid.uuid4().hex, 'Need You', 'Lost Sky', 'EDM', 'Single', '/static/images/lostsky-needyou.jpg', '/static/assets/Lost Sky - Need You [NCS Release].mp3'),
                (uuid.uuid4().hex, 'Royalty', 'Egzod, Maestro Chives, Neoni', 'EDM', 'Single', '/static/images/royalty.jpg', '/static/assets/Egzod, Maestro Chives, Neoni - Royalty [NCS Release].mp3'),
                (uuid.uuid4().hex, 'Broken Heart of Gold', 'ONE OK ROCK', 'Rock', 'Single', '/static/images/broken heart of gold.jpg', '/static/assets/Broken Heart of Gold.mp3'),
                (uuid.uuid4().hex, 'Boulevard of Broken Dreams', 'Green Day', 'Rock', 'Single', '/static/images/Boulevard Of Broken Dreams.png', '/static/assets/Boulevard of Broken Dreams.mp3'),
                (uuid.uuid4().hex, 'Uptown Funk ft. Bruno Mars', 'Mark Ronson', 'Funk', 'Album', '/static/images/uptownfunk.jpg', '/static/assets/Uptown Funk ft. Bruno Mars.mp3'),
                (uuid.uuid4().hex, "We Don't Talk Anymore feat. Selena Gomez", 'Charlie Puth', 'Pop', 'Album', "/static/images/ninetrackmind.jpg", "/static/assets/We Don't Talk Anymore feat. Selena Gomez.mp3"),
                (uuid.uuid4().hex, "Butter", 'BTS', 'K-Pop', 'Single', "/static/images/butter.jpg", "/static/assets/Butter.mp3"),
                (uuid.uuid4().hex, "On The Ground", 'ROSÉ', 'Pop', 'Single', "/static/images/ontheground.jpg", "/static/assets/On The Ground.mp3"),
                (uuid.uuid4().hex, "Waste It On Me", 'Steve Aoki', 'Dance/Electronic', 'Album', "/static/images/neonfuture3.jpg", "/static/assets/Waste It On Me.mp3"),
                (uuid.uuid4().hex, "Dynamite (Tropical Remix)", 'BTS', 'Pop', 'Single', "/static/images/dynamite.jpg", "/static/assets/Dynamite (Tropical Remix).mp3"),
                (uuid.uuid4().hex, "Angel With a Shotgun", 'The Cab', 'Rock', 'Album', "/static/images/symphonysoldier.jpg", "/static/assets/Angel With a Shotgun.mp3")
             ]


playlist_samples = [
                        (uuid.uuid4().hex, 'My Playlist', 'Sample playlist.'),
                        (uuid.uuid4().hex, 'Cool Playlist', 'The coolest playlist ever!'),
                    ]


# CREATE TABLE
def create_users_table(conn):
    cur = conn.cursor()

    try:
        usersql = ("CREATE TABLE users ("
                        "userid INTEGER PRIMARY KEY, "
                        "username TEXT NOT NULL, "
                        "passwordhash TEXT NOT NULL, "
                        "UNIQUE(username))")

        cur.execute(usersql)
        conn.commit()
    except sqlite3.Error as err:
        print(err)
    else:
        print("Users table created!")
    finally:
        cur.close


def create_tracks_table(conn):
    cur = conn.cursor()

    sql = ("CREATE TABLE tracks ("
                "trackid TEXT PRIMARY KEY, "
                "title TEXT, "
                "artist TEXT, "
                "genre TEXT, "
                "type TEXT, "
                "cover TEXT, "
                "source TEXT) ")
    try:
        cur.execute(sql)
    except sqlite3.Error as err:
        print(err)
    else:
        print("Tracks table created!")
    finally:
        cur.close()


def create_playlists_table(conn):
    cur = conn.cursor()

    sql = ("CREATE TABLE playlists ("
                "playlistid TEXT PRIMARY KEY, "
                "name TEXT, "
                "description TEXT)")
    
    try:
        cur.execute(sql)
    except sqlite3.Error as err:
        print(err)
    else:
        print("Playlists table created!")
    finally:
        cur.close()


# DROP TABLE
def drop_table(conn):
    cur = conn.cursor()

    sqltracks = "DROP TABLE tracks"
    sqlplaylists = "DROP TABLE playlists"
    sqlusers = "DROP TABLE users"

    try:
        cur.execute(sqltracks)
        cur.execute(sqlplaylists)
        cur.execute(sqlusers)
    except sqlite3.Error as err:
        print(err)
    else:
        print("Table dropped!")
    finally:
        cur.close()


# INSERT DATA TO TABLE
def insert_data(conn):
    cur = conn.cursor()

    try:
        sqlTracks = "INSERT INTO tracks VALUES (?,?,?,?,?,?,?)"
        sqlPlaylists = "INSERT INTO playlists VALUES (?,?,?)"
        cur.executemany(sqlTracks, music_data)
        cur.executemany(sqlPlaylists, playlist_samples)
        conn.commit()
        print("Data inserted to table!")
    except sqlite3.Error as err:
        print(err)
    finally:
        cur.close()


# USER/AUTHENTICATION FUNCTIONS
def addUser(conn, username, hash):
    cur = conn.cursor()
    try:
        sql = ("INSERT INTO users (username, passwordhash) VALUES (?,?)")
        cur.execute(sql, (username, hash))
        conn.commit()
    except sqlite3.Error as err:
        print(err)
        return -1
    else:
        print("User {} created with id {}. ".format(username, cur.lastrowid))
    finally:
        cur.close()


def getUserByID(conn, userid):
    cur = conn.cursor()

    try:
        sql = ("SELECT userid, username FROM users WHERE userid=?")
        cur.execute(sql, (userid,))
        for row in cur:
            (id,name) = row
            return {
                "username": name,
                "userid": id
            }
        else:
            return {
                "username": None,
                "userid": None
            }
    except sqlite3.Error as err:
        print("Error: {}".format(err))
    finally:
        cur.close()


def getUserByName(conn, username):
    cur = conn.cursor()
    try:
        sql = ("SELECT userid, username FROM users WHERE username=?")
        cur.execute(sql, (username,))
        for row in cur:
            (id,name) = row
            return {
                "username": name,
                "userid": id
            }
        else:
            return {
                "username": username,
                "userid": None
            }
    except sqlite3.Error as err:
        print("Error: {}".format(err))
    finally:
        cur.close()


def getHashForLogin(conn, username):
    cur = conn.cursor()
    try:
        sql = ("SELECT passwordhash FROM users WHERE username=?")
        cur.execute(sql, (username,))

        for row in cur:
            (passhash,) = row
            return passhash
        else:
            return None
    except sqlite3.Error as err:
        print("Error: {}".format(err))
    finally:
        cur.close()


if __name__ == "__main__":
    try:
        conn = sqlite3.connect("database.db")
    except sqlite3.Error as err:
        print(err)
    else:
        drop_table(conn)
        create_users_table(conn)
        create_tracks_table(conn)
        create_playlists_table(conn)
        insert_data(conn)
        conn.close()