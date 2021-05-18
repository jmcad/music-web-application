// Vuex
const store = Vuex.createStore({
    state() {
        return {
            tracks: [],
            isPlaying: false,
            audio: new Audio()
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
})