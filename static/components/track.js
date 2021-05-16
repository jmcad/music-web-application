const track = {
    props: ['trackID'],
    template: `
    <main class="content main">
        <div>
            <h1>This is the track page</h1>
            <div class="article-box flexbox">
                <div class="img-box">
                    <img v-bind:src="'/static/images/' + getTrack.cover">
                </div>
                <div class="track-details">
                    <h2>{{ getTrack.title }}</h2>
                    <div>
                        <div>
                            <span>{{ getTrack.artist }}</span>
                        </div>
                    </div>
                </div>
                <div class="player-controls">
                    <button class="play" v-if="!isPlaying" @click="play">Play</button>
                    <button class="pause" v-else @click="pause">Pause</button>
                </div>
            </div>
        </div>
    </main>
    `,
    data() {
        return {
            current: {},
            isPlaying: false,
            audio: new Audio()

        }
    },
    methods: {
        play(song) {
            if (typeof song.src != "undefined") {
                this.current = song
                this.audio.src = this.current.src
            }

            this.audio.play()
            this.isPlaying = true
        },
        pause() {
            this.audio.pause()
            this.isPlaying = false
        }
    },
    // Vuex
    computed: {
        getTrack() {
            if (this.$store.state.tracks[this.trackID]) {
                return this.$store.state.tracks[this.trackID]
            }
        }
    },
    created() {
        this.current = this.getTrack
        this.audio.src = this.current.src
    }
}