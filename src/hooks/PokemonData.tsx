import React, { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetails, fetchPokemonMoves, fetchEvolutionChainURL, fetchEvolutions, fetchPokemonColor, fetchSpeciesData} from '../util/api';
import {Pokemon} from './Interfaces';
import axios from 'axios';


export type PokemonDataResult = {
  pokemonData: Pokemon[];
  loading: boolean;
  loadMore: () => void;
};

//Async Functions
//Function to make the first letter of pokemon.name uppercase later
function Uppercase(string:string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


//Pokemon data 
function PokemonData():PokemonDataResult {

  
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState(180); // Display x amount of Pokemon
  const baseUrl: string = 'https://pokeapi.co/api/v2/';

  

  // Function to make the API call

  useEffect(() => {
    setLoading(true);
    fetchPokemonList(`${baseUrl}pokemon?offset=0&limit=${limit}`)
      .then(async (data) => {
        const detailsPromises = data.results.map((pokemon: Pokemon) => fetchPokemonDetails(pokemon.url));
        const detailsData = await Promise.all(detailsPromises);
        const combinedData = data.results.map(async (pokemon: Pokemon, index: number) => {

          //pokemon id
          const id = detailsData[index].id;

          //abilities
          const abilities = detailsData[index].abilities.map((abilityData: any) => abilityData.ability.name);
          //types
          const types = detailsData[index].types.map((typeData: any) => typeData.type.name);

          //Fetch the evolution chain URL for the current Pokemon
          const evolutionChainURL:any = await fetchEvolutionChainURL(detailsData[index].species.url);

          //species data for isBaby
          const speciesData:any = await fetchSpeciesData(detailsData[index].species.url);

          //Fetch evolutions 
          const evolution:any = await fetchEvolutions(evolutionChainURL);

          //Fetch color using species endpoint
          const color:string = await fetchPokemonColor(`${baseUrl}pokemon-species/${id}/`);

          //Fetch moves 
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



          //return a pokemon object with the extracted data

          return {
            name: Uppercase(pokemon.name),
            picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index+1}.png`,
            evolutions, 
            abilities, 
            types,
            moves: firstMoves,//this isnt getting passed properly.
            height: detailsData[index].height, 
            weight: detailsData[index].weight, 
            id: detailsData[index].id,
            isBaby:speciesData.is_baby,
            color
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
    setLimit(limit + 50);
  };


  return {pokemonData, loading, loadMore}; //Return an object with the data, loading state, and load more function
}

export default PokemonData;