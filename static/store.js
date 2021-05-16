// Vuex
const store = Vuex.createStore({
    // state() {
    //     return {
    //         tracks: [
    //             {
    //                 "title": "Renegades",
    //                 "artist": "ONE OK ROCK",
    //                 "img": "renegades.jpg",
    //                 "src": "/static/assets/music.mp3"
    //             },
    //             {
    //                 "title": "Track1",
    //                 "artist": "Track1 Artist",
    //                 "img": "musictrack.jpg",
    //                 "src": "/static/assets/ghost.mp3"
    //             },
    //             {
    //                 "title": "Track2 title",
    //                 "artist": "Track2 artist",
    //                 "img": "musictrack.jpg",
    //                 "src": "/static/assets/ghost.mp3"
    //             },
    //             {
    //                 "title": "Track3 title",
    //                 "artist": "Track3 artist",
    //                 "img": "musictrack.jpg",
    //                 "src": "/static/assets/ghost.mp3"
    //             },
    //             {
    //                 "title": "Track4 title",
    //                 "artist": "Track4 artist",
    //                 "img": "musictrack.jpg",
    //                 "src": "/static/assets/ghost.mp3"
    //             },
    //             {
    //                 "title": "Track5 title",
    //                 "artist": "Track5 artist",
    //                 "img": "musictrack.jpg",
    //                 "src": "/static/assets/ghost.mp3"
    //             },
    //             {
    //                 "title": "Track6 title",
    //                 "artist": "Track6 artist",
    //                 "img": "musictrack.jpg",
    //                 "src": "/static/assets/ghost.mp3"
    //             },
    //             {
    //                 "title": "Track7 title",
    //                 "artist": "Track7 artist",
    //                 "img": "musictrack.jpg",
    //                 "src": "/static/assets/ghost.mp3"
    //             },
    //         ]
    //     }
    // },
    state() {
        return {
            tracks: []
        }

    },
    
    mutations: {
        FETCH_TRACKS(state, tracks) {
            state.tracks = tracks;
        }
    },
    actions: {
        async fetchTracks({ commit }) {
            const response = await fetch('/tracks');
            if (response.status == 200) {
                const result = await response.json();
                commit('FETCH_TRACKS', result)
            }
        }
    },
    getters: {
        allTracks: (state) => {
            return state.tracks
        }
    }
})