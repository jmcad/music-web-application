const track = {
    template: `
    <main class="content main">
        <div>
        <h3>This is the track ID: {{ trackID }}</h3>
            <div class="article-box flexbox">
                <div class="img-box">
                    <img v-bind:src="'/static/images/' + track.cover">
                </div>
                <div class="track-details">
                    <h2>{{ track.title }}</h2>
                    <div>
                        <div>
                            <span>{{ track.artist }}</span>
                        </div>
                    </div>
                </div>
                <div class="player-controls">

                </div>
            </div>
        </div>
    </main>
    `,
    data() {
        return {
            trackID: this.$route.params.trackID,
            currentTrack: {},
            index: 0,
            isPlaying: false,
            audio: new Audio()

        }
    },
    computed: {
        track() {
            return this.$store.getters.getTrack(this.trackID)
        }
    },
    // methods: {
    //     playTrack(song) {
    //         if (typeof song.src != "undefined") {
    //             this.currentTrack = song
    //             this.audio.src = this.currentTrack.src
    //         }
    //         this.audio.play()
    //         this.isPlaying = true
    //     },
    //     pauseTrack() {
    //         this.audio.pause()
    //         this.isPlaying = false
    //     },
    //     // nextTrack() {
    //     //     this.index++
    //     //     if (this.index > this.tracks.length - 1) {
    //     //         this.index = 0
    //     //     }
    //     //     this.currentTrack = this.tracks[this.index]
    //     //     this.play(this.currentTrack)
    //     // },
    //     // previousTrack() {
    //     //     this.index--
    //     //     if (this.index < 0) {
    //     //         this.index = this.tracks.length - 1
    //     //     }
    //     //     this.currentTrack = this.tracks[this.index]
    //     //     this.play(this.currentTrack)
    //     // }
    // },
    // mounted() {
    //     this.currentTrack = this.track
    //     this.audio.src = this.currentTrack.src
    // }
}