// Create and mount the root instance.
const app = Vue.createApp({})

app.use(store)
app.use(router)
app.mount('#app')

