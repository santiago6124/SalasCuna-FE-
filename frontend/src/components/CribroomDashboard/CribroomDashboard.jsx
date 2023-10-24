import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import { UpdateRoom } from "../EditRoom/EditRoom";
import DeleteRoom from "../DeleteRoom/DeleteRoom";
import {CreateRoom} from "../CreateRoom/CreateRoom";
import "./CribroomDashboard.css";

import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

import { getAllZones, handlePermissions } from "../../api/salasCuna.api";

//DataGrid Import
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

//UI Icons Imports
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { Row, Col } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

export default function CribroomDashboard() {
  const [cribrooms, setCribrooms] = useState([]);
  const [filteredCribroom, setFilteredCribroom] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCribroom, setSelectedCribroom] = useState("");
  const [cribroomName, setCribroomName] = useState("");

  // Modal variables
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalCreateShow, setModalCreateShow] = useState(false);

  const customId = "custom-id-yes";

  let { authTokens } = useContext(AuthContext);

  useEffect(() => {
    toastPromise();
  }, []);

  function toastPromise() {
    toast.promise(
      listCribroom,
      {
        pending: "Cargando Salas Cunas",
        success: "Cargadas con éxito",
        error: "Error al cargar!",
      },
      {
        toastId: customId,
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        transition: Zoom,
      }
    );
  }

  async function listCribroom() {
    try {
      const promesas = await Promise.all([
        getAllZones(authTokens.access),
        axios.get("/api/cribroomDir/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + authTokens.access,
          },
        }),
      ]);
      const zonesData = promesas[0].data;
      const cribroomData = promesas[1].data;
      const updatedCribrooms = await cribroomData.map((cribroom) => {
        const matchingZone = zonesData.find(
          (zone) => zone.id === cribroom.zone.id
        );
        if (matchingZone) {
          return {
            ...cribroom,
            zone: matchingZone.name,
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
  }

  function handleEditClick(rowId) {
    setSelectedCribroom(rowId);
    setModalEditShow(true);
    console.log("Edit clicked for row with id:", rowId);
  }

  function handleCreateClick() {
    setModalCreateShow(true);
  }

  function handleDeleteClick(rowId, CRName) {
    setSelectedCribroom(rowId);
    setCribroomName(CRName);
    setModalDeleteShow(true);
    console.log("Edit clicked for row with id:", rowId);
  }

  // SEARCH FUNCTION
  function updateKeyword(keyword) {
    const filtered = cribrooms.filter((cribroom) => {
      return `${cribroom.name.toLowerCase()}`.includes(keyword.toLowerCase());
    });
    setKeyword(keyword);
    setFilteredCribroom(filtered);
    console.log(filteredCribroom);
  }

  function reloadDataFunc() {
    listCribroom();
  }

  const columns = [
    {
      field: "code",
      headerName: "Codigo",
      width: 100,
    },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "street", headerName: "Direccion", width: 140 },
    {field: "CUIT", headerName:"CUIT", width:140},
    {
      field: "house_number",
      headerName: "Numero Calle",
      width: 140,
    },
    {
      field: "max_capacity",
      headerName: "Cap. Maxima",
      width: 140,
    },
    {
      field: "zone",
      headerName: "Zona",
      width: 140,
    },
    { field: "is_active", headerName: "Estado", width: 140 },
    { field: "entity", headerName: "Entidad", width: 140 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(params.row.id, params.row.name)}
        />,
        <>
          <GridActionsCellItem
            variant="primary"
            icon={<EditIcon />}
            onClick={() => handleEditClick(params.row.id)}
          />
        </>,
      ],
    },
  ];

  return (
    <>
      <div>
        <ToastContainer />
        <header className="header-cd">
          <Menu />
        </header>
      </div>
      <body>
        <div>
          {selectedCribroom && (
            <>
              <UpdateRoom
                id={selectedCribroom}
                show={modalEditShow}
                tokens={authTokens.access}
                onHide={() => {
                  setModalEditShow(false);
                  setSelectedCribroom(""); // Reset selectedCribroom after closing modal
                  reloadDataFunc();
                }}
              />
            </>
          )}
          {selectedCribroom && (
            <DeleteRoom
              id={selectedCribroom}
              name={cribroomName}
              show={modalDeleteShow}
              tokens={authTokens.access}
              onHide={() => {
                setModalDeleteShow(false);
                setSelectedCribroom(""); // Reset selectedCribroom after closing modal
                reloadDataFunc();
              }}
            />
          )}
          {modalCreateShow && (
            <CreateRoom
              show={modalCreateShow}
              onHide={() => {
                setModalCreateShow(false);
                reloadDataFunc();
              }}
            />
          )}
          {!selectedCribroom && (
            <>
              <>
                <h1 className="titulo-cb">Gestion De Salas Cuna</h1>
                <div className="contenedor-linea-cb">
                  <hr className="linea-cb"></hr>
                </div>
                <Row>
                  <Col className="search-input">
                    <SearchBar
                      keyword={keyword}
                      onChange={updateKeyword}
                      placeholder={"Buscar Sala Cuna"}
                    />
                  </Col>
                  <Col className="add-payout-button">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={() => handleCreateClick()}
                    >
                      Agregar Sala Cuna
                    </Button>
                  </Col>
                </Row>
                <div className="DataGrid-Wrapper">
                  <DataGrid
                    style={{ borderRadius: "15px", margin: "20px" }}
                    rows={filteredCribroom}
                    columns={columns}
                    autoHeight
                    autoWidth
                    pageSize={5}
                  />
                </div>
              </>
            </>
          )}
        </div>
      </body>
    </>
  );
}
