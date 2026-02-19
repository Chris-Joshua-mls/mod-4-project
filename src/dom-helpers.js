const pokeList = document.querySelector('#poke-list')

export const renderPokemon = (pokemon) => {
    pokemon.forEach(mon => {
        const li = document.createElement('li')
        const sprite = document.createElement('img')
        const name = document.createElement('h3')
        const types = document.createElement('p')

        sprite.src = mon.sprites.other['offical-artwork'].front_default
        sprite.alt = mon.name
        name.textContent = mon.name
        types.textContent = mon.types.type.name

        li.append(sprite, name, types)
        pokeList.append(li)
    })
}