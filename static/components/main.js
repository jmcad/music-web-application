const main = {
    template: `
    <main class="content main">
        <div>
            <div class="banner">
                <img src="/static/images/banner.jpg" alt="">
            </div>
            
            <div class="article-box">
                <article v-for="track in tracks">
                    <router-link tag="li" v-bind:to="{ name: 'track', params: { trackID: track.trackid } }">
                        <img v-bind:src="'/static/images/' + track.cover" alt="">
                        <h3>{{ track.title }}</h3>
                        <span>{{ track.artist }}</span>
                    </router-link>
                </article> 
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