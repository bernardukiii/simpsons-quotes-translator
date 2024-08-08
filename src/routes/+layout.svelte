<script>
    import "../app.css" // tailwind css

    // // Import the Analytics package, and the SvelteKit dev variable. // when we hook up to vercel later on for deployment
    // import { dev } from '$app/environment'
    // import { inject } from '@vercel/analytics'

    // // Inject the Analytics functionality // vercel on prod
    // inject({ mode: dev ? 'development' : 'production' })
</script>
  
<slot /> <!--Like the Reacts equivalent of children-->