const playlists = {
    template: `
    <h1>Playlists</h1>
    <div>
        <button><i class="fas fa-plus"></i></button>
    </div>
    <div>
        <h2>Add New Playlist</h2>
        <div>
            <form @submit.prevent="addNewPlaylist">
                <label>New Playlist</label>
                <input v-model="newPlaylist">
                <button>Save</button>
            </form>
        </div>
    </div>
    <div>
        <ul>
            <li v-for="playlist in playlists" :key="playlist.id">
                <h3>{{ playlist.content }}</h3>
            </li>
        </ul>   
    </div> 
    `,
    setup() {
        const newPlaylist = Vue.ref('')
        const playlists = Vue.ref([])

        function addNewPlaylist() {
            playlists.value.push({
                id: Date.now(),
                content: newPlaylist.value
            })
            newPlaylist.value = ''
        }

        return {
            playlists,
            newPlaylist,
            addNewPlaylist
        }
    }
}