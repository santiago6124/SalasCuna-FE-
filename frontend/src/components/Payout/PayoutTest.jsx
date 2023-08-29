import React, { useEffect, useState } from "react";

import "./Payout.css";

import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Form } from "react-bootstrap";

import SearchBar from "../SearchBar/SearchBar";
import Menu from "../Menu/Menu";
import { margin } from "@mui/system";

export default function PayoutTest() {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [selectedZona, setSelectedZone] = useState("");
  const [zone1Payouts, setZone1Payouts] = useState([]);
  const [zone2Payouts, setZone2Payouts] = useState([]);
  const [editedPayout, setEditedPayout] = useState(null);
  const handleEditClick = (payout) => {
    setEditedPayout(payout);
  };
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedPayout = {
      amount: formData.get("amount"),
      date: formData.get("date"),
    };

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/payout/${editedPayout.id}/`, // Use the correct endpoint with the primary key
        updatedPayout
      );

      if (response.status === 200) {
        console.log("Payout updated successfully");
        // Refresh the UI or update the payouts state as needed
        setEditedPayout(null); // Clear the editedPayout state
      } else {
        console.log("Failed to update payout");
      }
    } catch (error) {
      console.error("An error occurred while updating payout:", error);
    }
  };
  useEffect(() => {
    loadZones();
    loadZone1Payouts();
    loadZone2Payouts();
  }, []);
  const loadZone1Payouts = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/payout/?zone_id_filter=1"
      );
      const jsonData = await response.json();
      setZone1Payouts(jsonData);
    } catch (error) {
      console.error("Error fetching Zone 1 payouts:", error);
    }
  };

  const loadZone2Payouts = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/payout/?zone_id_filter=2"
      );
      const jsonData = await response.json();
      setZone2Payouts(jsonData);
    } catch (error) {
      console.error("Error fetching Zone 2 payouts:", error);
    }
  };

  const loadZones = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/zone/");
      let jsonData = await response.json();
      setZoneOptions(jsonData);
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedZone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const payload = {
      amount: formData.get("amount"),
      date: formData.get("date"),
      zone: selectedZona, // Use the selectedZona state here
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/payout/",
        payload
      );

      console.log(payload);

      if (response.status === 201) {
        console.log("Payout added successfully");
        // Perform any further actions, such as refreshing the UI
      } else {
        console.log("Failed to add payout");
      }
    } catch (error) {
      console.error("An error occurred while adding payout:", error);
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
              <div>
                <div className="col-md-2">
                  <Form.Label className="mb-1">Seleccionar Zona</Form.Label>
                  <Form.Select as="select" name="role">
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
                <div>
                  <div className="add-payout-button mb-3 ">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                    >
                      Add Payout
                    </Button>
                  </div>
                </div>
              </div>
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
