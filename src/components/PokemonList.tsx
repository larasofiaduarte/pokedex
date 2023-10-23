import React, { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from '../util/api';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import Button from '@mui/material/Button';

interface Pokemon {
  name: string;
  picture: string;
  evolutions: string[]; // Replace with actual data type
  types: string[]; // Replace with actual data type
  abilities: string[]; // Replace with actual data type
  height: number; // Replace with actual data type
  weight: number; // Replace with actual data type
  url: string;
  // Add more data attributes like evolutions, types, abilities, height, and weight.
}

function PokemonList() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]); // Define the type of pokemonData.
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const baseUrl: string = 'https://pokeapi.co/api/v2/';

  const loadMore = () => {
    setOffset(offset + limit);
  };

  useEffect(() => {
    setLoading(true);
    fetchPokemonList(`${baseUrl}pokemon?offset=${offset}&limit=${limit}`)
      .then(async (data) => {
        const detailsPromises = data.results.map((pokemon: Pokemon) => fetchPokemonDetails(pokemon.url));
        const detailsData = await Promise.all(detailsPromises);
  
        const combinedData = data.results.map(async (pokemon: Pokemon, index: number) => {
          // Fetch abilities and types for each Pokémon
          const abilities = detailsData[index].abilities.map((abilityData: any) => abilityData.ability.name);
          const types = detailsData[index].types.map((typeData: any) => typeData.type.name);

          return {
            name: pokemon.name,
            picture: detailsData[index].sprites.front_default,
            evolutions: [], // Replace with actual data
            abilities, // Use the extracted abilities
            types, // Use the extracted types
            height: detailsData[index].height, // Use the height from the detailed information
            weight: detailsData[index].weight, // Use the weight from the detailed information
          };
        });
  
        // You can wait for all combined data promises to resolve and then set the state.
        Promise.all(combinedData)
          .then((resolvedData) => {
            setPokemonData((prevData) => [...prevData, ...resolvedData]);
            setLoading(false);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }, [offset]);
  
  
  
  

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      hello
      <Button variant="text" onClick={loadMore}>
        Load More
      </Button>
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Pokemon</TableCell>
            <TableCell>Evolutions</TableCell>
            <TableCell>Types</TableCell>
            <TableCell>Abilities</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemonData.map((pokemon) => (
            <TableRow key={pokemon.name}>
              <TableCell>{pokemon.name}</TableCell>
              <TableCell>{pokemon.evolutions.join(',')}</TableCell>
              <TableCell>{pokemon.types.join(',')}</TableCell>
              <TableCell>{pokemon.abilities.join(',')}</TableCell>
              <TableCell>{pokemon.height}cm</TableCell>
              <TableCell>{pokemon.weight}gr</TableCell>
              <TableCell>
              <img src={pokemon.picture} alt={pokemon.name} style={{ width: '50px' }} />
              </TableCell>
              {/* Render other attributes here */}
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </div>
  );
}

export default PokemonList;