const tracklist = {
    props: ['track'],
    template: `
    <article>
        <router-link v-bind:to="{ name: 'track', params: { trackID: track.trackid } }">
            <img v-bind:src="'/static/images/' + track.cover" alt="">
            <h3>{{ track.title }}</h3>
            <span>{{ track.artist }}</span>
        </router-link>
    </article>
    `
}