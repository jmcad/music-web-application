// Create and mount the root instance.
const app = Vue.createApp({})

app.component('tracklist', tracklist)
app.use(store)
app.use(router)
app.mount('#app')

