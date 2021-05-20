const alltracks = {
    template: `
    <div>
        <h1>All tracks</h1>
        <select name="sortBy" v-model="sortBy">
            <option v-for="sortOption in sortOptions" 
                :label="sortOption.label" 
                :value="sortOption.value">
            </option>
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
            sortOptions: [
                { label: 'Custom order', value: 'none' },
                { label: 'Title', value: 'title' },
                { label: 'Artist', value: 'artist' }
            ],
            search: '',
            sortBy: ''
        }
    },
    computed: {
        filteredTracks() {
            const temp = this.$store.getters.getTracks.filter((track) => {
                return track.title.toLowerCase().includes(this.search.toLowerCase())
            })

            if (this.sortBy == 'title') {
                return temp.sort((a, b) => {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1
                    }
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1
                    }
                    return 0
                })
            } else if (this.sortBy == 'artist') {
                return temp.sort((a, b) => {
                    if (a.artist.toLowerCase() < b.artist.toLowerCase()) {
                        return -1
                    }
                    if (a.artist.toLowerCase() > b.artist.toLowerCase()) {
                        return 1
                    }
                    return 0
                })
            } else {
                return temp
            }
        } 
    },
    mounted() {
        return this.$store.dispatch("fetchTracks")
    }
}