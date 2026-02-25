import { getRandom10Pokemon, getPokemon } from './fetch-helpers.js'
import { mainPageRenderPokemon, renderPokemon } from './dom-helpers.js'

const pokeList = document.querySelector('#poke-list')

getRandom10Pokemon().then((pokemon) => {
    if (pokemon.error) {
        console.log("Failed To Load Pokemon")
    } else {
        mainPageRenderPokemon(pokemon.data)
    }
})

pokeList.addEventListener('click', (e) => {
    const li = e.target.closest('li')
    window.location.href = `info.html?search=${li.dataset.pokeName}`
})
