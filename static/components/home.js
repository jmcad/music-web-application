const Home = { template: `
<div>
    <div class="banner">
        <img src="/static/images/banner.jpg" alt="">
    </div>

    <div class="article-box">
        <article>
            <img v-bind:src="'/static/images/musictrack.jpg'" alt="">
        </article>
        <article>
            <img v-bind:src="'/static/images/musictrack.jpg'" alt="">
        </article>
        <article>
            <img v-bind:src="'/static/images/musictrack.jpg'" alt="">
        </article>
    </div>
</div>
`}