export const getRandom10Pokemon = async () => {
    try {
        const offset = Math.ceil(Math.random() * 1340)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
        if (!response.ok) {
            throw Error('Fetch Failed')
        }
        const data = await response.json()

        const pokePromises = data.results.map(async pokemon => {
            const res = await fetch(pokemon.url)
            return res.json()
        })
        const pokeData = await Promise.all(pokePromises)
        return {
            data: pokeData,
            error: null
        }
    }
    catch (error) {
        return {
            data: null,
            error
        }
    }
}

