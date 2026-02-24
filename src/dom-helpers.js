
import { getMoveData, getTypeWeakness } from "./fetch-helpers.js";
const pokeList = document.querySelector('#poke-list')

export const mainPageRenderPokemon = (pokemon) => {
    pokemon.forEach(mon => {
        console.log(mon)
        const li = document.createElement('li')
        const sprite = document.createElement('img')
        const name = document.createElement('h3')
        const number = document.createElement('p')

        sprite.src = mon.sprites.front_default
        sprite.alt = mon.name
        name.textContent = mon.name
        number.textContent = `No. ${String(mon.order).padStart(4, "0")}`

        li.append(sprite, number, name)
        pokeList.append(li)
    })
}

export const renderPokemon = async (pokemon) => {
    const pokeInfo = document.querySelector('#poke-info');
    const aside = document.querySelector('#typing');
    const movesList = document.querySelector('#moves-list');
    const detailsSection = document.querySelector('#move-info');

    pokeInfo.innerHTML = '';
    aside.innerHTML = '';
    movesList.innerHTML = '';
    detailsSection.innerHTML = '';

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
    movesList.append(details);

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
    aside.append(weakness, weaksUl, pokeType, typesUl)

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
    h5.textContent = `Accuracy: ${data.accuracy} | Damage Type: ${data.damage_class.name} | Type: ${data.type.name}`;

    const effect = document.createElement('p');
    const lan = data.effect_entries.findLastIndex((eng) => eng.language.name === "en")
    effect.textContent = `Effect: ${data.effect_entries[lan]?.effect ?? 'No effect data available'}`;

    const flavorText = document.createElement('p');
    const last = data.flavor_text_entries.findLastIndex((eng) => eng.language.name === "en")
    flavorText.textContent = last !== undefined ? data.flavor_text_entries[last].flavor_text : "No description available";

    detailsSection.append(h4, h5, effect, flavorText);
};
