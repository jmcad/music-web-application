const registration = {
    template: `
    <main class="content main">
        <div class="form-container">
            <form @submit.prevent="register">
                <h1>Create Account</h1>
                <div>
                    <input type="text" required placeholder="Enter your username..." v-model="registerForm.username">
                </div> 
                <div>
                    <input type="password" required placeholder="Enter your password..." v-model="registerForm.password">
                </div>
                <div>
                    <button class="btnCreateAcc" type="submit">CREATE ACCOUNT</button>
                </div>
                <div>
                    <router-link to="/login">I already have an account</router-link>
                </div>
            </form>
        </div>
    </main>
    `,
    data() {
        return {
            registerForm: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        // same process as login method.
        // when user successfully registers,
        // the user is automatically logged in
        // and redirected to the main page
        async register() {
            let response = await fetch('/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.registerForm)
            })
            if (response.status == 200) {
                let result = await response.json()
                this.$store.commit('SET_USER', result)
                this.redirect()
            }
        },
        redirect() {
            this.$router.push({name: 'main'})
        },
    }
}