import { getRandomPokemon, getPokemon, getMoveData } from './fetch-helpers.js'
import { renderPokemon, renderMoveDetails } from './dom-helpers.js'

const movesList = document.querySelector('#moves-list');
const soundBtn = document.querySelector('#sound');

let currentPokemon = null

const params = new URLSearchParams(window.location.search)
const searchedPokemon = params.get('search')

if (searchedPokemon) {
    getPokemon(searchedPokemon).then(({ data }) => {
        if (data === null) return;
        currentPokemon = data
        renderPokemon(data)
    })
} else {
    getRandomPokemon().then(({ data }) => {
        if (data === null) return;
        currentPokemon = data
        renderPokemon(data)
    })
}

movesList.addEventListener('click', (event) => {
    const li = event.target.closest('li');
    if (!li) return;

    getMoveData(li.dataset.moveName).then(({ data }) => {
        if (data === null) return;
        renderMoveDetails(data)
    });
});

soundBtn.addEventListener('click', () => {
    if (currentPokemon === null) return;
    const cry = new Audio(`${currentPokemon.cries.latest}`)
    cry.play();
})