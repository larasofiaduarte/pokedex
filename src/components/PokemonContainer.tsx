import React from 'react';
import PokemonData, {PokemonDataResult} from './PokemonData';
import ListView from './ListView';
import GridView from './GridView';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function PokemonContainer() {
  const {pokemonData, loading, loadMore}:PokemonDataResult = PokemonData(); // Fetch data and manage state

  return (
    <div>
        {loading ? (
            <CircularProgress/>
        ) : (
        <>
            <Link to="/">List </Link>
            <Link to="/grid">Grid</Link>

            <Routes>
                <Route path="/" element={<ListView pokemonData={pokemonData}/>}/>
                <Route path="/grid" element={<GridView pokemonData={pokemonData}/>}/>
            </Routes>
            
            <button onClick={loadMore}>Load More</button>
            
        </>
      )}
    </div>
  );
}

export default PokemonContainer;