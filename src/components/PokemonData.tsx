import React, { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetails, fetchPokemonEvolution, fetchPokemonSpeciesData } from '../util/api';


//Interfaz para el Objeto Pokemon
interface Pokemon {
  name: string;
  picture: string;
  evolutions: any[]; 
  types: string[];
  abilities: string[];
  moves: string[];
  height: number; 
  weight: number; 
  url: string;
}

export type PokemonDataResult = {
  pokemonData: Pokemon[]; // Replace with the actual type of your Pokémon data
  loading: boolean;
  loadMore: () => void;
};

//Async Functions

//fetch moves data
async function fetchPokemonMoves(pokemonUrl: string): Promise<string[]> {
  try {
    const response = await fetch(pokemonUrl);
    const data = await response.json();
    const moves = data.moves.map((move: any) => move.move.name);
    return moves;
  } catch (error) {
    console.error('Error fetching moves:', error);
    return [];
  }
}

//fetch correct evolution-chain endpoint depending on species
async function fetchEvolutionChainURL(pokemonSpeciesUrl: string): Promise<number> {
  const speciesData = await fetchPokemonSpeciesData(pokemonSpeciesUrl);

  // Get the evolution chain URL from the species data
  const evolutionChainURL = speciesData.evolution_chain.url;

  return evolutionChainURL;
}

//fetch evolutions
async function fetchEvolutions(pokemonUrl: string): Promise<string[]> {
  const evolutionData = await fetchPokemonEvolution(pokemonUrl);
  // Extract the relevant data from the evolutionData object and return it as an array of strings.
  return evolutionData; 
}

//Function to make the first letter of pokemon.name uppercase later
function Uppercase(string:string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


//Pokemon data 
function PokemonData():PokemonDataResult {

  
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState(20); // Display x amount of Pokemon
  const baseUrl: string = 'https://pokeapi.co/api/v2/';



  useEffect(() => {
    setLoading(true);
    fetchPokemonList(`${baseUrl}pokemon?offset=0&limit=${limit}`)
      .then(async (data) => {
        const detailsPromises = data.results.map((pokemon: Pokemon) => fetchPokemonDetails(pokemon.url));
        const detailsData = await Promise.all(detailsPromises);
        const combinedData = data.results.map(async (pokemon: Pokemon, index: number) => {


          // Fetch abilities and types for each Pokémon
          const abilities = detailsData[index].abilities.map((abilityData: any) => abilityData.ability.name);
          const types = detailsData[index].types.map((typeData: any) => typeData.type.name);

          // Fetch the evolution chain URL for the current Pokemon
          const evolutionChainURL:any = await fetchEvolutionChainURL(detailsData[index].species.url);

          //Fetch evolutions with a new call to the API
          const evolution:any = await fetchEvolutions(evolutionChainURL);

          //Fetch moves with a new call to the API
          const moves = await fetchPokemonMoves(pokemon.url);
          //Display only the first 3 moves (to save space on table)
          let firstMoves = moves.slice(0,3);

          //Save Evolutions into an array
          const evolutions=[];
          evolutions.push(evolution.chain.species.name);
          
          //Handle cases with different # of evolutions
          if (evolution.chain.evolves_to.length !== 0){ 
            evolutions.push(evolution.chain.evolves_to[0].species.name);
            if(evolution.chain.evolves_to[0].evolves_to.length !== 0){
              evolutions.push(evolution.chain.evolves_to[0].evolves_to[0].species.name);
            }
          }

          //return a pokemon object with the extracted data as attributes

          return {
            name: Uppercase(pokemon.name),
            picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index+1}.png`,
            evolutions, 
            abilities, 
            types,
            moves: firstMoves,//this isnt getting passed properly.
            height: detailsData[index].height, 
            weight: detailsData[index].weight, 
          };
        });

        // Set state after all promises have been resolved
        Promise.all(combinedData)
          .then((resolvedData) => {
            setPokemonData(resolvedData);
            setLoading(false);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }, [limit]);


  //Function to load more pokemon

  const loadMore = () => {
    setLimit(limit + 20);
  };


  return {pokemonData, loading, loadMore}; //Return an object with the data, loading state, and load more functionality
}

export default PokemonData;