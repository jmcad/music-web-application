// Define route components.
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/library',
        name: 'library',
        component: Library,
        children: [
            {
                path: 'tracks',
                name: 'tracks',
                component: Tracks
            },
            {
                path: 'albums',
                name: 'albums',
                component: Albums
            },
        ]
    }
]

// Create a router instance and pass the 'routes' option
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

// Create and mount the root instance.
const app = Vue.createApp({})

app.component('item-section', ItemSection)
app.component('albums', Albums)
app.use(router)
app.mount('#app')