import { useState } from 'react';
import Select from 'react-select';
import { types } from '../hooks/TypesData';

const customStyles = {
  option: (provided: any) => ({
    ...provided,
    color: 'black',
    zIndex:10,
  }),
};

const TypeFilter = ({ onSelect }: any) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSelect = (selectedOptions: any) => {
    const selectedTypeValues = selectedOptions.map((option: any) => option.value);
    setSelectedTypes(selectedTypeValues);
    onSelect(selectedTypeValues);
  };


  return (
    <>
      <Select
        value={types.filter((type) => selectedTypes.includes(type.value))}
        defaultValue={[]}
        placeholder="Types" 
        isMulti
        name="types"
        options={types}
        className="multiselectTypes"
        classNamePrefix="select"
        styles={customStyles}
        onChange={handleSelect}
      />
      
    </>
    
  );
};

export default TypeFilter;