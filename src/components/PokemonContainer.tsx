import React, {useState} from 'react';
import PokemonData, {PokemonDataResult} from '../hooks/PokemonData';
import ListView from './ListView';
import GridView from './GridView';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/styles.scss';
import SearchBox from './SearchBox';

function PokemonContainer( {selectedTypes}:any ) {
   // Fetch data and manage state
  const {pokemonData, loading, loadMore}:PokemonDataResult = PokemonData();
  const [searchTerm, setSearchTerm] = useState(''); 

  //Stores search term into state
  const handleSearch = (term:string) => {
    setSearchTerm(term);
  };

  //Stores pokemon that match the selected types into an array
  const filteredData = pokemonData.filter((pokemon) =>
    selectedTypes.length === 0 || pokemon.types.some((type) => selectedTypes.includes(type))
  );

  console.log(selectedTypes.length);
  console.log(selectedTypes.join(','));

  console.log(filteredData);

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
            <Route path="/grid" element={<GridView pokemonData={pokemonData} searchTerm={searchTerm}/>}/>
          </Routes>
            
          <button onClick={loadMore}>Load More</button>
            
        </>
      )}
    </div>
  );
}

export default PokemonContainer;