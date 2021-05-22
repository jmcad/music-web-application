// Vuex
const store = Vuex.createStore({
    state() {
        return {
            tracks: [],
            playlists: [],
        }

    },
    mutations: {
        FETCH_TRACKS(state, tracks) {
            state.tracks = tracks
        },
        // this should update the state of the track...
        // FETCH_TRACK(state, track) {
        //     state.track = track
        // },
        FETCH_PLAYLISTS(state, playlists) {
            state.playlists = playlists
        },
        UPDATE_PLAYLISTS(state, playlists) {
            state.playlists = playlists
        }
    },
    actions: {
        async fetchTracks({ commit }) {
            const response = await fetch('/tracks')
            if (response.status == 200) {
                const result = await response.json()
                commit('FETCH_TRACKS', result)
            }
        },
        async fetchPlaylists({ commit }) {
            const response = await fetch('/playlists')
            if (response.status == 200) {
                const result = await response.json()
                commit('FETCH_PLAYLISTS', result)
            }
        },
        // async fetchTrack({ commit }, trackid) {
        //     const path = `/track/${trackid}`
        //     const response = await fetch(path)
        //     if (response.status == 200) {
        //         const result = await response.json()
        //         console.log(result)
        //         commit('FETCH_TRACK', result)
        //     }
        // }
    },
    // Use getters instead of directly accessing the state
    getters: {
        getTracks: state => {
            return state.tracks
        },
        getPlaylists: state => {
            return state.playlists
        },
        getTrack: state => id => {
            return state.tracks.find(track => track.trackid === id)
        }
    }
})