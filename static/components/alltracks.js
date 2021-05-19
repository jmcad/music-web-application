const alltracks = {
    template: `
    <div>
        <h1>All tracks</h1>
        <select name="sortBy" v-model="sortBy">
            <option>Custom order</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
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
            search: Vue.ref(''),
            sortBy: ''
        }
    },
    computed: {
        filteredTracks() {
            if (this.search != '' && this.search) {
                this.$store.getters.getTracks = this.$store.getters.getTracks.filter(track => {
                    return track.title.toLowerCase().includes(this.search.toLowerCase())
                })
            }

            this.$store.getters.getTracks = this.$store.getters.getTracks.sort((a,b) => {
                if (this.sortBy == 'title') {
                    const fa = a.title.toLowerCase(), fb = b.title.toLowerCase()
                
                    if (fa < fb) {
                        return -1
                    }
                    if (fa > fb) {
                        return 1
                    }
                    return 0
                } else if (this.sortBy == 'artist') {
                    const fa2 = a.artist.toLowerCase(), fb2 = b.artist.toLowerCase()
                
                    if (fa2 < fb2) {
                        return -1
                    }
                    if (fa2 > fb2) {
                        return 1
                    }
                    return 0 
                }
            })
            return this.$store.getters.getTracks
        }

    },
    mounted() {
        return this.$store.dispatch("fetchTracks")
    }
}