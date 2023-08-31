const pokemonList =document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 8
let offset = 0
const listCap = 386

var pokemonName = ''

function carturedClickedPokemon(pokemon) {
    pokemonName = pokemon.getElementsByClassName('name')[0].innerHTML
    localStorage['pokemonName'] = pokemonName
}

function convertPokemonToHTML(pokemon){
    return `
    <a href="./pokemon_detail.html">
        <button type="button" class="pokeButton" onclick="carturedClickedPokemon(this)">
            <li class="pokemon ${pokemon.mainType}">
            <span class="number">#${pokemon.dexNumber}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                </ol>

                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.dexNumber}.gif" alt="${pokemon.name}">
            </div>
            </li>
        </button>
    </a>
    `
}

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const pokemonsInHtml = pokemons.map((item) => convertPokemonToHTML(item))
        pokemonList.innerHTML += pokemonsInHtml.join('')
    })
}
loadPokemons(offset, limit)
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const nextPage = offset + limit
    if (nextPage >= listCap) {
        const newLimit = listCap - offset
        loadPokemons(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemons(offset, limit)
    }
})
