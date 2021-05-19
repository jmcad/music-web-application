const track = {
    props: ['trackID'],
    template: `
    <main class="content main">
        <div>
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
                    <button class="play" v-if="!isPlaying" @click="playTrack">Play</button>
                    <button class="pause" v-else @click="pauseTrack">Pause</button>
                </div>
            </div>
        </div>
    </main>
    `,
    data() {
        return {
            currentTrack: {},
            index: 0,
            isPlaying: false,
            audio: new Audio()

        }
    },
        // Vuex
    computed: {
        getTrack() {
            if (this.$store.getters.getTracks[this.trackID]) {
                return this.$store.getters.getTracks[this.trackID]
            }
        },
    },
    methods: {
        playTrack(song) {
            if (typeof song.src != "undefined") {
                this.currentTrack = song
                this.audio.src = this.currentTrack.src
            }
            this.audio.play()
            this.isPlaying = true
        },
        pauseTrack() {
            this.audio.pause()
            this.isPlaying = false
        },
        // nextTrack() {
        //     this.index++
        //     if (this.index > this.tracks.length - 1) {
        //         this.index = 0
        //     }
        //     this.currentTrack = this.tracks[this.index]
        //     this.play(this.currentTrack)
        // },
        // previousTrack() {
        //     this.index--
        //     if (this.index < 0) {
        //         this.index = this.tracks.length - 1
        //     }
        //     this.currentTrack = this.tracks[this.index]
        //     this.play(this.currentTrack)
        // }
    },
    created() {
        this.currentTrack = this.getTrack
        this.audio.src = this.currentTrack.src
    },
}