// make the call to the API in here so it isn't accesible on the client

export function GET() {
    

    // needs to return a Response
    return new Response(JSON.stringify({ message: 'This should be the data'}), { status: 200 })
}