const library = {
    template: `
    <div class="library content">
        <div class="vertical-bar">
            <div id="tabs">
                <ul>
                    <router-link to="/library/alltracks"><li>All</li></router-link>
                    <router-link to="/library/playlists"><li>Playlist</li></router-link>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
    `,
    computed: {
        tracks() {
            return this.$store.getters.getTracks
        }
    }
}