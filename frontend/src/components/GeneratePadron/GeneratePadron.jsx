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

import DropdownCribroomList from "../DropdownCribroomList/DropdownCribroomList";

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
      // const response = await axios.get(`/api/cribroom/?zone=${zoneId}`, { headers });
      const response = {};

      const jsonData = response.data;
      setCribrooms(jsonData);
    } catch (error) {
      console.error("Error fetching cribrooms:", error);
      handlePermissions(error.response.status);
    }
  }

  async function loadZones() {
    try {
      // const response = await getAllZones(authTokens.access);
      const response = {};

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
      <div>
        <header className="header-padron" style={{ marginTop: 100 }}>
          <Menu />
        </header>
      </div>
      <div>
        <body className="mt-3">
          <h1 className="titulo-cb">Generar Padron</h1>
          <div className="contenedor-linea-report">
            <hr className="linea-report"></hr>
          </div>
          {/* Use the DropdownCribroomList component */}
          <DropdownCribroomList authTokens={authTokens.access} />
        </body>
      </div>
    </>
  );

  // return (
  //   <>
  //   <div>
  //       <header className="header-padron" style={{ marginTop: 100 }}>
  //         <Menu />
  //       </header>
  //   </div>
  //   <div > 
  //       <body className="mt-3">
        
  //       <h1 className="titulo-cb">Generar Padron</h1>
  //       <div className="contenedor-linea-report">
  //         <hr className="linea-report"></hr>
  //       </div>
  //       <Row>
  //         <Form.Label className="mb-1 ms-3">Seleccionar Zona</Form.Label>
  //         <Col className="col-md-3 add-payout-button ">
  //           <Form.Select
  //             className="mb-1"
  //             name="zoneCR"
  //             as="select"
  //             value={selectedZone}
  //             onChange={handleSelectChange}
  //           >
  //             <option value="" disabled>
  //               Seleccionar Zona
  //             </option>
  //             {zoneOptions.map((zone) => (
  //               <option key={zone.id} value={zone.id}>
  //                 {zone.name}
  //               </option>
  //             ))}
  //           </Form.Select>
  //         </Col>
  //         <Col className="col-sm-1">
  //           <Button
  //             variant="primary"
  //             onClick={handlePdfClick}
  //             className="mt-3 ms-2 add-payout-button"
  //           >
  //             PDF
  //           </Button>
  //         </Col>
  //         <Col className="col-sm-1">
  //           <Button
  //             variant="success"
  //             onClick={handleExcelClick}
  //             className="mt-3 ms-2 add-payout-button"
  //           >
  //             EXCEL
  //           </Button>
  //         </Col>
  //       </Row>
  //       <div className="DataGrid-Wrapper-report">
  //         <DataGrid
  //           style={{ borderRadius: "15px", margin: "20px" }}
  //           rows={cribrooms}
  //           columns={columns}
  //           columnBuffer={2}
  //           columnThreshold={2} />
  //       </div>
  //     </body>
  //   </div>
      
  //   </>
  // );
}

export default GeneratePadron;
