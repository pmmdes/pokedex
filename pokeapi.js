const pokemons_number = 150;
const pokemon_container = document.getElementById("poke-container");

const colors = {
	Fire: '#FDDFDF',
	Grass: '#DEFDE0',
	Electric: '#FCF7DE',
	Water: '#DEF3FD',
	Ground: '#f4e7da',
	Rock: '#d5d5d4',
	Fairy: '#fceaff',
	Poison: '#98d7a5',
	Bug: '#f8d5a3',
	Dragon: '#97b3e6',
	Psychic: '#eaeda1',
	Flying: '#F5F5F5',
	Fighting: '#E6E0D4',
	Normal: '#F5F5F5'
};

const fetchPokemons = async () => {
    for(let i=1; i<=pokemons_number;i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url);
    const pokemon = await res.json();

    createPokemonCard(pokemon);
}

function createPokemonCard(pokemon) {

    //Criando o elemento do pokemon individual
    const pokemonElement = document.createElement('div');

    //adicionando a classe card    
    pokemonElement.classList.add('card')

    //Tratando o nome para upper case somente na primeira letra
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    //Buscando o tipo de um array de objetos
    const getType = pokemon.types[0].type.name;

    //Tratando o tipo para upper case somente na primeira letra
    const type = getType[0].toUpperCase() + getType.slice(1);

    const sprite = pokemon.sprites.front_default;

    //Adicionando a cor do background ao elemento do pokemon com base no tipo, buscando a cor correspondente no objeto Colors. 
    pokemonElement.style.backgroundColor = colors[type];

    // Repositorio de imagens depreciado || https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png
    
    //Criando o HTML injetável
    const pokemonInnerHTML = `
    
        <div class="img-container"> 
            <img src="${sprite}" alt="Imagem de ${pokemon.name}" class="poke-pic">
        </div>     

        <h2 class="poke-id"> # ${pokemon.id.toString().padStart(3,'0')} </h2>
        
        <p class="poke-name"> ${name} </p>

        <small class="type"> Type: <span> ${type}  </span> </small>
    
    `;

    //Injetando o HTML 
    pokemonElement.innerHTML = pokemonInnerHTML;

    //Adicionando o elemento individual no container.
    pokemon_container.appendChild(pokemonElement);      
    
}

fetchPokemons();
