'use strict';
console.log('working ....');
// task fetch this data ( https://pokeapi.co/api/v2/pokemon/1/ ) and display it in the console
// / inspired by ( https://stackblitz.com/edit/pokemon-api?file=index.js )

// point : all the variables
const poke_container = document.getElementById('poke-container');
const searchInput = document.getElementById('search-input');

const pokemon_count = 150;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5',
};

const main_types = Object.keys(colors);

// point : fetch data from api
const fetchPokemons = async () => {
	for (let i = 1; i <= pokemon_count; i++) {
		await getPokemon(i);
	}
};

// point : get data from api
const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	createPokemonCard(data);
};

console.log(getPokemon.url);

// point : create pokemon card
const createPokemonCard = (pokemon) => {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map((type) => type.type.name);
	const type = main_types.find((type) => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
		<div class="img-container">
			<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
				pokemon.id
			}.png"" alt="${name}" />
		</div>
		<div class="info">
			<span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
			<h3 class="name">${name}</h3>
			<small class="type">Type: <span>${type}</span></small>
		</div>
	`;

	pokemonEl.innerHTML = pokeInnerHTML;

	pokemonEl.classList.add('show'); // point : add class show the transition

	poke_container.appendChild(pokemonEl);
};
fetchPokemons();

// point : search pokemon
searchInput.addEventListener('input', (e) => {
	const searchString = searchInput.value.toLowerCase();
	const allPokemon = document.querySelectorAll('.pokemon');
	allPokemon.forEach((pokemon) => {
		const name = pokemon.querySelector('.name').innerText.toLowerCase();

		if (name.indexOf(searchString) > -1) {
			pokemon.style.display = 'block';
		} else {
			pokemon.style.display = 'none';
		}
	});
});

searchInput.focus(); /// search container will not be focused
