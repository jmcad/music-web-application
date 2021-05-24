import sqlite3
import uuid

from werkzeug.security import generate_password_hash

music_data = [
                (uuid.uuid4().hex, 'Renegades', 'ONE OK ROCK', 242, '/static/images/renegades.jpg', '/static/assets/renegades.mp3'),
                (uuid.uuid4().hex, 'Need You', 'Lost Sky', 277, '/static/images/lostsky-needyou.jpg', '/static/assets/Lost Sky - Need You [NCS Release].mp3'),
                (uuid.uuid4().hex, 'Royalty', 'Egzod, Maestro Chives, Neoni', 223, '/static/images/royalty.jpg', '/static/assets/Egzod, Maestro Chives, Neoni - Royalty [NCS Release].mp3'),
             ]

playlist_samples = [
                        (uuid.uuid4().hex, 'My Playlist', 'This is my personal playlist.'),
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
                "trackid VARCHAR(50) PRIMARY KEY, "
                "title VARCHAR(20), "
                "artist VARCHAR(20), "
                "length INTEGER, "
                "cover VARCHAR(20), "
                "source VARCHAR(20))")
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
                "playlistid VARCHAR(50) PRIMARY KEY, "
                "name VARCHAR(20), "
                "description VARCHAR(50))")
    
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

    sql = "DROP TABLE tracks"
    sql2 = "DROP TABLE playlists"

    try:
        cur.execute(sql)
        cur.execute(sql2)
    except sqlite3.Error as err:
        print(err)
    else:
        print("Table dropped!")
    finally:
        cur.close()


# INSERT DATA TO TABLE
def insert_data(conn):
    cur = conn.cursor()

    sqlTracks = "INSERT INTO tracks VALUES (?,?,?,?,?,?)"
    sqlPlaylists = "INSERT INTO playlists VALUES (?,?,?)"

    try:
        cur.executemany(sqlTracks, music_data)
        cur.executemany(sqlPlaylists, playlist_samples)
        conn.commit()
        print("Data inserted to table!")
    except sqlite3.Error as err:
        print(err)
    finally:
        cur.close()


# QUERY the database
def query_data(conn):
    cur = conn.cursor()

    sql = "SELECT * FROM tracks"

    try:
        cur.execute(sql)
        print(cur.fetchall())
    except sqlite3.Error as err:
        print(err)
    finally:
        cur.close()

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
        addUser(conn, "jmcad", generate_password_hash("JMcad98"))
        conn.close()