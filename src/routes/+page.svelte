<script lang="ts">
    import data from '../data/simpsons-quotes.json'

    let results: any[] = $state([])
    let character: any[] = $state([])
    let isLoading: boolean = $state(false)
    let notFound: string = $state('Puede que el personaje que buscás esté de gira...')
    
    // API call to get specific character image
    const loadCharacter = async (characterName: string) => {
        isLoading = true
        const names = characterName.split(" ")
        const firstName = names[0].toLocaleLowerCase()

        const res = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${firstName}`)
        const str_res = await res.json()

        if (str_res.length === 0) {
            return [notFound = `${characterName} está de gira, lo sentimos :( `, isLoading = false]
        }
        
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
            return [results = [], notFound = 'Puede que el personaje que buscás esté de gira...']
        }
    }
</script>

<main class="flex justify-center items-center w-full z-10">
    <section class="w-1/2 h-full flex flex-col m-10 p-4">
        <div class="bg-purple-300 flex flex-col justify-center items-center">
            <h1 class="font-semibold text-3xl">Bienvenidos al traductor de frases-meme de <span class="text-yellow-300">Los Simpsons</span></h1>
            <div class="text-xl p-4 m-2 flex flex-col text-center">
                <h4 class="m-px">Te pasa que no viste <span class="text-yellow-300">Los Simpsons</span> y no entendés las referencias cuando la gente las usa en el día a día?</h4>
                <p class="m-px">Bueno, además de que te invita a formar parte de un club 'no vi los Simpsons en mi infancia', acá te dejo un buscador de frases-meme donde, si hago bien mi trabajo, te explica el contexto.</p>
            </div>
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
                        {:else}
                            <span>{notFound}</span>
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
