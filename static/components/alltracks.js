const alltracks = {
    template: `
    <div>
        <h1>All tracks</h1>
        <select>
            <option>Custom order</option>
            <option>Title</option>
            <option>Artist</option>
        </select>
    </div>
    <div class="framedbox">
        <div class="article-box">
            <article v-for="track, index in tracks">
                <router-link v-bind:to="{ name: 'track', params: { trackID: index } }">
                    <img v-bind:src="'/static/images/' + track.img" alt="">
                    <h3>{{ track.title }}</h3>
                    <span>{{ track.artist }}</span>
                </router-link>
            </article> 
        </div>
    </div>
    `,
    computed: {
        tracks() {
            return store.getters.alltracks
        }
    },
}