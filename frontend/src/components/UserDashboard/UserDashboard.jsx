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

  let { authTokens } = useContext(AuthContext);

  let headers = {
    "Content-Type": "application/json",
    Authorization: "JWT " + authTokens.access,
    Accept: "application/json",
  };

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

  const responsive = [
    { breakPoint: 1280, cardsToShow: 5 },
    { breakPoint: 760, cardsToShow: 3 },
  ];
  return (
    <body>
      <h1 className="titulo-home">Pagina de Administrador/a</h1>
      <div className="contenedor-linea-home">
        <hr className="linea-home"></hr>
      </div>
      <h3 className="subtitulo">Acciones Rapidas</h3>
      <div className="container-slider">
        <Slider
          className="container-slider"
          responsive={responsive}
          autoSlide={false}
          infiniteLoop={true}
          padding="30px"
          RightArrow={
            <ArrowCircleRightOutlinedIcon className="ArrowCircleRightOutlinedIcon" />
          }
          LeftArrow={
            <ArrowCircleLeftOutlinedIcon className="ArrowCircleLeftOutlinedIcon" />
          }
        >
          <Link to={"/gestion-sala"}>
            <Button
              className="button-slider "
              boton
              variant="primary"
              type="submit"
            >
              Gestionar Salas
            </Button>
          </Link>
          <Link to={"/maestro-montos"}>
            <Button
              className="button-slider "
              boton
              variant="primary"
              type="submit"
            >
              Maestro Montos
            </Button>
          </Link>

          <Link to={"/generate-padron"}>
            <Button
              className="button-slider"
              boton
              variant="primary"
              type="submit"
            >
              Generar Padron
            </Button>
          </Link>
          <Link to={"/children-management"}>
            <Button
              className="button-slider"
              boton
              variant="primary"
              type="submit"
            >
              Gestionar Chicos
            </Button>
          </Link>
          <Link to={"/informe-tecnico"}>
            <Button
              className="button-slider"
              boton
              variant="primary"
              type="submit"
            >
              Informe Tecnico
            </Button>
          </Link>
          <Link to={"/listar-usuarios"}>
            <Button
              className="button-slider"
              boton
              variant="primary"
              type="submit"
            >
              Usuarios
            </Button>
          </Link>
        </Slider>
      </div>
      <div className="contenedor-linea-home">
        <hr className="linea-home"></hr>
      </div>
      <div className="DataGrid-Wrapper">
        <div>
          <h4 className="datatitle"> Salas Cuna</h4>
          <DataGrid
            pageSizeOptions={[5]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            style={{
              borderRadius: "15px",
              marginLeft: "50px",
              width: "auto",
              height: "auto",
              margin: "25px",
            }}
            rows={filteredCribroom}
            columns={[
              { field: "id", headerName: "ID" },
              { field: "name", headerName: "Nombre" },
              { field: "user", headerName: "Usuario" },
            ]}
          ></DataGrid>
        </div>
        <div>
          <h4 className="datatitle"> Actividad Reciente</h4>
          <DataGrid
            pageSizeOptions={[5]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            style={{
              borderRadius: "15px",
              marginLeft: "50px",
              width: "auto",
              height: "auto",
              margin: "25px",
            }}
            rows={userhistory}
            columns={[
              { field: "id", headerName: "ID" },
              { field: "object_repr", headerName: "Usuario" },
              { field: "action_flag", headerName: "Accion" },
              { field: "action_time", headerName: "Fecha" },
              { field: "change_message", headerName: "Cambio" },
            ]}
          ></DataGrid>
        </div>
      </div>
    </body>
  );
}
