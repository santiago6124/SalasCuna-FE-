import React, { useState, useEffect, useContext } from "react";
import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "react-bootstrap/Button/";
import Menu from "../Menu/Menu";
import { getAllZones, handlePermissions } from "../../api/salasCuna.api";
import AuthContext from "../../context/AuthContext";

import "./GeneratePadron.css"


function GeneratePadron() {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [cribrooms, setCribrooms] = useState([]);
  let { authTokens } = useContext(AuthContext);

  let headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + authTokens.access,
    "Accept": "application/json"
  };

  function handlePdfClick() {
    
  }
  function handleExcelClick() {
    // Implement your Excel generation logic here
    console.log("Generate Excel logic will be implemented here");
  }
  useEffect(() => {
    loadZones();
  }, []);

  useEffect(() => {
    if (selectedZone) {
      loadCribrooms(selectedZone);
    }
  }, [selectedZone]);

  async function loadCribrooms(zoneId) {
    try {
      const response = await axios.get(`/api/cribroom/?zone=${zoneId}`, { headers });
      const jsonData = response.data;
      setCribrooms(jsonData);
    } catch (error) {
      console.error("Error fetching cribrooms:", error);
      handlePermissions(error.response.status);
    }
  }

  async function loadZones() {
    try {
      const response = await getAllZones(authTokens.access);
      const jsonData = response.data;
      setZoneOptions(jsonData);
    } catch (error) {
      console.error("Error fetching zone options:", error);
    }
  }

  function handleSelectChange(event) {
    setSelectedZone(event.target.value);
  }

  const columns = [
    { field: "code", headerName: "Código" , width: 80 },
    { field: "name", headerName: "Nombre" , width: 150 },
    { field: "cuit", headerName: "CUIT" , width: 150 },
    { field: "entidad", headerName: "Entidad" , width: 120 },
    { field: "cantidad_ninos", headerName: "Cantidad de Niños" , width: 140 },
    {
      field: "select",
      headerName: "Seleccionar",
      sortable: false,
      filterable: false,
      width: 90,
      renderCell: (params) => (
        <input type="checkbox" checked={params.row.selected} />
      ),
    },
  ];

  return (
    <>
    <div>
        <header className="header-padron">
          <Menu />
        </header>
    </div>
    <div > 
        <body className="mt-3">
        
        <h1 className="titulo-cb">Generar Padrón</h1>
        <div className="contenedor-linea-note">
          <hr className="linea-note"></hr>
        </div>
        <div className="center-row">
          <Row>
            <Form.Label className="mb-1 ms-3">Seleccionar Zona</Form.Label>
            <Col className="col-md-5 " > {/* Ajusta el ancho según tus necesidades */}
              <Form.Select
                className="mb-1"
                name="zoneCR"
                as="select"
                value={selectedZone}
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
            </Col>
            <Col className="col-md-1"> {/* Ajusta el ancho según tus necesidades */}
              <Button
                variant="primary"
                onClick={handlePdfClick}
                className="mt-3 ms-2"
              >
                PDF
              </Button>
            </Col>
            <Col className="col-md-2"> {/* Ajusta el ancho según tus necesidades */}
              <Button
                variant="success"
                onClick={handleExcelClick}
                className="mt-3 ms-2 add-payout-button"
              >
                EXCEL
              </Button>
            </Col>
          </Row>
        </div>
        
        <div className="DataGrid-Wrapper-padron">
          <DataGrid
            className="custom-data-grid-padron"
            style={{ borderRadius: "15px", margin: "20px" }}
            rows={cribrooms}
            columns={columns}
            columnBuffer={2}
            columnThreshold={2} />
        </div>
      </body>
    </div>
      
    </>
  );
}

export default GeneratePadron;
