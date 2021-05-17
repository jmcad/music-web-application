// Define route components.
const routes = [
    {
        path: '/',
        name: 'main',
        component: main,
    },
    {
        path: '/library',
        name: 'library',
        component: library,
        children: [
            {
                path: 'alltracks',
                name: 'alltracks',
                component: alltracks
            },
            {
                path: 'playlists',
                name: 'playlists',
                component: playlists
                
            }
        ]
    },
    {
        path: '/track/:trackID',
        name: 'track',
        component: track,
        props: true
    }
]

// Create a router instance and pass the 'routes' option
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})