import React, {useState} from 'react';
import PokemonData, {PokemonDataResult} from '../hooks/PokemonData';
import ListView from './ListView';
import GridView from './GridView';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/styles.scss';
import SearchBox from './SearchBox';

//params=filters
function PokemonContainer( {selectedTypes, selectedColor, isBabyChecked, maxWeight, minWeight}:any ) {
   // Fetch data and manage state
  const {pokemonData, loading, loadMore}:PokemonDataResult = PokemonData();
  const [searchTerm, setSearchTerm] = useState(''); 

  //Stores search term into state
  const handleSearch = (term:string) => {
    setSearchTerm(term);
  };

  //array of pokemons that match all filters
  let filteredData = pokemonData;

  //Stores pokemon that match the selected types into an array
  if (selectedTypes.length > 0) {
    filteredData = filteredData.filter((pokemon) =>
      pokemon.types.some((type) => selectedTypes.includes(type))
    );
  }
  //Stores pokemon whose pokemon.color property match selectedColor
  if (selectedColor) {
    filteredData = filteredData.filter((pokemon) =>
      selectedColor.toLowerCase() === pokemon.color
    );
  }
  //filters by isBaby
  if (isBabyChecked) {
    filteredData = filteredData.filter((pokemon) => pokemon.isBaby === true);
  }

  //filter by weight range
  if (minWeight !== '' && maxWeight !== '') {
    filteredData = filteredData.filter((pokemon) =>
      pokemon.weight >= minWeight && pokemon.weight <= maxWeight
    );
  } 
  

  return (
    <div>
        {loading ? (
            <CircularProgress/>
        ) : (
        <>
          <SearchBox onSearch={handleSearch} />
          <div className="viewContainer">
            <Link className="viewButton" to="/">List </Link>
            <Link className="viewButton" to="/grid">Grid</Link>
          </div>
          <Routes>
            <Route path="/" element={<ListView pokemonData={filteredData} searchTerm={searchTerm}/>}/>
            <Route path="/grid" element={<GridView pokemonData={filteredData} searchTerm={searchTerm}/>}/>
          </Routes>
            
          <button onClick={loadMore}>Load More</button>
            
        </>
      )}
    </div>
  );
}

export default PokemonContainer;