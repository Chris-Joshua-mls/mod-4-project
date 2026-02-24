import { getRandom10Pokemon, getRandomPokemon, getMoveData, getPokemon } from './fetch-helpers.js'
import { mainPageRenderPokemon, renderMoveDetails, renderPokemon } from './dom-helpers.js'
const movesList = document.querySelector('#moves-list');
const soundBtn = document.querySelector('#sound');

getRandom10Pokemon().then((pokemon) => {
    if (pokemon.error) {
        console.log("Failed To Load Pokemon")
    } else {
        mainPageRenderPokemon(pokemon.data)
    }
})

let currentPokemon = null

getRandomPokemon().then(({ data }) => {
    if (data === null) return;
    currentPokemon = data
    renderPokemon(data);
})

movesList.addEventListener('click', (event) => {
    const li = event.target.closest('li');
    if (!li) return;

    getMoveData(li.textContent).then(({ data }) => {
        console.log(data.name)
        if (data === null) return;
        renderMoveDetails(data.name)
    });
});

soundBtn.addEventListener('click', () => {
    if (currentPokemon === null) {
        return;
    }
    const cry = new Audio(`${currentPokemon.cries.latest}`)
    cry.play();
})
