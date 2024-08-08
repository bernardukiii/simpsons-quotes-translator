<script lang="ts">
    import data from '../data/simpsons-quotes.json'

    let results: any[] = $state([])
    let character: any[] = $state([])
    let isLoading: boolean = $state(false)
    
    // API call to get specific character image
    const loadCharacter = async (characterName: string) => {
        isLoading = true
        const names = characterName.split(" ")
        const firstName = names[0].toLocaleLowerCase()

        const res = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${firstName}`)
        const str_res = await res.json()

        return [character = str_res, isLoading = false]
    }

    const searchPhrase = (e: Event) => {
        const searchValue = (e?.target as HTMLInputElement).value
        console.log((e?.target as HTMLInputElement).value)

        if (searchValue.length > 0) {
            const cleanValue = searchValue.replace('/[\?!]/g', '').toLocaleLowerCase()
            var normalizedValue = cleanValue.normalize('NFD').replace(/\p{Diacritic}/gu, '') // get rid of tildes in Spanish for example

            return results = data.filter(object => {
                let phrase = object.phrase.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
			    return phrase.includes(normalizedValue.toLowerCase())
            })
        } else if (searchValue.length === 0) {
            return results = []
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
                oninput={(e) => searchPhrase(e)}                
            >
            {#if results.length === 1} 
                <ul>
                    <li>
                        <h3>{results[0]?.phrase}</h3>
                        <p>{results[0]?.explanation}</p>
                        <div>
                            <h4>Quien dice:</h4>
                            <p>{results[0]?.author}</p>
                        </div>
                        <button onclick={() => loadCharacter(results[0]?.author)}>Mostrar personaje</button>
                        
                        {#if !isLoading && character.length === 1 && results[0]?.author === character[0]?.character}
                            <!-- svelte-ignore a11y_img_redundant_alt -->
                            <img alt="character-image" src={character[0]?.image} />
                        {:else if isLoading}
                            <span>Cargando imagen...</span>
                        {/if}
                    </li>
                </ul>

                {:else}
                    {#each results as quotes, index}
                    <ul>
                        <li>
                            <h3>{quotes.phrase}</h3>
                            <p>{quotes.explanation}</p>
                            <div>
                                <h4>Quien dice:</h4>
                                <p>{quotes.author}</p>
                            </div>
                        </li>
                    </ul>
                {/each}
            {/if}
        </div>
    </section>
</main>
