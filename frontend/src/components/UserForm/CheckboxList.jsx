import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Checkbox, FormGroup, TextField, Button, FormControlLabel } from '@mui/material';

const CheckboxList = ({ options, selectedOptions, onChange, onSearch, totalPages, currentPage, onNextPage, onPrevPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [globalSelectAll, setGlobalSelectAll] = useState({}); // Nuevo estado global

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  const handleSelectAllChange = () => {
    const allCribroomCodes = options.map((option) => option.id);
    const newGlobalSelectAll = { ...globalSelectAll, [currentPage]: !globalSelectAll[currentPage] };
    setGlobalSelectAll(newGlobalSelectAll);
    onChange(newGlobalSelectAll[currentPage] ? allCribroomCodes : [], newGlobalSelectAll[currentPage]);
  };

  const handleCheckboxChange = (id) => {
    const updatedSelection = selectedOptions.includes(id)
      ? selectedOptions.filter((selectedId) => selectedId !== id)
      : [...selectedOptions, id];

    onChange(updatedSelection);
  };

  return (
    <>
      {/* <FormControlLabel
        control={<Checkbox checked={globalSelectAll[currentPage] || false} onChange={handleSelectAllChange} />}
        label="Select All"
      /> */}
      <FormControl component="fieldset">
        <TextField value={searchTerm} onChange={handleSearchChange} placeholder={`Search: `} />
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
            label={`${option.name} ${option.code}`} // Ajusta esta línea para incluir el texto deseado
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
