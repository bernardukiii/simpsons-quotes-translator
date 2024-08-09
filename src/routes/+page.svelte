<script lang="ts">
    import data from '../data/simpsons-quotes.json'
    import { Button, Spinner } from 'flowbite-svelte'

    let results: any[] = $state([])
    let character: any[] = $state([])
    let isLoading: boolean = $state(false)
    let visibility: string = $state('')
    let notFound: string = $state('Puede que el personaje que buscás esté de gira... 🎉 🍾')
    
    // API call to get specific character image
    const loadCharacter = async (characterName: string) => {
        visibility = 'hidden'
        isLoading = true
        const names = characterName.split(" ")
        const firstName = names[0].toLocaleLowerCase()

        const res = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${firstName}`)
        const str_res = await res.json()

        if (str_res.length === 0) {
            return [notFound = `${characterName} está de gira, lo sentimos :(   🎉 🍾`, isLoading = false]
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
            return [results = [], notFound = 'Puede que el personaje que buscás esté de gira... 🎉 🍾', character = [], visibility = '']
        }
    }
</script>

<main class="flex justify-center items-center w-full z-10">
    <section class="w-full max-h-[50rem] overflow-hidden flex flex-col m-2 p-2 border-8 border-[#A17BBF] rounded-2xl bg-white
                    2xl:w-1/2 2xl:m-10 2xl:p-4
                    xl:w-1/2  xl:m-10  xl:p-4
                    lg:w-full lg:m-10  lg:p-4
    ">
        <div class="flex flex-col justify-center items-center font-semibold">
            <h1 class="font-semibold text-2xl text-center
                        2xl:text-3xl
                        xl:text-3xl
                        lg:text-3xl
            ">Bienvenidos al traductor de frases-meme de <span class="text-[#FFD90F]">Los Simpsons</span></h1>
            <div class="text-xl p-4 m-2 flex flex-col text-center">
                <h4 class="m-px">Te pasa que no viste <span class="text-[#FFD90F] font-bold">Los Simpsons</span> y no entendés las referencias cuando la gente las usa en el día a día?</h4>
                <p class="m-px">Acá te dejo un buscador de frases-meme donde, si hice bien el trabajo, te explica el contexto.</p>
            </div>
        </div>

        <div class="max-h-full overflow-hidden flex flex-col justify-center items-center">
            <!-- INPUT FIELD -->
            <div class="relative w-3/5 m-2">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="search" 
                    class="block w-full p-2 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                                focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="ej: Llamaré a los borrachos" 
                        oninput={(e) => searchPhrase(e)}                
                />
            </div>
            <!-- LIST OF QUOTES -->
            {#if results.length === 1} 
                <ul class="w-full p-4 m-4 overflow-auto
                    2xl:w-1/2
                    xl:w-1/2
                    lg:w-1/2
                ">
                    <li class="p-4 flex flex-col justify-center items-center">
                        <h3 class="font-bold text-xl text-center mb-2">{results[0]?.phrase}</h3>
                        <p class="text-lg text-start mb-4">{results[0]?.explanation}</p>
                        <div class="flex items-center mb-4">
                            <h4 class="underline font-bold text-md mr-2">Quien dice:</h4>
                            <p class="text-md">{results[0]?.author}</p>
                        </div>
                        <Button onclick={() => loadCharacter(results[0]?.author)} 
                                class={`text-lg font-bold m-4 ${visibility}`}
                                color='green'>
                            Mostrar personaje
                        </Button>
                        
                        {#if !isLoading && character.length === 1 && results[0]?.author === character[0]?.character}
                            <!-- svelte-ignore a11y_img_redundant_alt -->
                            <img width="200px" height="200px" alt="character-image" src={character[0]?.image} />
                        {:else if isLoading}
                            <Spinner color="purple" />
                        {:else}
                            <span class="font-bold text-xl">{notFound}</span>
                        {/if}
                    </li>
                </ul>

            {:else}
                <ul class="w-full h-full overflow-auto my-6
                            2xl:w-1/2
                            xl:w-1/2
                            lg:w-1/2
                ">
                    {#each results as quotes, index}
                        <li class="p-4 flex flex-col justify-center items-center">
                            <h3 class="font-bold text-xl text-center mb-2">{quotes.phrase}</h3>
                            <p class="text-lg text-start mb-4">{quotes.explanation}</p>
                            <div class="flex items-center mb-4">
                                <h4 class="underline font-bold text-md mr-2">Quien dice:</h4>
                                <p class="text-md">{quotes.author}</p>
                            </div>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </section>
</main>
