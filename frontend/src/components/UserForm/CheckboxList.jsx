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
    const allCribroomCodes = options.map((option) => option.id);
    onChange(selectAll ? [] : allCribroomCodes, !selectAll);
  };

  const handleCheckboxChange = (id) => {
    const updatedSelection = selectedOptions.includes(id)
      ? selectedOptions.filter((selectedId) => selectedId !== id)
      : [...selectedOptions, id];

    onChange(updatedSelection);
  };

  return (
    <>
    <FormControlLabel
        control={<Checkbox checked={selectAll} onChange={handleSelectAllChange} />}
        label="Select All"
      />
      <FormControl component="fieldset">
        {/* <InputLabel>Search:</InputLabel> */}
        <TextField value={searchTerm} onChange={handleSearchChange} placeholder={`Search: `}/>
      </FormControl>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.id}
            control={
              <Checkbox
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
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
