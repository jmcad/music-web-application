const login = {
    template: `
    <main class="content main">
        <div class="loginform">
            <form @submit.prevent="login">
                <div>
                    <label for="username">Username</label>
                    <input type="text" required placeholder="Username" v-model="loginForm.username">
                </div>
                <div>
                    <label for="Password">Password</label>
                    <input type="password" required placeholder="Password" v-model="loginForm.password">
                </div>
                <div>
                    <input type="submit" value="Login">
                </div>
            </form>
        </div>
    </main>
    `,
    data() {
        return {
            loginForm: {
                username: '',
                password: ''   
            }
        }
    },
    methods: {
        async login() {
            let response = await fetch('/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.loginForm)
            })
            if (response.status == 200) {
                let result = await response.json()
                this.$store.commit('SET_USERS', result)
                this.redirect()
            }
        },
        redirect() {
            this.$router.push({name: 'main'})
        }
    }
}