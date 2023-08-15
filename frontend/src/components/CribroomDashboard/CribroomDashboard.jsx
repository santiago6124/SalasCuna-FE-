import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar"

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import "./CribroomDashboard.css";

import {
  getAllCribrooms,
  getAllShifts,
  getAllZones,
} from "../../api/salasCuna.api";
import { margin } from "@mui/system";
import { key } from "localforage";

export default function CribroomDashboard() {
  const [cribrooms, setCribrooms] = useState([]);
  const [zoneOptions, setZoneOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [selectedCribroom, setSelectedCribroom] = useState("");

  useEffect(() => {
    listCribroom();
  }, []);

  const listCribroom = async () => {
    try {
      const response = await getAllCribrooms();
      setCribrooms(response.data);
    } catch (error) {
      console.log("Error fetching SalasCunas:", error);
    }
  };

  const listShift = async () => {
    try {
      const response = await getAllShifts();
      setShiftOptions(response.data);
    } catch (error) {
      console.log("Error fetching Shifts:", error);
    }
  };
  const listZone = async () => {
    try {
      const response = await getAllZones();
      setZoneOptions(response.data);
    } catch (error) {
      console.log("Error fetching Zones:", error);
    }
  };
  const handleEdit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      name: formData.get("nameCR"),
      code: formData.get("codeCR"),
      max_capacity: formData.get("max_capacityCR"),
      street: formData.get("streetCR"),
      house_number: formData.get("house_numberCR"),
      shift: formData.get("shiftCR"),
      zone: formData.get("zoneCR"),
    };
    if (selectedCribroom) {
      try {
        let response = await fetch(
          "http://127.0.0.1:8000/api/cribroom/" + selectedCribroom + "/",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          console.log("Cribroom Updated");
        } else {
          console.log("Failed to Update");
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    if (selectedCribroom) {
      try {
        let response = await fetch(
          "http://127.0.0.1:8000/api/cribroom/" + selectedCribroom + "/",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        alert("Error al eliminar la sala cuna");
      }
    }
  };

  const handleCribroomChange = async (event) => {
    setSelectedCribroom(event.target.value);
  };

  const [keyword, setKeyword] = useState("");


  return (
    <body>
      <div className="cribroom-dashboard">
        <header className="header">
          <Menu />
        </header>
        <h1 className="titulo-cb">Gestion De Salas Cuna</h1>
        <div className="contenedor-linea-cb">
          <hr className="linea-cb"></hr>
        </div>
        <div><SearchBar
        keyword={keyword} onChange={setKeyword}/></div>
        <div className="DataGrid-Wrapper">
          <DataGrid
            style={{ borderRadius: "15px", margin: "20px" }}
            rows={cribrooms}
            columns={[
              { field: "id", headerName: "Codigo Sala Cuna", width: 150 },
              { field: "name", headerName: "Nombre", width: 200 },
              { field: "street", headerName: "Direccion", width: 150 },
              { field: "house_number", headerName: "Numero", width: 150 },
              {
                field: "max_capacity",
                headerName: "Cap. Maxima",
                width: 150,
              },
              { field: "locality", headerName: "Localidad", width: 150 },
              { field: "is_active", headerName: "Estado", width: 150 },
            ]}
            autoHeight
            autoWidth
            pageSize={5}
          />
        </div>
      </div>
    </body>
  );
}