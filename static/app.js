// Create and mount the root instance.
const app = Vue.createApp({
    data() {
        return {
            mode: 'dark'
        }
    },
})

app.use(store)
app.use(router)
app.mount('#app')