const playlists = {
    template: `
    <h1>Playlists</h1>
    <div>
        <button @click='isHidden = !isHidden'><i class="fas fa-plus"></i></button>
    </div>
    <div v-show='isHidden'>
        <h2>Create New Playlist</h2>
        <div>
            <form>
                <div>
                    <input type="text" required placeholder="Playlist name" v-model="name">
                </div>
                <div>
                    <textarea placeholder="Playlist description" v-model="description"></textarea>
                </div>
                <div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    </div>
    <h3>{{ name }}</h3>
    <div>
        <ul>
        </ul>   
    </div> 
    `,
    data() {
        return {
            name: '',
            description: '',
            isHidden: false
        }
    },
}