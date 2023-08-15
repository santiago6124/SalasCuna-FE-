import React, { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { getAllCribrooms } from '../../api/salasCuna.api';

export default function DropdownCribroomList() {
  const [cribrooms, setCribrooms] = useState([]);
  const [childs, setChild] = useState([]);
  const [selectedChild] = useState('');
  const [selectedCribroom, setSelectedCribroom] = useState('');

  const handleCribroomChange = (event) => {
    setSelectedCribroom(event.target.value);
  };

  const navigate = useNavigate();

  const handleNewClick = () => {
  navigate('/children-management/new');
  };



  const handleCargarClick = async () => {
    if (selectedCribroom) {
      try {
        console.log('ID de la Cribroom seleccionada:', selectedCribroom);
        const res = await axios.get('http://127.0.0.1:8000/api/child/?padron_cribroom_id=' + selectedCribroom);
        setChild(res.data);

      } catch (error) {
        console.log('Error fetching Chicos:', error);
      }
    } else {
      console.log('Ninguna Cribroom seleccionada');
    }
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

  const handleDelete = async (childId) => {
    try {
      console.log(childId + " id");
     const response = await axios.patch(`http://127.0.0.1:8000/api/child/${childId}/?disenroll=True` );
      console.log("Response after updating child state:", response.data);


      setChild(childs.map((child) => {
        if (child.id === childId) {
          return { ...child, child_state: 0 };
          
        }
        return child;
      }));
      alert("Child state updated successfully");
    } catch (err) {
      alert("Error updating child state");
    }
  };
  
  
       

  return (
    <div>
      <Row className="mb-3">
        <Col>
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
        </Col>
        <Col>
          <div className="contenedor-boton mt-4 ">
            <Button
              as="input"
              type="submit"
              value="Cargar"
              size="m"
              onClick={handleCargarClick}
            />
          </div>
        </Col>
        <Col>
          <div className="contenedor-boton mt-4 ">
            <Button
              as="input"
              type="submit" 
              value="New"
              size="m"
              onClick={handleNewClick}
            />
          </div>
        </Col>
      </Row>
  
      <div>
        {childs.length > 0 && (
          <div>
            {childs.map((child) => (
              <div key={child.id}>
                <h1>{child.first_name} {child.last_name}</h1>
                <Button csize="s" >Editar</Button>
                <Button onClick={() => handleDelete(child.id)}>Eliminar</Button>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
};





