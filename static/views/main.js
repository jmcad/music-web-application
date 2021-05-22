const main = {
    template: `
    <main class="content main">
        <div>
            <div class="banner">
                <img src="/static/images/banner.jpg" alt="">
            </div>
            <div class="article-box">
                <tracklist v-for="track in tracks" 
                    :key="track.trackid"
                    :track="track">
                </tracklist>
            </div>
        </div>
    </main>
    `,
    computed: {
        tracks() {
            return this.$store.getters.getTracks
        }
    },
    mounted() {
        return this.$store.dispatch("fetchTracks")
    }
}