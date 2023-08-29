import React, { useEffect, useState } from "react";
import axios from "axios";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";

//Style imports
import "./Payout.css";

//UI imports
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Form } from "react-bootstrap";

import Menu from "../Menu/Menu";

export default function PayoutTest() {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [payout, setPayout] = useState("");

  useEffect(() => {
    loadZones();
  }, []);

  useEffect(() => {
    if (selectedZone) {
      loadPayout(selectedZone);
    }
  }, [selectedZone]);

  const loadZones = async () => {
    try {
      const response = await fetch("/api/zone/");
      let jsonData = await response.json();
      setZoneOptions(jsonData);
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  };

  const loadPayout = async (zoneId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/payout/?zone=${zoneId}`
      );
      const jsonData = response.data;
      setPayout(jsonData);
    } catch (error) {
      console.error("Error fetching cribrooms:", error);
    }
  };
  return (
    <>
      <body>
        <div className="cribroom-dashboard">
          <header className="header">
            <Menu />
          </header>
          <>
            <>
              <h1 className="titulo-cb">Maestro Montos</h1>
              <div className="contenedor-linea-cb">
                <hr className="linea-cb"></hr>
              </div>
              <Row>
                <Col className="col-md-2">
                  <Form.Label className="mb-1">Seleccionar Zona</Form.Label>
                  <Form.Select as="select" name="zone">
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
                <Col>
                  <div className="add-payout-button mb-3">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      className="add-payout-button mb-3"
                    >
                      Add Payout
                    </Button>
                  </div>
                </Col>
              </Row>
              <div className="DataGrid-Wrapper">
                <DataGrid
                  style={{ borderRadius: "15px", margin: "20px" }}
                  rows={""}
                  columns={[
                    {
                      field: "id",
                      headerName: "Id de pago",
                      width: 250,
                    },
                    { field: "amount", headerName: "Monto", width: 250 },
                    { field: "Date", headerName: "Fecha", width: 250 },
                    {
                      field: "actions",
                      type: "actions",
                      headerName: "Acciones",
                      width: 80,
                      getActions: (params) => [
                        <GridActionsCellItem
                          icon={<DeleteIcon />}
                          label="Delete"
                        />,
                        <>
                          <GridActionsCellItem
                            variant="primary"
                            icon={<EditIcon />}
                          />
                        </>,
                      ],
                    },
                  ]}
                  autoHeight
                  autoWidth
                  pageSize={5}
                />
              </div>
            </>
          </>
        </div>
      </body>
    </>
  );
}
