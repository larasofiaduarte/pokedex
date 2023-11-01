import React,{useState} from 'react'
import PokemonContainer from './PokemonContainer'
import TypeFilter from './TypeFilter'
import ColorFilter from './ColorFilter'
import BabyFilter from './BabyFilter'
import WeightFilter from './WeightFilter'
import styles from '../styles/styles.scss'

export default function Container() {

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); 
  const [selectedColor, setSelectedColor] = useState<string[]>();
  const [isBabyChecked, setIsBabyChecked] = useState(false);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(1999);

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

  

  return (
    <div>
      <div className="filtersCont">
        <TypeFilter onSelect={handleSelect}></TypeFilter>
        <ColorFilter onSelect={handleColorSelect}></ColorFilter>
        <WeightFilter onMinWeightChange={handleMinWeight} onMaxWeightChange={handleMaxWeight}></WeightFilter>
        <BabyFilter onCheckboxChange={handleBabyCheckboxChange}></BabyFilter>
      </div>
        
        <PokemonContainer selectedTypes={selectedTypes} selectedColor={selectedColor} isBabyChecked={isBabyChecked} minWeight={minWeight} maxWeight={maxWeight}></PokemonContainer>
    </div>
  )
}
