import sqlite3

music_data = [
                (1, 'Ghost', 'Hoshimachi Suisei', 281, 'ghost.jpg', '/static/assets/GHOST.mp3'),
                (2, 'Next Color Planet', 'Hoshimachi Suisei', 260, 'nextcolorplanet.jpg', '/static/assets/NEXT COLOR PLANET.mp3'),
                (3, 'Mogu Mogu YUMMY!', 'Nekomata Okayu', 200, 'yummy.jpg', '/static/assets/YUMMY.mp3'),
                (4, 'Renegades', 'ONE OK ROCK', 242, 'renegades.jpg', '/static/assets/renegades.mp3'),
                (5, 'Need You', 'Lost Sky', 277, 'lostsky-needyou.jpg', '/static/assets/Lost Sky - Need You [NCS Release].mp3'),
                (6, 'Royalty', 'Egzod, Maestro Chives, Neoni', 223, 'royalty.jpg', '/static/assets/Egzod, Maestro Chives, Neoni - Royalty [NCS Release].mp3'),
             ]

# CREATE TABLE
def create_table(conn):
    cur = conn.cursor()

    sql = ("CREATE TABLE tracks ("
                "track_id INTEGER, "
                "title VARCHAR(20), "
                "artist VARCHAR(20), "
                "length INTEGER, "
                "cover VARCHAR(20), "
                "source VARCHAR(20), "
                "PRIMARY KEY(track_id))")
    try:
        cur.execute(sql)
    except sqlite3.Error as err:
        print(err)
    else:
        print("Table created!")
    finally:
        cur.close()

# DROP TABLE
def drop_table(conn):
    cur = conn.cursor()

    sql = "DROP TABLE tracks"

    try:
        cur.execute(sql)
    except sqlite3.Error as err:
        print(err)
    else:
        print("Table dropped!")
    finally:
        cur.close()

# INSERT DATA TO TABLE
def insert_data(conn):
    cur = conn.cursor()

    sql = "INSERT INTO tracks VALUES (?,?,?,?,?,?)"

    try:
        cur.executemany(sql, music_data)
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

if __name__ == "__main__":
    try:
        conn = sqlite3.connect("database.db")
    except sqlite3.Error as err:
        print(err)
    else:
        drop_table(conn)
        create_table(conn)
        insert_data(conn)
        # query_data(conn)
        conn.close()