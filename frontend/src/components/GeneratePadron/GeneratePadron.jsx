import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "react-bootstrap/Button/";
import Menu from "../Menu/Menu";

const GeneratePadron = () => {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [cribrooms, setCribrooms] = useState([]);
  const handlePdfClick = () => {
    // Implement your PDF generation logic here
    console.log("Generate PDF logic will be implemented here");
  };
  const handleExcelClick = () => {
    // Implement your Excel generation logic here
    console.log("Generate Excel logic will be implemented here");
  };
  useEffect(() => {
    loadZones();
  }, []);

  useEffect(() => {
    if (selectedZone) {
      loadCribrooms(selectedZone);
    }
  }, [selectedZone]);

  const loadCribrooms = async (zoneId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/cribroom/?zone=${zoneId}`
      );
      const jsonData = response.data;
      setCribrooms(jsonData);
    } catch (error) {
      console.error("Error fetching cribrooms:", error);
    }
  };

  const loadZones = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/zone/");
      const jsonData = response.data;
      setZoneOptions(jsonData);
    } catch (error) {
      console.error("Error fetching zone options:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedZone(event.target.value);
  };

  const columns = [
    { field: "code", headerName: "Codigo" },
    { field: "name", headerName: "Nombre Sala" },
    { field: "cuit", headerName: "CUIT" },
    { field: "entidad", headerName: "Entidad" },
    { field: "cantidad_ninos", headerName: "Cantidad de Niños" },
    {
      field: "select",
      headerName: "Seleccionar",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => (
        <input type="checkbox" checked={params.row.selected} />
      ),
    },
  ];

  return (
    <>
      <body>
        <header className="header">
          <Menu />
        </header>
        <h1 className="titulo-cb">Generar Padron</h1>
        <div className="contenedor-linea-report">
          <hr className="linea-report"></hr>
        </div>
        <Row>
          <Form.Label className="mb-1 ms-3">Seleccionar Zona</Form.Label>
          <Col className="col-md-3 add-payout-button ">
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
          <Col className="col-sm-1">
            <Button
              variant="primary"
              onClick={handlePdfClick}
              className="mt-3 ms-2 add-payout-button"
            >
              PDF
            </Button>
          </Col>
          <Col className="col-sm-1">
            <Button
              variant="success"
              onClick={handleExcelClick}
              className="mt-3 ms-2 add-payout-button"
            >
              EXCEL
            </Button>
          </Col>
        </Row>
        <div className="DataGrid-Wrapper-report">
          <DataGrid
            style={{ borderRadius: "15px", margin: "20px" }}
            rows={cribrooms}
            columns={columns}
            columnBuffer={2}
            columnThreshold={2}
          />
        </div>
      </body>
    </>
  );
};

export default GeneratePadron;
