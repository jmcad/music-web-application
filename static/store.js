// Vuex
const store = Vuex.createStore({
    state() {
        return {
            tracks: [],
            playlists: [],
            track: {},
            currentUser: {},
        }
    },
    // mutate the states
    mutations: {
        SET_TRACKS(state, tracks) {
            state.tracks = tracks
        },
        SET_TRACK(state, track) {
            state.track = track
        },
        SET_PLAYLISTS(state, playlists) {
            state.playlists = playlists
        },
        UPDATE_PLAYLISTS(state, playlists) {
            state.playlists = playlists
        },
        SET_USER(state, currentUser) {
            state.currentUser = currentUser
        },
        LOGOUT_USER(state) {
            state.currentUser = {}
        }
    },
    // commit the mutations
    actions: {
        async fetchTracks({ commit }) {
            let response = await fetch('/tracks')
            if (response.status == 200) {
                let result = await response.json()
                commit('SET_TRACKS', result)
            }
        },
        async fetchPlaylists({ commit }) {
            let response = await fetch('/playlists')
            if (response.status == 200) {
                let result = await response.json()
                commit('SET_PLAYLISTS', result)
            }
        },
        async fetchTrack({ commit }, track_id) {
            let path = `/tracks/${track_id}`
            let response = await fetch(path)
            if (response.status == 200) {
                let result = await response.json()
                commit('SET_TRACK', result)
            }
        },
        logout({ commit }) {
            commit('LOGOUT_USER')
        }
    },
    // Use getters instead of directly accessing the state
    getters: {
        getTracks: state => {
            return state.tracks
        },
        getPlaylists: state => {
            return state.playlists
        },
        getTrackByID: state => {
            return state.track
        },
        getCurrentUser: state => {
            return state.currentUser
        }
    }
})