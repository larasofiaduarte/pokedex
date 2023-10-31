import React, {useState} from 'react';
import MediaCard from './Card';
import SearchBox from './SearchBox';
import { Grid, Container } from '@mui/material';
import '../styles/styles.scss'

const GridView = (props:any) => {

    const pokemonData = props.pokemonData;
    const searchTerm = props.searchTerm;


    return (
      <div>

      <Grid container className="center-card">
        {pokemonData.filter((pokemon:any)=>{
          return searchTerm.toLowerCase()=== '' ? pokemon : pokemon.name.toLowerCase().includes(searchTerm)
        }).map((pokemon: any, index: number) => ( // Include 'index' in the parameters
          <Grid item  key={index}>
            <MediaCard img={pokemon.picture} title={pokemon.name} types={pokemon.types}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default GridView;