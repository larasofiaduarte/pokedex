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

export default function Filters({
            selectedTypes,
            handleSelect,
            selectedColor,
            handleColorSelect,
            isBabyChecked,
            handleBabyCheckboxChange,
            minWeight,
            handleMinWeight,
            maxWeight,
            handleMaxWeight,
            filtersVisible,
  }:any) {

  const location = useLocation();


  return (
    
  <>
    <div className="filtersContainer">
      {location.pathname === '/' || location.pathname==='/list' ? (
        <div className="filtersContainer--cont">
          <List className={`filters ${filtersVisible ? 'visible' : 'hidden'}`} sx={{display:'flex', justifyItems:'left', justifyContent:'center'}}>
              <ListItem className="filtersItem">
                <TypeFilter onSelect={handleSelect}></TypeFilter>
              </ListItem>
              <ListItem className="filtersItem">
                <ColorFilter onSelect={handleColorSelect}></ColorFilter>
              </ListItem>
              <ListItem className="filtersItem" sx={{width:300}}>
                <WeightFilter onMinWeightChange={handleMinWeight} onMaxWeightChange={handleMaxWeight}></WeightFilter>
              </ListItem>
              <ListItem className="filtersItem">
                <BabyFilter onCheckboxChange={handleBabyCheckboxChange}></BabyFilter>
              </ListItem>
            </List>
          </div>
        ):null}
    </div>
 </>
        
  )
}