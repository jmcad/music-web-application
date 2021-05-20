// Vuex
const store = Vuex.createStore({
    state() {
        return {
            tracks: Vue.ref([]),
            playlists: Vue.ref([])
        }

    },
    mutations: {
        FETCH_TRACKS(state, tracks) {
            state.tracks = tracks
        },
        FETCH_PLAYLISTS(state, playlists) {
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
        // async postPlaylist({ commit }) {
        //     const response = await fetch('', {
        //         method: 'POST',
        //         body: JSON.stringify(playlist)
        //     })
        //     if (response.status == 200) {
        //         const result = await response.json()
        //         commit('POST_PLAYLIST', result)
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
        }
    }
})