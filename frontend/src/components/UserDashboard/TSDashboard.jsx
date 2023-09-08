import Menu from "../Menu/Menu";
import "./UserDashboard.css";

import Slider from "react-styled-carousel";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

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

export default function TSDashboard() {
  const [cribrooms, setCribrooms] = useState([]);
  const [filteredCribroom, setFilteredCribroom] = useState([]);
  const [keyword, setKeyword] = useState("");
  const user = useContext(AuthContext);

  useEffect(() => {
    listCribroom(user);
  }, []);

  const listCribroom = async (user) => {
    try {
      const responseLocality = await getAllLocalities();
      const response = await axios.get(`/api/cribroom/?user=${user.user.user_id }`);
      const responseUser = await axios.get(`/api/user/${user.user.user_id}/`);
      const localityData = responseLocality.data;
      const cribroomData = response.data;
      const userData = responseUser.data;
      const updatedCribrooms = await cribroomData.map((cribroom) => {
        const matchingLocality = localityData.find(
          (locality) => locality.id === cribroom.locality
        );
        if (matchingLocality) {
          return {
            ...cribroom,
            locality: matchingLocality.locality,
            is_active: cribroom.is_active ? "Activo" : "Inactivo",
            user: userData.first_name + "  " + userData.last_name,
          };
        } else {
          return {
            ...cribroom,
            is_active: cribroom.is_active ? "Activo" : "Inactivo",
            user: userData.first_name + "  " + userData.last_name,
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

  const responsive = [
    { breakPoint: 1280, cardsToShow: 5 },
    { breakPoint: 760, cardsToShow: 3 },
  ];
  return (
    <body>
      <header className="header-home">
        <Menu />
      </header>
      <h1 className="titulo-home">Pagina Trabajador/a Social</h1>
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
              { field: "name", headerName: "Nombre", width: 250 },
              { field: "user", headerName: "Usuario", width: 130 },
            ]}
          ></DataGrid>
        </div>
      </div>
    </body>
  );
}
