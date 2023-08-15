import React from 'react'
import './TechnicalReport.css';

import Col from 'react-bootstrap/Col/';
import Row from 'react-bootstrap/Row/';
import Form from 'react-bootstrap/Form/';
import Button from 'react-bootstrap/Button/';
import Table from 'react-bootstrap/Table/';
import InputGroup from 'react-bootstrap/InputGroup/';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';
import axios from 'axios'; // Import axios
import { useState, useEffect } from 'react';



export default function TechnicalReport() {
    const [zoneOptions, setZoneOptions] = useState([]);
    const [selectedZona, setSelectedZone] = useState("");
    const [zone1Cribrooms, setZone1Cribrooms] = useState([]);
    const [zone2Cribrooms, setZone2Cribrooms] = useState([]);

    useEffect(() => {
      loadZones();
      loadZone1Cribrooms();
      loadZone2Cribrooms();
    }, []);
    const loadZone1Cribrooms = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/cribroom/?zone=1");
        const jsonData = await response.json();
        setZone1Cribrooms(jsonData);
      } catch (error) {
        console.error("Error fetching Zone 1 payouts:", error);
      }
    };
    
    const loadZone2Cribrooms = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/cribroom/?zone=2");
        const jsonData = await response.json();
        setZone2Cribrooms(jsonData);
      } catch (error) {
        console.error("Error fetching Zone 2 payouts:", error);
      }
    };
  
    const loadZones = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/ZoneReadOnlyModelViewSet/");
        let jsonData = await response.json();
        setZoneOptions(jsonData);
      } catch (error) {
        console.error("Error fetching zona options:", error);
      }
    };
  
    const handleSelectChange = (event) => {
      setSelectedZone(event.target.value);
    };
    

    return (
        <div className='container-report mt-5'>
            <div className='container-titulo-report '>
                <h1>Informe Tecnico</h1>
            </div>
            <div className='contenedor-linea-report'>
                <hr className='linea-report'></hr>
            </div>
            <Row className="mb-3">
                <Col>
                    <div className='input-select'>
                    <Form.Select
name="zoneCR"
as="select"
value={selectedZona}
onChange={handleSelectChange}
>
<option value="" disabled>
  Seleccionar Zona
</option>
{zoneOptions.map((zone) => (
  <option key={zone.id} value={zone.id}>
    {zone.name}
  </option>
))}
</Form.Select>
                    </div>
                </Col>
                <Col>
                    {/* Buttons */}
                </Col>
            </Row>

            <div>
                <div style={{ height: 400, width: '100%' }}>
                </div>
            </div>
        </div>
    );
}