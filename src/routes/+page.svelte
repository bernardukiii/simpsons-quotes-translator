<script lang="ts">
    import data from '../data/simpsons-quotes.json'

    let results: any[] = $state([])
    
    const searchPhrase = (e: Event) => {
        const searchValue = (e?.target as HTMLInputElement).value
        console.log((e?.target as HTMLInputElement).value)

        if (searchValue.length > 0) {
            console.log('searching...')

            const cleanValue = searchValue.replace('/[\?!]/g', '').toLocaleLowerCase()
            
            return results = data.filter(object => {
                let phrase = object.phrase.toLowerCase();
			    return phrase.includes(cleanValue.toLowerCase())
            })
        }
    }
</script>

<main>
    <section>
        <div>
            <h1>Bienvenidos al traductor de frases-meme de <strong>Los Simpsons</strong></h1>
            <h4>Te pasa que no viste <strong>Los Simpsons</strong> y no entendés las referencias cuando la gente las usa en el día a día?</h4>
            <p>Bueno, además de que te invita a formar parte de un club 'no vi los Simpsons en mi infancia', acá te dejo un buscador de frases-meme donde, si hago bien mi trabajo, te explica el contexto.</p>
        </div>

        <div>
            <input 
                type='text'
                placeholder='Llamaré a los borrachos'
                name='phrase'
                on:input={(e) => searchPhrase(e)}                
            >

            {#each results as quotes, index}
                <ul>
                    <li>
                        <h3>{quotes.phrase}</h3>
                        <p>{quotes.explanation}</p>
                    </li>
                </ul>
                
            {/each}
        </div>
    </section>
</main>
