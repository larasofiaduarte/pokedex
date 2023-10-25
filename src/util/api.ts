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

// Function to fetch Pokemon species data
export async function fetchPokemonSpeciesData(pokemonSpeciesUrl: string) {
  const response = await fetch(pokemonSpeciesUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon species data: ${response.status}`);
  }
  return response.json();
};

// Function to fetch evolution chain data
export async function fetchPokemonEvolutionChain(evolutionChainId: number) {
  const evolutionChainUrl = `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}`;
  const response = await fetch(evolutionChainUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch evolution chain data: ${response.status}`);
  }
  return response.json();
};