import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

type SearchBoxProps = {
  onSearch: (searchTerm: string) => void;
}

const SearchBox = ({ onSearch }:any) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e:any) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Form className="form">
      <InputGroup>
        <Form.Control
          className="search"
          placeholder="Search for a Pokemon..."
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>
    </Form>
  );
};

export default SearchBox;