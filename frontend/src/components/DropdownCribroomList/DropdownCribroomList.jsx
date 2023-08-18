import React, { useState, useEffect } from 'react';

import '../DropdownCribroomList/DropdownCribroomList.css';

import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { getAllCribrooms } from '../../api/salasCuna.api';
import { GridActionsCell, GridActionsCellItem } from '@mui/x-data-grid';

import { DataGrid } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function DropdownCribroomList() {
  const [cribrooms, setCribrooms] = useState([]);
  const [childs, setChild] = useState([]);
  const [selectedCribroom, setSelectedCribroom] = useState('');


  const handleEditClick = (childId) => {
    navigate('/children-management/edit', { state: { childId } });
    console.log("id chico" + childId);
  };

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
        console.log('API Response:', res.data);
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


      
    } catch (err) {
      alert("Error updating child state");
    }
  };
  
  const columns = [
    { field: 'id', headerName: '#' },
    { field: 'first_name' , headerName: 'Nombre' },
    { field: 'last_name', headerName: 'Apellido' },
    { field: 'dni', headerName: 'DNI' },
    { field: 'child_state', headerName: 'Estado' },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Acciones',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(params.row.id)}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEditClick(params.row.id)}
          />,
        ]
        
    },
    

];
  
       

  return (
    <div className='CRUD'>
      <Row className="mb-3">
        <Col>
          <div className="container">
            <div className="dropdown-container">
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

            <div className="button-container">
              <Button
                as="input"
                type="submit"
                value="Cargar"
                size="m"
                onClick={handleCargarClick}
              />
            </div>
          </div>
        </Col>
        <Col>
          <div className="contenedor-boton-new ">
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
          <DataGrid
            rows={childs}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            autoHeight
          />
        )}
      </div>
    </div>
  )
};





