import { getMoveData, getTypeWeakness } from "./fetch-helpers.js";


export const renderPokemon = async (pokemon) => {
  const pokeInfo = document.querySelector('#poke-info');
  const aside = document.querySelector('#typing');
  const movesList = document.querySelector('#moves-list');

  pokeInfo.innerHTML = '';
  aside.innerHTML = '';
  movesList.innerHTML = '';

  // poke info

  const h2 = document.createElement('h2');
  h2.textContent = `#${pokemon.id} ${pokemon.name}`;

  const pokePic = document.createElement('img');
  pokePic.src = pokemon.sprites.front_default;
  pokePic.alt = pokemon.name;

  pokeInfo.append(h2, pokePic);
  // poke moveslist

  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = 'Moves List'

  const movesUl = document.createElement('ul');
  pokemon.moves.forEach((moveItem) => {
    const li = document.createElement('li');
    li.textContent = `${moveItem.move.name}`
    li.dataset.moveName = moveItem.move.name
    movesUl.appendChild(li);
  })
  details.append(summary, movesUl)
  aside.append(details);

  // poke aside

  const pokeType = document.createElement('h3');
  pokeType.textContent = 'Type'

  const typesUl = document.createElement('ul');

  pokemon.types.forEach((typeItem) => {
    const li = document.createElement('li');
    li.textContent = typeItem.type.name
    typesUl.appendChild(li);
  })

  const weakness = document.createElement('h3');
  weakness.textContent = 'Weakness'

  const weaksUl = document.createElement('ul');

  for (const typeItem of pokemon.types) {
    let index = 0;
    let fetching = true;

    while (fetching) {
      const { data, error } = await getTypeWeakness(typeItem.type.name, index);
      if (error || !data) {
        fetching = false;
      } else {
        const li = document.createElement('li');
        li.textContent = data;
        weaksUl.appendChild(li);
        index++;
      }
    }
  }
  aside.append(weaksUl, typesUl, weakness, pokeType)

};


// poki render
export const renderMoveDetails = async (moveName) => {
  const detailsSection = document.querySelector('#move-info');
  detailsSection.classList.remove('hidden');
  detailsSection.innerHTML = '';

  const { data } = await getMoveData(moveName);

  const h4 = document.createElement('h4');
  h4.textContent = data.name;

  const h5 = document.createElement('h5');
  h5.textContent = `Accuracy: ${data.accuracy}| Damage Type: ${data.damage_class.name}`;

  const effect = document.createElement('p');
  effect.textContent = `Effect: ${data.effect_entries[1].effect}`;

  const flavorText = document.createElement('p');
  flavorText.textContent = data.flavor_text_entries[flavor_text_entries.length - 1].flavor_text;

  detailsSection.append(h4, h5, effect, flavorText);
};
