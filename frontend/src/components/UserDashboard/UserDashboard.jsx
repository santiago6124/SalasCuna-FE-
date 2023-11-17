import Menu from "../Menu/Menu";
import "./UserDashboard.css";

import Slider from "react-styled-carousel";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";

import {
  getAllCribroomsWithoutDepth,
  getAllLocalities,
  handlePermissions,
  getUserHistory,
} from "../../api/salasCuna.api";

//DataGrid Import
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import AuthContext from "../../context/AuthContext";

export default function AdminDashboard() {
  const [cribrooms, setCribrooms] = useState([]);
  const [filteredCribroom, setFilteredCribroom] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [userhistory, setUserHistory] = useState([]);

  let {authTokens} = useContext(AuthContext);

  let headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + authTokens.access,
    "Accept": "application/json"
}

  useEffect(() => {
    listCribroom();
    listUserHistory();
  }, []);

  const listCribroom = async () => {
    try {
      const responseLocality = await getAllLocalities(authTokens.access);
      const response = await getAllCribroomsWithoutDepth(authTokens.access);
      const localityData = responseLocality.data;
      const cribroomData = response.data;
      const updatedCribrooms = await cribroomData.map((cribroom) => {
        const matchingLocality = localityData.find(
          (locality) => locality.id === cribroom.locality
        );
        if (matchingLocality) {
          return {
            ...cribroom,
            locality: matchingLocality.locality,
            is_active: cribroom.is_active ? "Activo" : "Inactivo",
          };
        } else {
          return {
            ...cribroom,
            is_active: cribroom.is_active ? "Activo" : "Inactivo",
          };
        }
      });
      setCribrooms(updatedCribrooms);
      setFilteredCribroom(updatedCribrooms);
    } catch (error) {
      console.log("Error fetching SalasCunas:", error);
      handlePermissions(error.response.status);
    }
  };

  const listUserHistory = async () => {
    try {
      const userResponse = await getUserHistory(authTokens.access);
      console.log("USER HISTORY", userResponse.data[0]);
      setUserHistory(userResponse.data);
    } catch (error) {
      console.log(`ERROR USERHISTORY`, error);
    }
  };

  return (
    <body >
      <h1 className="titulo-home">Pagina de Administrador/a</h1>
      <div className="contenedor-linea-home">
        <hr className="linea-home" ></hr>
      </div>

      <div className="div-datagrids">
        <div className="DataGrid-Wrapper-Sala">
          <div className="div-datagrid-sala">
            <h4 className="datatitle-sala"> Salas Cuna</h4>
            <DataGrid
              pageSizeOptions={[4]}
              initialState={{
                pagination: { paginationModel: { pageSize: 4 } },
              }}
              style={{
                borderRadius: "15px",
                marginLeft: "50px",
                width: "auto",
                height: 350,
                margin: "25px",
              }}
              rows={filteredCribroom}
              columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "name", headerName: "Nombre", width: 200 },
                { field: "user", headerName: "Usuario", width: 120 },
              ]}
            ></DataGrid>
          </div>
          <div className="DataGrid-Wrapper-Usuario">
            <h4 className="datatitle"> Actividad Reciente</h4>
            <DataGrid
              pageSizeOptions={[4]}
              initialState={{
                pagination: { paginationModel: { pageSize: 4 } },
              }}
              style={{
                borderRadius: "15px",
                marginLeft: "50px",
                width: "auto",
                height: 350,
                margin: "25px",
              }}
              rows={userhistory}
              columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "object_repr", headerName: "Usuario", width: 250 },
              ]}
            ></DataGrid>
          </div>
        </div>
      </div>
      
    </body>
  );
}
