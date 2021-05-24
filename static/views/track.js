const track = {
    props: ['trackID'],
    template: `
    <main class="content main">
        <div>
            <div class="article-box flexbox">
                <div class="img-box">
                    <img v-bind:src="track.cover">
                </div>
                <div class="track-details">
                    <h2>{{ track.title }}</h2>
                    <div>
                        <div>
                            <span>{{ track.artist }}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <input type="range" min="0" max="100" step="1" v-model="seekValue" @change="onSeek">
                    <audio v-bind:src="track.source" type="audio/mpeg" ref="audioPlayer" @timeupdate="onPlaying"></audio>
                    <p>{{ currentTime }}</p>
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
            currentTime: 0,
            seekValue: 0,
            isPlaying: false,
            volume: 0.3
        }
    },
    computed: {
        track() {
            return this.$store.getters.getTrackByID
        }
    },
    methods: {
        playTrack() {
            this.$refs.audioPlayer.play()
            this.$refs.audioPlayer.volume = this.volume
            this.isPlaying = true
        },
        pauseTrack() {
            this.$refs.audioPlayer.pause()
            this.isPlaying = false
        },
        setSpeed(speed) {
            this.$refs.audioPlayer.playbackRate = speed
        },
        setVolume() {
            const { audioPlayer } = this.$refs
            const adjustVolume = audioPlayer.volume
            
        },
        onPlaying() {
            const { audioPlayer } = this.$refs
            if (!audioPlayer) {
                return
            }
            this.currentTime = audioPlayer.currentTime
            this.seekValue = (audioPlayer.currentTime / audioPlayer.duration) * 100
        },
        onSeek() {
            const { audioPlayer } = this.$refs
            const seekTo = audioPlayer.duration * (this.seekValue / 100)
            audioPlayer.currentTime = seekTo
        }
    },
    mounted () {
        return this.$store.dispatch('fetchTrack', this.trackID)
    }
}