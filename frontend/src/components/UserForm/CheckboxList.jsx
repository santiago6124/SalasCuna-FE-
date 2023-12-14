// CheckboxList.js
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Checkbox, FormGroup, TextField, Button, FormControlLabel } from '@mui/material';

const CheckboxList = ({ options, selectedOptions, onChange, onSearch, totalPages, currentPage, onNextPage, onPrevPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    onChange(selectAll ? [] : options.map((option) => option.code), !selectAll);
  };

  return (
    <>
    <FormControlLabel
        control={<Checkbox checked={selectAll} onChange={handleSelectAllChange} />}
        label="Select All"
      />
      <FormControl component="fieldset">
        <InputLabel>Search:</InputLabel>
        <TextField value={searchTerm} onChange={handleSearchChange} />
      </FormControl>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.code}
            control={
              <Checkbox
                checked={selectedOptions.includes(option.code)}
                onChange={() => onChange(option.code, !selectedOptions.includes(option.code))}
              />
            }
            label={`${option.name} ${option.code}`} // Adjust this line to include the desired text
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
