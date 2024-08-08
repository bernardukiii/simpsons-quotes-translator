<script>
    import "../app.css" // tailwind css

    // // Import the Analytics package, and the SvelteKit dev variable. // when we hook up to vercel later on for deployment
    // import { dev } from '$app/environment'
    // import { inject } from '@vercel/analytics'

    // // Inject the Analytics functionality // vercel on prod
    // inject({ mode: dev ? 'development' : 'production' })
</script>


<slot />   

<div id="background-wrap"> 
    <div class="x1">
        <div class="cloud"></div>
    </div>

    <div class="x2">
        <div class="cloud"></div>
    </div>

    <div class="x3">
        <div class="cloud"></div>
    </div>

    <div class="x4">
        <div class="cloud"></div>
    </div>

    <div class="x5">
        <div class="cloud"></div>
    </div>
</div>
