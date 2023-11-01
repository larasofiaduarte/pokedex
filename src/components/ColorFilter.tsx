import React, { useState } from 'react';
import Select from 'react-select';
import {colors} from '../hooks/ColorData';
import styles from '../styles/styles.scss'

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: 'black',
  }),
};


const ColorFilter = ({ onSelect }: any) => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [isClearable, setIsClearable] = useState(true);

  
    const handleColorSelect = (selectedOption: any) => {
      setSelectedColor(selectedOption ? selectedOption.value : null);
      onSelect(selectedOption ? selectedOption.value : null);
      
    };
  

  return (
    <Select
      value={colors.find((color) => color.value === selectedColor)}
      name="colors"
      placeholder="Color" 
      options={colors}
      className="multiselect"
      classNamePrefix="select"
      styles={customStyles}
      onChange={handleColorSelect}
      isClearable={isClearable}
    />
  );
};

export default ColorFilter