import React,{useState, useEffect} from 'react'
import PokemonContainer from './PokemonContainer'
import TypeFilter from './TypeFilter'
import ColorFilter from './ColorFilter'
import BabyFilter from './BabyFilter'
import WeightFilter from './WeightFilter'
import styles from '../styles/styles.scss'
import TuneIcon from '@mui/icons-material/Tune';
import {List, ListItem, Divider} from '@mui/material'
import {useLocation} from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { SafetyDividerSharp } from '@mui/icons-material'

export default function Container() {

  const location = useLocation();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); 
  const [selectedColor, setSelectedColor] = useState<string[]>();
  const [isBabyChecked, setIsBabyChecked] = useState(false);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(1999);
  const [filtersVisible, setFiltersVisible] = useState(false);

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
    <div style={{display:'flex'}} className="container">
      {location.pathname === '/' || location.pathname==='/list' ? (
        <div className="filtersMenu">
          <div style={{display:'flex'}} className="filtersMenuTitle">
            <button onClick={toggleFilters} className="filtersBtn">
              <TuneIcon></TuneIcon>
            </button>
            <h4 style={{display:'flex', alignItems:'center', padding:1, margin:10}}>Filters</h4>
          </div>
          <List className={`filters ${filtersVisible ? 'visible' : 'hidden'}`}>
            <Divider sx={{backgroundColor:'grey'}}/>
              <ListItem className="listItem" sx={{display:'block'}}>
                <div>Types</div>
                <TypeFilter onSelect={handleSelect}></TypeFilter>
              </ListItem>
              <Divider sx={{backgroundColor:'grey'}}/>
              <ListItem className="listItem" sx={{display:'block'}}>
                <div>Color</div>
                <ColorFilter onSelect={handleColorSelect}></ColorFilter>
              </ListItem>
              <Divider sx={{backgroundColor:'grey'}}/>
              <ListItem className="listItem" sx={{display:'block'}}>
                <div>Weight Range</div>
                <WeightFilter onMinWeightChange={handleMinWeight} onMaxWeightChange={handleMaxWeight}></WeightFilter>
              </ListItem>
              <Divider sx={{backgroundColor:'grey'}}/>
              <ListItem className="listItem" sx={{display:'block'}}>
                <BabyFilter onCheckboxChange={handleBabyCheckboxChange}></BabyFilter>
              </ListItem>
              <Divider sx={{backgroundColor:'grey'}}/>
            </List>
          </div>
          ):null}
        <PokemonContainer selectedTypes={selectedTypes} selectedColor={selectedColor} isBabyChecked={isBabyChecked} minWeight={minWeight} maxWeight={maxWeight}></PokemonContainer>
        </div>
        </>
        
  )
}
