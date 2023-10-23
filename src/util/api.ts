import axios from 'axios';

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

export const fetchPokemonEvolution = async (pokemonUrl: string) => {
    try {
      // Make a request to the evolution chain endpoint for the specific Pokémon
      const response = await axios.get(`${pokemonUrl}/evolution-chain`);
  
      // Extract and return the evolution data
      const evolutionData = response.data; // You may need to process this data
  
      return evolutionData;
    } catch (err) {
      throw err;
    }
  };

  
  export const processEvolutionData = (evolutionData:any) => {
    // Check if there is an evolution chain
    if (!evolutionData || !evolutionData.chain) {
      return [];
    }
  
    const evolvedForms:any = [];
  
    const processChain = (chain:any) => {
      if (chain.species) {
        evolvedForms.push(chain.species.name);
      }
      if (chain.evolves_to) {
        chain.evolves_to.forEach((evolution:any) => {
          processChain(evolution);
        });
      }
    };
  
    processChain(evolutionData.chain);
  
    return evolvedForms;
  };

