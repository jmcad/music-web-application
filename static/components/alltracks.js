const alltracks = {
    template: `
    <div>
        <h1>All tracks</h1>
        <select>
            <option>Custom order</option>
            <option>Title</option>
        </select>
        <input type="text" v-model="search" placeholder="Search"/>
    </div>
    <div class="framedbox">
        <div class="article-box">
            <article v-for="track, index in filteredTracks" :key="track.title">
                <router-link v-bind:to="{ name: 'track', params: { trackID: index } }">
                    <img v-bind:src="'/static/images/' + track.cover" alt="">
                    <h3>{{ track.title }}</h3>
                    <span>{{ track.artist }}</span>
                </router-link>
            </article> 
        </div>
    </div>
    `,
    data() {
        return {
            sortoptions: ['Custom order', 'Title', 'Artist'],
            search: ""
        }
    },
    computed: {
        filteredTracks() {
            return this.$store.state.tracks.filter(track => 
                track.title.toLowerCase()
                .includes(this.search.toLowerCase()))
        },
        sortedArray() {
            const sortedTracks = this.filteredTracks

            sortedTracks = sortedTracks.sort((a,b) => {
                const fa = a.title.toLowerCase(), fb = b.title.toLowerCase()
                
                if (fa < fb) {
                    return -1
                }
                if (fa > fb) {
                    return 1
                }
                return 0
            })
        }

    },
    mounted() {
        return this.$store.dispatch("fetchTracks")
    },
}