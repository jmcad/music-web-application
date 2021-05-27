const login = {
    template: `
    <main class="content main">
        <div class="form-container">
            <alert :message="message" v-if="showAlert"></alert>
            <form @submit.prevent="login">
            <h1>Log in</h1>
                <div>
                    <input type="text" required placeholder="Username" v-model="loginForm.username">
                </div>
                <div>
                    <input type="password" required placeholder="Password" v-model="loginForm.password">
                </div>
                <div>
                    <button class="btnLogin" type="submit">Login</button>
                </div>
                <div>
                    <router-link to="/register">Create an account</router-link>
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
            },
            message: '',
            showAlert: false
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
            this.message = 'Wrong username or password'
            this.showAlert = true
            this.resetForm()
        },
        redirect() {
            this.$router.push({name: 'main'})
        },
        resetForm() {
            this.loginForm.username = ''
            this.loginForm.password = ''
        }
    }
}