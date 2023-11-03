
import PokemonData, {PokemonDataResult} from '../hooks/PokemonData';
import ListView from './ListView';
import GridView from './GridView';
import CircularProgress from '@mui/material/CircularProgress';
import { Routes, Route, useLocation } from 'react-router-dom';
import '../styles/styles.scss';
import Details from './Details';



//params=filters
function PokemonContainer( {selectedTypes, selectedColor, isBabyChecked, maxWeight, minWeight, searchTerm}:any ) {
  const location = useLocation();

   // Fetch data and manage state
  const {pokemonData, loading, loadMore}:PokemonDataResult = PokemonData();

    console.log(searchTerm);
  
  //array of pokemons that match all filters
  let filteredData = pokemonData;

  if (searchTerm) {
    filteredData = filteredData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
  }

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