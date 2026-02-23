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