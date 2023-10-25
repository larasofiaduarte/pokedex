import React, { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetails, fetchPokemonEvolution, fetchPokemonSpeciesData } from '../util/api';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import Button from '@mui/material/Button';


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



//Pokemon data
function PokemonList() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const limit = 20; // Display x amount of Pokemon
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
          //Display only the first 3 moves 
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
            name: pokemon.name,
            picture: detailsData[index].sprites.front_default,
            evolutions, 
            abilities, 
            types,
            moves: firstMoves,//this isnt getting passed properly.
            height: detailsData[index].height, 
            weight: detailsData[index].weight, 
          };
        });




        // You can wait for all combined data promises to resolve and then set the state.
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
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      hello
      <Button variant="text">
        Load More
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pokemon</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Evolutions</TableCell>
              <TableCell>Types</TableCell>
              <TableCell>Abilities</TableCell>
              <TableCell>Moves</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonData.map((pokemon) => (
              <TableRow key={pokemon.name}>
                <TableCell>
                  <img src={pokemon.picture} alt={pokemon.name} style={{ width: '50px' }} />
                </TableCell>
                <TableCell>{pokemon.name}</TableCell>
                <TableCell>
                  {pokemon.evolutions.map((evolutions, index) => (
                    <div key={index}>{evolutions}</div>
                  ))}
                </TableCell>
                <TableCell>{pokemon.types.join(',')}</TableCell>
                <TableCell>{pokemon.abilities.join(',')}</TableCell>
                <TableCell>{pokemon.moves.join(',')}</TableCell>
                <TableCell>{pokemon.height}cm</TableCell>
                <TableCell>{pokemon.weight}gr</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PokemonList;