const page = document.getElementById('control')
var capturedName = localStorage['pokemonName']
let pokemon

function makeDetailsPage (pokemon){
    return`
        <section class="content ${pokemon.mainType}">
            <section class="presentation">
                <div class="pres_head">
                    <h1 class="name">${pokemon.name}</h1>
                    <h1 id="order">#${pokemon.dexNumber}</h1>
                </div>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.dexNumber}.png" alt="Blastoise">
            </section>

            <section class="status">
                <h1>STATUS</h1>
                <h2>Nome:</h2> <p class="name">${pokemon.name}</p>
                <h2>Tipos:</h2>
                <p>
                ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join(' ')}
                </p>
                <h2>Peso: </h2> <p>${pokemon.wht} kg</p>
                <table>
                    <tr>
                        <td><strong>LP Base:</strong></td>
                        <td>${pokemon.hp}</td>
                    </tr>
                    <tr>
                        <td><strong>Ataque Base:</strong></td>
                        <td>${pokemon.atk}</td>
                    </tr>
                    <tr>
                        <td><strong>Defesa Base:</strong></td>
                        <td>${pokemon.def}</td>
                    </tr>
                    <tr>
                        <td><strong>Ataque Esp. Base:</strong></td>
                        <td>${pokemon.sp_atk}</td>
                    </tr>
                    <tr>
                        <td><strong>Defesa Esp. Base:</strong></td>
                        <td>${pokemon.sp_def}</td>
                    </tr>
                    <tr>
                        <td><strong>Velocidade:</strong></td>
                        <td>${pokemon.spd}</td>
                    </tr>
                </table>
            </section>
        </section>
    `
    
}

let poke = pokeApi.getDetailedPokemonStats(capturedName)

poke.then((result) => page.innerHTML = makeDetailsPage(result))


