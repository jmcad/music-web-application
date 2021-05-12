// Define route components.
const Home = { template: `
<div>
    <div class="banner">
        <img src="/static/images/banner.jpg" alt="">
    </div>

    <div class="article-box">
        <article>
            <a href="">
                <img src="/static/images/musictrack.jpg" alt="vivy">
            </a>
        </article>
        <article>
            <a href="">
                <img src="/static/images/musictrack.jpg" alt="gunjou">
            </a>
        </article>
        <article>
            <a href="">
                <img src="/static/images/musictrack.jpg" alt="tabun">
            </a>
        </article>
    </div>
</div>
`}

const Library = { template: `
        <div class="article-box">
            <div class="track">
                <h1>Now Playing</h1>
                <img src="/static/images/musictrack.jpg" alt="">
            </div>
            <div class="categories">
                <ul>
                    <li><a href="">Tracks</a></li>
                    <li><a href="">Playlist</a></li>
                    <li><a href="">Likes</a></li>
                    <li><a href="">Albums</a></li>
                    <li><a href="">Artists</a></li>
                    <li><a href="">Genre</a></li>
                </ul>
            </div>
        </div>
        `
}

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

const router = new VueRouter({
    routes
});

const app = new Vue({
    router
}).$mount('#app')