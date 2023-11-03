import React,{useState, useEffect} from 'react'
import PokemonContainer from './PokemonContainer'
import TypeFilter from './TypeFilter'
import ColorFilter from './ColorFilter'
import BabyFilter from './BabyFilter'
import WeightFilter from './WeightFilter'
import styles from '../styles/styles.scss'
import TuneIcon from '@mui/icons-material/Tune';
import {List, ListItem, Divider} from '@mui/material'
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Filters from './Filters'
import SearchBox from './SearchBox'

export default function Container() {

  const location = useLocation();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); 
  const [selectedColor, setSelectedColor] = useState<string[]>();
  const [isBabyChecked, setIsBabyChecked] = useState(false);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(1999);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 

  //Stores search term into state
  const handleSearch = (term:string) => {
    setSearchTerm(term.toLowerCase());
  };

  //Stores selected types in the state each time the multi-select changes
  const handleSelect = (types:string[]) => {
    setSelectedTypes(types);
  };

  //color select event
  const handleColorSelect = (color:string[])=>{
    setSelectedColor(color);
  };

  //isBaby select event
  const handleBabyCheckboxChange = (isChecked:any) => {
    setIsBabyChecked(isChecked);
  };

  //weight range select
  const handleMinWeight = (minWeightValue: number) => {
    setMinWeight(minWeightValue);
  };

  const handleMaxWeight = (maxWeightValue: number) => {
    setMaxWeight(maxWeightValue);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };


  return (
    
  <>
    <div>
      {location.pathname === '/' || location.pathname==='/list' ? (
      <div className="filtersearchCont">
        <SearchBox onSearch={handleSearch} />
        <div className="filtersCont">
          <div className="filtersBtn">
            <button onClick={toggleFilters} className="filtersBtn">
              <TuneIcon></TuneIcon>
              <div>Filters</div>
            </button>
          </div>
          <Filters
              selectedTypes={selectedTypes}
              handleSelect={handleSelect}
              selectedColor={selectedColor}
              handleColorSelect={handleColorSelect}
              isBabyChecked={isBabyChecked}
              handleBabyCheckboxChange={handleBabyCheckboxChange}
              minWeight={minWeight}
              handleMinWeight={handleMinWeight}
              maxWeight={maxWeight}
              handleMaxWeight={handleMaxWeight}
              filtersVisible={filtersVisible}
          />
        </div>
              <div className="viewContainer">
                <Link to="/list">
                  <button style={{margin:20}}>List</button>
                </Link>
                <Link to="/">
                  <button style={{margin:20}}>Grid</button>
                </Link>
              </div>
        
      </div>
          ):null}
      <PokemonContainer onSearch={handleSearch} searchTerm={searchTerm} selectedTypes={selectedTypes} selectedColor={selectedColor} isBabyChecked={isBabyChecked} minWeight={minWeight} maxWeight={maxWeight}></PokemonContainer>
    </div>
  </>
        
  )
}
