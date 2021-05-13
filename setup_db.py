import sqlite3

database = "database.db"

music_data = [
                (1, 'Ghost', 'Hoshimachi Suisei', 'ghost_suisei.jpg'),
                (2, 'Next Color Planet', 'Hoshimachi Suisei', 'next_color_planet.jpg'),
                (3, 'Mogu Mogu YUMMY!', 'Nekomata Okayu', 'yummy.jpg'),
             ]

# CREATE TABLE
def create_table(conn):
    cur = conn.cursor()

    sql = ("CREATE TABLE tracks ("
                "track_id INTEGER, "
                "title VARCHAR(20), "
                "artist VARCHAR(20), "
                "track_image VARCHAR(20), "
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

    sql = "INSERT INTO tracks VALUES (?,?,?,?)"

    try:
        cur.executemany(sql, music_data)
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
        conn = sqlite3.connect(database)
    except sqlite3.Error as err:
        print(err)
    else:
        drop_table(conn)
        create_table(conn)
        insert_data(conn)
        query_data(conn)
        conn.close()