import { getRandom10Pokemon, getMoveData, getPokemon } from './fetch-helpers.js'
import { mainPageRenderPokemon, renderMoveDetails, renderPokemon } from './dom-helpers.js'
const movesList = document.querySelector('#moves-list');

getRandom10Pokemon().then((pokemon) => {
    if (pokemon.error) {
        console.log("Failed To Load Pokemon")
    } else {
        mainPageRenderPokemon(pokemon.data)
    }
})

getPokemon('eevee').then(({ data }) => {
  if (data === null) return;
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
