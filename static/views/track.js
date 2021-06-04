const track = {
    props: ['trackID'],
    template: `
    <main class="content main">
        <div>
            <div>
                <div class="img-box">
                    <img v-bind:src="track.cover">
                </div>
                <div class="track-details">
                    <h2>{{ track.title }}</h2>
                    <span>{{ track.type }} • {{ track.artist }}</span>
                </div>
                <div class="playercontainer">
                    <div class="slidercontainer">
                        <audio v-bind:src="track.source" type="audio/mpeg" ref="player" @timeupdate="progress"></audio>
                        <input class="slider" type="range" min="0" max="100" step="1" v-model="seekValue" @change="seek">
                        <span v-if="currentTime == 0">00 : 00</span>
                        <span v-else>{{ currentTime.m }} : {{currentTime.s }}</span>
                        <input class="slider" type="range" min="0" max="100" step="1" v-model="volume" @change="setVolume">
                        <span>Volume: {{ volume }}</span>
                        <div>
                            <button class="play" v-if="!isPlaying" @click="playTrack">
                                <i class="fa fa-play" aria-hidden="true"></i>
                            </button>
                            <button class="pause" v-else @click="pauseTrack">
                                <i class="fa fa-pause" aria-hidden="true"></i>
                            </button>

                            <button class="btnLike" v-if="!liked" @click="liked=true">
                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                            </button>
                            <button class="btnLike" v-else @click="liked=false">
                            <i class="fa fa-heart" aria-hidden="true"></i>
                            </button> 
                        </div>
                    </div> 
                </div> 
            </div>
        </div>
    </main>
    `,
    data() {
        return {
            currentTime: 0,
            seekValue: 0,
            isPlaying: false,
            volume: 100,
            liked: false,
        }
    },
    computed: {
        track() {
            return this.$store.getters.getTrackByID
        }
    },
    methods: {
        // used refs to manipulate/access information such as audio controls
        playTrack() {
            this.$refs.player.play()
            this.isPlaying = true
        },
        pauseTrack() {
            this.$refs.player.pause()
            this.isPlaying = false
        },
        setVolume() {
            let adjustVolume = this.volume / 100
            this.$refs.player.volume = adjustVolume
            
        },
        // progress method is called when timeUpdate is emitted
        progress() {
            if (!this.$refs.player) {
                return
            }
            this.currentTime = this.secondsToTime(this.$refs.player.currentTime)
            // update seekValue to be in sync with currentTime
            this.seekValue = (this.$refs.player.currentTime 
                        / this.$refs.player.duration) * 100
        },
        // 
        seek() {
            let seekTo = this.$refs.player.duration * (this.seekValue / 100)
            this.$refs.player.currentTime = seekTo
        },
        secondsToTime(sec) {
            let minutes = Math.floor((sec % (60 * 60)) / 60)

            let seconds = Math.ceil((sec % (60 * 60)) % 60)

            let timeObject = {
                'm': this.timeFormat(minutes),
                's': this.timeFormat(seconds)
            }
            return timeObject
        },
        timeFormat(time) {
            return parseInt(time) < 10 ? ('0' + time) : time
        }

    },
    mounted () {
        // calls the 'fetchTrack' action in store
        return this.$store.dispatch('fetchTrack', this.trackID)
    }
}