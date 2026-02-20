const pokeList = document.querySelector('#poke-list')

export const mainPageRenderPokemon = (pokemon) => {
    pokemon.forEach(mon => {
        console.log(mon)
        const li = document.createElement('li')
        const sprite = document.createElement('img')
        const name = document.createElement('h3')
        const types = document.createElement('p')

        sprite.src = mon.sprites.front_default
        sprite.alt = mon.name
        name.textContent = mon.name
        types.textContent = mon.types.map((type) => type.type.name).join(", ")

        li.append(sprite, name, types)
        pokeList.append(li)
    })
}