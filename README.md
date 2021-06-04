# Exam Project #
For this exam project, I will create a music web application.

## Technologies used ##
* Python Flask
* SQLite
* Vue3
* Vuex
* Vue-Router
* Plain CSS

## How to run ##
    If database.db is not present or corrupted, rerun setup_db.py in the app folder
    Start the application by running app.py in the app folder

## List of functionalities ##
* Home page consist of a banner and lists four main tracks
    * Library page have consists of two child routes (alltracks and playlists)
        * User can click on the categories and be redirected to the clicked category
* In all tracks page, all songs are displayed
    * Users can sort by title, artist or genre
    * Can search for a specific song track
* Created or existing playlists are displayed in the playlists page & users can:
    * add a new playlist
    * edit playlists
    * delete playlists
        * Users are asked if they want to really delete the playlist
* Users can login or register a new account
    * If the user enters a wrong or non existing account, an alert message is displayed
    * After registering, the user is automatically logged in and redirected to the main page
    * Username is displayed on the navigation bar when logged in
* Users are redirected to the track page when clicked on a specific track
* Song tracks can be played with a custom audio player
    * The audio player consists of seek, volume, and play/pause functionalities
    * Displays the current time of the song
    * User can like the track
* All forms are cleared and closed after creating/editing a playlist or when loggin in with incorrect username or password
