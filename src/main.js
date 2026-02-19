import { getRandom10Pokemon } from './fetch-helpers.js'
import { renderPokemon } from './dom-helpers.js'

getRandom10Pokemon().then((pokemon) => {
    if (pokemon.error) {
        console.log("Failed To Load Pokemon")
    } else {
        renderPokemon(pokemon.data)
    }
})