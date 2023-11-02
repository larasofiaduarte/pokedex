import React, {useState} from 'react';
import PokemonData, {PokemonDataResult} from '../hooks/PokemonData';
import ListView from './ListView';
import GridView from './GridView';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import '../styles/styles.scss';
import SearchBox from './SearchBox';
import Details from './Details';



//params=filters
function PokemonContainer( {selectedTypes, selectedColor, isBabyChecked, maxWeight, minWeight}:any ) {
  const location = useLocation();

   // Fetch data and manage state
  const {pokemonData, loading, loadMore}:PokemonDataResult = PokemonData();
  const [searchTerm, setSearchTerm] = useState(''); 

  //Stores search term into state
  const handleSearch = (term:string) => {
    setSearchTerm(term.toLowerCase());
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
    <div className="pokemonContainer">
        {loading ? (
            <CircularProgress/>
        ) : (
        <>
        {/* render the SearchBox based on the route */}
        <>
          {location.pathname === '/' || location.pathname === '/list' ? (
            <div className="searchContainer">
              <SearchBox onSearch={handleSearch} />
              <div className="viewContainer">
                <Link to="/list">
                  <button style={{margin:1}}>List</button>
                </Link>
                <Link to="/">
                  <button style={{margin:1}}>Grid</button>
                </Link>
              </div>
            </div>
          ) : null}
        </>

        <Routes>
          <Route path="/list" element={<ListView pokemonData={filteredData} searchTerm={searchTerm} />} />
          <Route path="/" element={<GridView pokemonData={filteredData} searchTerm={searchTerm} />} />
          <Route path="/pokemon/:name" element={<Details pokemonData={pokemonData} />} />
        </Routes>
        {location.pathname=== '/' || location.pathname==='/list' ? (
            <button onClick={loadMore}>Load More</button>
        ):null}
        
      </>
    )}
  </div>
);
}


export default PokemonContainer;