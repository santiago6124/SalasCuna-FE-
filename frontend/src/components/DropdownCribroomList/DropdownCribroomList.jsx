import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { getAllCribrooms } from '../../api/salasCuna.api';

export default function DropdownCribroomList() {
  const [cribrooms, setCribrooms] = useState([]);
  const [selectedCribroom, setSelectedCribroom] = useState('');

  const handleCribroomChange = (event) => {
    setSelectedCribroom(event.target.value);
  };

  useEffect(() => {
    ListCribroom();
  }, []);

  const ListCribroom = async () => {
    try {
      const response = await getAllCribrooms();
      setCribrooms(response.data);
    } catch (error) {
      console.log('Error fetching SalasCunas:', error);
    }
  };

  return (
    <div>
      <Form.Label className='mb-1'>Salas Cunas</Form.Label>
      <select
        id='cribroom'
        name='cribroom'
        value={selectedCribroom}
        onChange={handleCribroomChange}
        className='form-control'
      >
        <option value=''>Salas Cunas</option>
        {cribrooms && cribrooms.map((cribroom) => (
          <option key={cribroom.id} value={cribroom.id}>
            {cribroom.name}
          </option>
        ))}
      </select>
    </div>
  );
}





