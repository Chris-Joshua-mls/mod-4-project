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

export const getPokemonByName = (name) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      if (!response.ok) return;

      return response.json()
    })
    .then((data) => {
      return { data: data, error: null }
    })
    .catch((error) => {
      console.error(error.message);
      return { data: null, error: error }
    })
};

export const getPokemonById = (id) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Fetch failed ${response.status} ${response.statusText}`)
      }
      return response.json()
    })
    .then((data) => {
      return { data: data, error: null }
    })
    .catch((error) => {
      console.error(error.message);
      return { data: null, error: error }
    })
};

export const getTypeWeakness = (name, index) => {

  return fetch(`https://pokeapi.co/api/v2/type/${name}/`)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Fetch failed ${response.status} ${response.statusText}`)
      }
      return response.json()
    })
    .then((data) => {
      return { data: data.damage_relations.double_damage_from[index].name, error: null }
    })
    .catch((error) => {
      return { data: null, error: error }
    })
};

export const getMoveData = (name) => {

  return fetch(`https://pokeapi.co/api/v2/move/${name}/`)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Fetch failed ${response.status} ${response.statusText}`)
      }
      return response.json()
    })
    .then((data) => {
      return { data: data, error: null }
    })
    .catch((error) => {
      console.error(error.message);
      return { data: null, error: error }
    })
};

export const getPokemon = (check) => {

  if (typeof check === 'string') {
    return getPokemonByName(check)
  } else if (typeof check === 'number') {
    return getPokemonById(check)
  } else {
    return getPokemonByName('000')
  }
};
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

