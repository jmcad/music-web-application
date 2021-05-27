// Create and mount the root instance.
const app = Vue.createApp({})


app.component('navbar', navbar)
app.component('tracklist', tracklist)
app.component('alert', alert)
app.use(store)
app.use(router)
app.mount('#app')

