import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import { UpdateRoom } from "../CribroomDashboard/EditRoom/EditRoom";
import DeleteRoom from "../CribroomDashboard/DeleteRoom/DeleteRoom";
import { CreateRoom } from "../CribroomDashboard/CreateRoom/CreateRoom";
import "./CribroomDashboard.css";

import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";

import { getAllZones, handlePermissions } from "../../api/salasCuna.api";

//DataGrid Import
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

//UI Icons Imports
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Row, Col } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {
  toastLoading,
  toastUpdateError,
  toastUpdateSuccess,
} from "../../utils/toastMsgs";

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

  const customId = useRef(null);

  let { authTokens } = useContext(AuthContext);

  async function firstLoad() {
    try {
      toastLoading("Cargando Salas Cunas", customId);
      await listCribroom();
      toastUpdateSuccess("Salas cargadas", customId);
    } catch {
      toastUpdateError("Error al cargar las Salas Cunas!", customId);
    }
  }
  useEffect(() => {
    firstLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const [zonesData, cribroomData] = [promesas[0].data, promesas[1].data];
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
      toastUpdateError("Error al cargar las Salas Cunas!", customId);
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
      headerName: "Código",
      width: 100,
    },
    { field: "name", headerName: "Nombre", width: 180 },
    { field: "street", headerName: "Dirección", width: 170 },
    { field: "CUIT", headerName: "CUIT", width: 90 },
    {
      field: "house_number",
      headerName: "Número Calle",
      width: 140,
    },
    {
      field: "max_capacity",
      headerName: "Cap. Máxima",
      width: 140,
    },
    {
      field: "zone",
      headerName: "Zona",
      width: 140,
    },
    { field: "is_active", headerName: "Estado", width: 100 },
    { field: "entity", headerName: "Entidad", width: 100 },
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
        <div style={{ marginTop: 100 }}> 
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

                <div className="conteiner-searchbar-button">

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

                </div>

                <div className="DataGrid-Wrapper">
                  <DataGrid
                    style={{ borderRadius: "15px", margin: "20px" }}
                    rows={filteredCribroom}
                    columns={columns}
                    autoHeight
                    autoWidth
                    pageSize={5}
                    checkboxSelection //with this you can select all columns from the datagrid
                    disableRowSelectionOnClick//
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
