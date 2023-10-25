import axios from 'axios';
import {useEffect, useState} from 'react';

const baseUrl: string = 'https://pokeapi.co/api/v2'; 

export const fetchPokemonList = async (url: string) => {
    try{
        const response = await axios.get(url);
        return response.data;
    }catch(err){
        throw err;
    }
};

export const fetchPokemonDetails = async (url: string)=> {
    try{
        const response = await axios.get(url);
        return response.data
    }catch (err){
        throw err;
    }
};

export const fetchPokemonEvolution = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

// Function to fetch Pokemon species data (for finding corresponding evolutions)
export async function fetchPokemonSpeciesData(pokemonSpeciesUrl: string) {
  const response = await fetch(pokemonSpeciesUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon species data: ${response.status}`);
  }
  return response.json();
};


