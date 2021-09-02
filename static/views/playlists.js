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
                <textarea placeholder="Playlist description" v-model="addPlaylistForm.description" maxlength="50"></textarea>
            </div>
            <div>
                <button class="btnSave" type="submit">Save</button>
            </div>
        </form>
    </div>
    <div id="playlist-container" v-for="playlist in playlists" :key="playlist.playlistid">
        <ul>
            <li>
                <div class="playlist-btn">
                    <button class="btnEdit" @click="isModal = !isModal" @click="editingID = playlist.playlistid">Edit</button>
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
        <div class="playlistForm" v-if="editingID == playlist.playlistid" v-show='isModal'>
            <form @submit.prevent="onEditPlaylist(editingID)">
                <h2>Edit Playlist: {{ playlist.name }}</h2>
                <div>
                    <input type="text" required placeholder="Add a name" v-model="editPlaylistForm.name">
                </div>
                <div>
                    <textarea placeholder="Add an optional description" v-model="editPlaylistForm.description" maxlength="50"></textarea>
                </div>
                <button class="btnSave" type="submit">Apply changes</button>
                <button @click="isModal = !isModal">Discard</button>
            </form>
        </div> 
    </div>  
    `,
    data() {
        return {
            addPlaylistForm: {
                name: '',
                description: '',
            },
            editPlaylistForm: {
                id: '',
                name: '',
                description: '',
            },
            message: '',
            showMessage: false,
            isHidden: false,
            loading: false,
            isModal: false,
            editingID: ''
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
        onEditPlaylist(playlistid) {
            this.editPlaylist(playlistid)
            this.isModal = false
        },
        onDeletePlaylist(playlist) {
            let response = confirm(`Are you sure you want to delete ${playlist.name}`)
            if (response) {
                this.deletePlaylist(playlist.playlistid)
            }
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