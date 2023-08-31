

const pokeApi = {}

function convertApiData(pokeDetails) {
    const pokemon = new Pokemon
    pokemon.name = pokeDetails.name
    pokemon.dexNumber = pokeDetails.id

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [mType] = types

    pokemon.types = types
    pokemon.mainType = mType
    pokemon.hp = pokeDetails.stats[0].base_stat
    pokemon.atk = pokeDetails.stats[1].base_stat
    pokemon.def = pokeDetails.stats[2].base_stat
    pokemon.sp_atk = pokeDetails.stats[3].base_stat
    pokemon.sp_def = pokeDetails.stats[4].base_stat
    pokemon.spd = pokeDetails.stats[5].base_stat
    pokemon.wht = (pokeDetails.weight / 2)
    return pokemon
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertApiData)
}

pokeApi.getPokemons = function (offset = 0, limit = 9) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
            .then( (response) => response.json())
            .then((jsonBody) =>jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
            .then((detailedRequests) => Promise.all(detailedRequests))
            
}


pokeApi.getDetailedPokemonStats = function (name){
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    return fetch(url)
            .then((response) => response.json())
            .then(convertApiData)
            
}

