const playlists = {
    template: `
    <h1>Playlists</h1>
    <alert :message="message" v-if="showMessage"></alert>
    <div>
        <button class="btnAdd" @click='isHidden = !isHidden'><i class="fas fa-plus"></i></button>
    </div>
    <div class="playlistForm" v-show='isHidden'>
        <form @submit.prevent="createPlaylist">
            <h2>Create New Playlist</h2>
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
    <div id="playlist-container">
        <ul>
            <li v-for="playlist in playlists">
                <div class="playlist-btn">
                    <button class="btnEdit" @click="modal = !modal">Edit</button>
                    <button class="btnDelete" @click="onDeletePlaylist(playlist)">Delete</button>
                </div>
                <div>
                    <h3>{{ playlist.name }}</h3>
                </div>
                <div>
                    <p>{{ playlist.description }}</p>
                </div>
            </li>
        </ul>   
    </div>
    <div v-if="modal">
        <div>
            <form @submit.prevent="onEditPlaylist(playlist)">
                <div>
                    <input type="text" required placeholder="Add a name" v-model="editPlaylistForm.name">
                </div>
                <div>
                    <textarea placeholder="Add an optional description" v-model="editPlaylistForm.description"></textarea>
                </div>
                <button type="submit">Apply changes</button>
                <button>Discard</button>
            </form>
        </div>
    </div>
    `,
    data() {
        return {
            addPlaylistForm: {
                name: '',
                description: '',
                songs: []
            },
            editPlaylistForm: {
                name: '',
                description: '',
                songs: []
            },
            message: '',
            showMessage: false,
            isHidden: false,
            modal: false,
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
                this.$store.commit('UPDATE_PLAYLISTS', result)
                this.message = 'Playlist added!'
                this.showMessage = true
                this.isHidden = false
            }
            this.resetForm()
        },
        async editPlaylist(playlistid) {
            let path = `/playlists/${playlistid}`
            let response = await fetch(path, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.editPlaylistForm)

            })
            if (response.status == 200) {
                let result = await response.json()
                this.$store.commit('UPDATE_PLAYLISTS', result)
                this.message = 'Playlist updated!'
                this.showMessage = true
            }
            this.resetForm()
        },
        async deletePlaylist(playlistid) {
            let path = `/playlists/${playlistid}`
            let response = await fetch(path, {
                method: 'DELETE'
            })
            if (response.status == 200) {
                let result = await response.json()
                this.$store.commit('UPDATE_PLAYLISTS', result)
                this.message = 'Playlist deleted!'
                this.showMessage = true
            }
        },
        onEditPlaylist(playlist) {
            this.editPlaylist(playlist.playlistid)
        },
        onDeletePlaylist(playlist) {
            this.deletePlaylist(playlist.playlistid)
        },
        resetForm() {
            this.addPlaylistForm.name = ''
            this.addPlaylistForm.description = ''
            this.editPlaylistForm.name = ''
            this.editPlaylistForm.description = ''
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