import TypeFilter from './TypeFilter'
import ColorFilter from './ColorFilter'
import BabyFilter from './BabyFilter'
import WeightFilter from './WeightFilter'
import {List, ListItem, Divider} from '@mui/material'
import {useLocation} from 'react-router-dom';

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