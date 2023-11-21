import Menu from "../Menu/Menu";
import "./UserDashboard.css";

import Slider from "react-styled-carousel";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import React, { useContext, useEffect, useState } from "react";

import {
  getAllCribrooms,
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
      const response = await axios.get(
        `/api/cribroom/?user=${user.user.user_id}`
      );
      const localityData = responseLocality.data;
      const cribroomData = response.data;
      const first_name = user.user.first_name;
      const last_name = user.user.Last_name;
      const updatedCribrooms = await cribroomData.map((cribroom) => {
        const matchingLocality = localityData.find(
          (locality) => locality.id === cribroom.locality
        );
        if (matchingLocality) {
          return {
            ...cribroom,
            locality: matchingLocality.locality,
            is_active: cribroom.is_active ? "Activo" : "Inactivo",
            user: first_name + "  " + last_name,
          };
        } else {
          return {
            ...cribroom,
            is_active: cribroom.is_active ? "Activo" : "Inactivo",
            user: first_name + "  " + last_name,
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
    { breakPoint: 1280, cardsToShow: 3 },
    { breakPoint: 760, cardsToShow: 2 },
  ];
  return (
    <body>
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
          <Link to={"/children-management"}>
            <Button
              className="button-slider"
              boton
              variant="primary"
              type="submit"
            >
              Gestion Chicos
            </Button>
          </Link>
          <Button
            className="button-slider "
            boton
            variant="primary"
            type="submit"
          >
            Proximamente...
          </Button>
          <Button
            className="button-slider"
            boton
            variant="primary"
            type="submit"
          >
            Proximamente...
          </Button>
          <Button
            className="button-slider"
            boton
            variant="primary"
            type="submit"
          >
            Proximamente...
          </Button>
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
              { field: "name", headerName: "Nombre", width: 150 },
              { field: "street", headerName: "Direccion", width: 150 },
              {
                field: "house_number",
                headerName: "Numero de Calle",
                width: 150,
              },
              {
                field: "max_capacity",
                headerName: "Cap. Maxima",
                width: 150,
              },
              /*               {
              { field: "actualCapacity", headerName:"Cap. Acual" },
                field: "actions",
                type: "actions",
                headerName: "Acciones",
                width: 80,
                getActions: () => [
                  <GridActionsCellItem icon={<AddIcon />} label="More Info" />,
                ],
              }, */
            ]}
          ></DataGrid>
        </div>
      </div>
    </body>
  );
}
