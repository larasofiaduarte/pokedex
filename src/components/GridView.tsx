import React from 'react';
import MediaCard from './Card';
import { Grid, Container } from '@mui/material';

const GridView = (props:any) => {

    const pokemonData = props.pokemonData

    return (
      <div>
      <Grid container>
        {pokemonData.map((pokemon: any, index: number) => ( // Include 'index' in the parameters
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MediaCard img={pokemon.picture} title={pokemon.name} types={pokemon.types}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default GridView;