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
    }
]

// Create a router instance and pass the 'routes' option
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

// Create and mount the root instance.
const app = Vue.createApp({
    data: function(){
        return {
            albums: [],
            album_id: ""
        }
    },
    created: async function(){
        const response = await fetch('/albums');
        if (response.status == 200){
            const result = await response.json();
            this.albums = result;
        }
    },
    methods: {
        show: function(id){
            console.log("show ", id);
            this.album_id = id;
        }
    }
})

app.component("album-info", albuminfo)
app.use(router)
app.mount('#app')