const registration = {
    template: `
    <main class="content main">
        <div class="form-container">
            <form>
                <h1>Create Account</h1>
                <div>
                    <input type="text" required placeholder="Enter your name..." v-model="registerForm.name">
                </div>
                <div>
                    <input type="email" required placeholder="Enter your email..." v-model="registerForm.email">
                </div> 
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
                name: '',
                email: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async register() {
            let response = await fetch('/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.registerForm)
            })
            if (response.status == 200) {
                let result = await response.json()
            }
        }
    }
}