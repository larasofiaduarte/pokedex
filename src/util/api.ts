import axios from 'axios';
import {useEffect, useState} from 'react';

const baseUrl: string = 'https://pokeapi.co/api/v2'; 

//fetch pokemon data

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

//Evolutions
export const fetchPokemonEvolution = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

//Function to fetch Pokemon species data (for finding corresponding evolutions)
export async function fetchPokemonSpeciesData(pokemonSpeciesUrl: string) {
  const response = await fetch(pokemonSpeciesUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon species data: ${response.status}`);
  }
  return response.json();
};


//fetch correct evolution-chain endpoint depending on species
export async function fetchEvolutionChainURL(pokemonSpeciesUrl: string): Promise<number> {
  const speciesData = await fetchPokemonSpeciesData(pokemonSpeciesUrl);

  // Get the evolution chain URL from the species data
  const evolutionChainURL = speciesData.evolution_chain.url;

  return evolutionChainURL;
}

//fetch evolutions
export async function fetchEvolutions(pokemonUrl: string): Promise<string[]> {
  const evolutionData = await fetchPokemonEvolution(pokemonUrl);
  // Extract the  data and return it as an array of strings.
  return evolutionData; 
}


//fetch color
export async function fetchPokemonColor(pokemonSpeciesUrl:string) {
  const speciesData = await fetchPokemonSpeciesData(pokemonSpeciesUrl);

  // Get the evolution chain URL from the species data
  const color = speciesData.color.name;

  return color;
}


//fetch moves data
export async function fetchPokemonMoves(pokemonUrl: string): Promise<string[]> {
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



