import React,{useState} from 'react'
import PokemonContainer from './PokemonContainer'
import Sidebar from './Sidebar'

export default function Container() {

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); 

  //Stores selected types in the state each time the multi-select changes
  const handleSelect = (types:string[]) => {
    setSelectedTypes(types);
  };

  return (
    <div>
        <Sidebar onSelect={handleSelect}></Sidebar>
        <PokemonContainer selectedTypes={selectedTypes}></PokemonContainer>
    </div>
  )
}
