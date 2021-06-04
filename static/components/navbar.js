    const navbar = {
    template: `
    <header>
        <div class="content">
            <div id="logo">
            </div>
            <nav>
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/library">Library</router-link></li>
                    <span class="user" v-if="currentUser.username">
                        {{currentUser.username}}
                        <button class="btnLogout user" @click="logout">Logout</button>
                    </span>
                    <button class="btnLogin user" v-else><router-link to="/login">Login</router-link></button>
                </ul>
            </nav>
        </div>
    </header>
    `,
    data() {
        return {
            loggingOut: false
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.getCurrentUser
        }
    },
    methods: {
        async logout() {
            let response = await fetch('/logout')
            if (response.status != 200) {
                console.log("Failed to log out")
                return
            } else {
                this.$store.dispatch("logout")
            }
        }
    }
}