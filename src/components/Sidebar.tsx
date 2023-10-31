import React, { useState } from 'react';
import Select from 'react-select';
import { types } from '../hooks/TypesData';

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: 'black',
  }),
};

const Sidebar = ({ onSelect }: any) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSelect = (selectedOptions: any) => {
    const selectedTypeValues = selectedOptions.map((option: any) => option.value);
    setSelectedTypes(selectedTypeValues);
    onSelect(selectedTypeValues);
  };


  return (
    <Select
      value={types.filter((type) => selectedTypes.includes(type.value))}
      defaultValue={[]}
      isMulti
      name="colors"
      options={types}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={customStyles}
      onChange={handleSelect}
    />
  );
};

export default Sidebar;