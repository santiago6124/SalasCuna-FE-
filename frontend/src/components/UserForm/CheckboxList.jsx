// CheckboxList.js
import React, { useState } from 'react';
import { FormControl, InputLabel, Checkbox, FormGroup, TextField, Button } from '@mui/material';

const CheckboxList = ({ options, selectedOptions, onChange, onSearch, totalPages, currentPage, onNextPage, onPrevPage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <>
      <FormControl component="fieldset">
        <InputLabel>Search:</InputLabel>
        <TextField value={searchTerm} onChange={handleSearchChange} />
      </FormControl>
      <FormGroup>
        {options.map((option) => (
          <Checkbox
            key={option.code}
            checked={selectedOptions.includes(option.code)}
            onChange={() => onChange(option.code)}
          />
        ))}
      </FormGroup>
      <div>
        <Button onClick={onPrevPage} disabled={currentPage === 1}>
          Prev Page
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button onClick={onNextPage} disabled={currentPage === totalPages}>
          Next Page
        </Button>
      </div>
    </>
  );
};

export default CheckboxList;
