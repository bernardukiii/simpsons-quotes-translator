// make the call to the API in here so it isn't accesible on the client

import { IMAGES_API } from '$env/static/private' // import from .env file


export async function GET() {
    // make the call to the external API
    const res = await fetch(IMAGES_API)
    const simpson_images = await res.json()
    // return the Response passing the retrieved data
    return new Response(JSON.stringify(simpson_images), { status: 200 })
}