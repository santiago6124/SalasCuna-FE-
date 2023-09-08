import React, { useState, useEffect } from 'react';

import '../DropdownCribroomList/DropdownCribroomList.css';

import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { getAllCribroomsWithoutDepth } from '../../api/salasCuna.api';
import { GridActionsCell, GridActionsCellItem } from '@mui/x-data-grid';

import { DataGrid, GridToolbar, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import AsyncSelect from 'react-select/async';

import { ExportButton } from './ExcelExport/ExportButton';

function CustomToolbar(props) {
  return (
    <GridToolbarContainer {...props}>
      <ExportButton />
    </GridToolbarContainer>
  );
}

export default function DropdownCribroomList() {
  const [cribrooms, setCribrooms] = useState([]);
  const [childs, setChild] = useState([]);
  const [selectedCribroom, setSelectedCribroom] = useState('');
  const [showNewButton, setShowNewButton] = useState(false);


  const handleEditClick = (childId) => {
    navigate('/children-management/edit', { state: { childId } });
    console.log("id chico" + childId);
  };

 

  const navigate = useNavigate();

  const handleNewClick = () => {
  navigate('/children-management/new');
  };



  const handleCargarClick = async () => {
    if (selectedCribroom) {
      try {
        console.log('ID de la Cribroom seleccionada:', selectedCribroom);
        const res = await axios.get('/api/child/?no_depth&cribroom_id=' + selectedCribroom);
        console.log('API Response:', res.data);
        const updateChild = await res.data.map (child => {

        return {...child,is_active: child.is_active ? 'Activo' : 'Inactivo'}

            
        })

        setChild(updateChild);
        setShowNewButton(true);


      } catch (error) {
        console.log('Error fetching Chicos:', error);
      }
    } else {
      console.log('Ninguna Cribroom seleccionada');
    }
  };


  const handleLoadCribroomOptions = async (inputValue) => {
  try {
    const response = await getAllCribroomsWithoutDepth();
    setCribrooms(response.data);
    console.log('All Cribrooms:', response.data); // Verifica las opciones de sala cuna

    if (!inputValue) {
      console.log('No inputValue. Returning all cribrooms.');
      return response.data.map(cribroom => ({
        value: cribroom.id,
        label: cribroom.name,
      }));
    }

    const filteredOptions = response.data.filter(cribroom =>
      cribroom.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    console.log('Filtered Options:', filteredOptions); // Verifica las opciones filtradas

    return filteredOptions.map(cribroom => ({
      value: cribroom.id,
      label: cribroom.name,
    }));
  } catch (error) {
    console.log('Error fetching Cribrooms:', error);
    return [];
  }
};

  const handleDelete = async (childId) => {
    try {
      console.log(childId + " id");
      const response = await axios.patch(`/api/child/${childId}/?disenroll=True` );
      console.log("Response after updating child state:", response.data);


      
    } catch (err) {
      alert("Error updating child state");
    }
  };

  
  
  const columns = [
    { field: 'id', headerName: '#', width: 50 , headerAlign: 'center' , align: 'center'},
    { field: 'first_name' , headerName: 'Nombre' , width: 150 , headerAlign: 'center' , align: 'center'},
    { field: 'last_name', headerName: 'Apellido' , width: 150 , headerAlign: 'center', align: 'center'},
    { field: 'dni', headerName: 'DNI' , width: 150 , headerAlign: 'center', align: 'center'},
    { field: 'is_active', headerName: 'Estado' , width: 140 , headerAlign: 'center', align: 'center'},
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Acciones',
        width: 90,
        headerAlign: 'center',
        align: 'center',
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
                <AsyncSelect cacheOptions  loadOptions={handleLoadCribroomOptions} onChange={(selectedOption) => {if (selectedOption) {setSelectedCribroom(selectedOption.value);}}} defaultOptions />
            </div>

            <div className="button-container">
              <Button
                as="input"
                type="button"
                value="Cargar"
                size="m"
                onClick={handleCargarClick}
              />
            </div>
          </div>
        </Col>
        <Col>
          {showNewButton && ( // Mostrar el botón solo si showNewButton es true
            <div className="contenedor-boton-new">
              <Button
                as="input"
                type="submit"
                value="New"
                size="m"
                onClick={handleNewClick}
              />
            </div>
          )}
        </Col>
      </Row>
  
      <div>
        {childs.length > 0 && (
          // <DataGrid
          //   rows={childs}
          //   columns={columns}
          //   autoHeight
          //   initialState={{
          //     pagination: { paginationModel: { pageSize: 6 } },
          //   }}
          //   pageSizeOptions={[6]}
          // />

          <DataGrid
            rows={childs}
            columns={columns}
            autoHeight
            components ={{
              Toolbar: GridToolbar, // Enable the default toolbar
              Export: GridToolbarExport, // Enable the export menu
            }}
            exportOptions={{
              excelOptions: {
                fileName: 'child_data', // Set the file name
                columnsStyles: {
                  // Customize column styles if needed
                  first_name: { font: { bold: true } },
                  last_name: { font: { bold: true } },
                  dni: { font: { bold: true } },
                  is_active: { font: { bold: true } },
                },
              },
            }}
          />

        )}
      </div>
      <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={childs}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
    </div>
  )
};





