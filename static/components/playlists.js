const playlists = {
    template: `
    <h1>Playlists</h1>
    <div>
        <button @click='isHidden = !isHidden'><i class="fas fa-plus"></i></button>
    </div>
    <div v-show='isHidden'>
        <h2>Create New Playlist</h2>
        <div>
            <form @submit.prevent="createPlaylist">
                <div>
                    <input type="text" required placeholder="Playlist name" v-model="addPlaylistForm.name">
                </div>
                <div>
                    <textarea placeholder="Playlist description" v-model="addPlaylistForm.description"></textarea>
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    </div>
    <div>
        <ul>
            <li v-for="playlist in playlists">
                <div>
                    <h3>{{ playlist.name }}</h3>
                    <h3>{{ playlist.description }}</h3>
                </div>
            </li>
        </ul>   
    </div> 
    `,
    data() {
        return {
            addPlaylistForm: {
                track_id: '',
                name: '',
                description: '',
                songs: []
            },
            isHidden: false
        }
    },
    methods: {
        async createPlaylist() {
            let response = await fetch('/playlists', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.addPlaylistForm)
            })
            if (response.status == 200) {
                let result = await response.json()
                this.$store.commit('UPDATED_PLAYLIST', result)
            }
        }
    },
    computed: {
        playlists() {
            return this.$store.getters.getPlaylists
        }
    },
    mounted() {
        return this.$store.dispatch('fetchPlaylists')
    }
}