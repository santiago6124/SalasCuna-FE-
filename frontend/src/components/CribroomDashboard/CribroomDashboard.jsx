import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
// import { CribroomForm } from "../CribroomDashboard/EditRoom/EditRoom";
import DeleteRoom from "../CribroomDashboard/DeleteRoom/DeleteRoom";

import HistoryTimeline from "./ObjectHistory";

import "./CribroomDashboard.css";

import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";

import {
  handlePermissions,
  zone_request,
  cribroom_request,
} from "../../api/salasCuna.api";

//DataGrid Import
import {
  DataGrid,
  GridActionsCellItem,
  esES,
  GridToolbarContainer,
} from "@mui/x-data-grid"; //The esES is to translate the datagrid

//UI Icons Imports
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import HistoryIcon from "@mui/icons-material/History";

import { ToastContainer } from "react-toastify";
import { Row, Col } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { ExportButton } from "./ExcelExport/ExportButton";
import {
  toastLoading,
  toastUpdateError,
  toastUpdateSuccess,
} from "../../utils/toastMsgs";

import { CribroomForm } from "../CribroomForm/CribroomForm";

function CustomToolbar(props) {
  const { selectedCribroomId, authTokens } = props;

  return (
    <GridToolbarContainer {...props}>
      <ExportButton
        selectedCribroomId={selectedCribroomId}
        authTokens={authTokens}
      />
    </GridToolbarContainer>
  );
}

export default function CribroomDashboard() {
  const [cribrooms, setCribrooms] = useState([]);
  const [filteredCribroom, setFilteredCribroom] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCribroom, setSelectedCribroom] = useState("");
  const [cribroomName, setCribroomName] = useState("");
  const [selectedCribroomData, setSelectedCribroomData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  // Modal variables
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalCreateShow, setModalCreateShow] = useState(false);
  const [modalHistoryShow, setModalHistoryShow] = useState(false);

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
  }, []);

  async function listCribroom() {
    try {
      // Step 1: Fetch zones
      const zonesResponse = await zone_request(authTokens.access);
      const zonesData = zonesResponse.data;

      // Step 2: Fetch cribrooms for each zone
      const cribroomsPromises = zonesData.map(async (zone) => {
        const cribroomResponse = await cribroom_request(
          authTokens.access,
          "get",
          0,
          {},
          0,
          `&locality__department__zone__id=${zone.id}`
        );
        return cribroomResponse.data;
      });

      // Step 3: Wait for all cribroom requests to complete
      const cribroomsData = await Promise.all(cribroomsPromises);

      // Step 4: Combine zone information with cribroom data
      const updatedCribrooms = cribroomsData.flatMap((cribroomData, index) => {
        const matchingZone = zonesData[index];

        return cribroomData.map((cribroom) => ({
          ...cribroom,
          zone: matchingZone.name,
          is_active: cribroom.is_active ? "Activo" : "Inactivo",
        }));
      });

      // // Step 3: Wait for all cribroom requests to complete
      // const cribroomsData = await Promise.all(cribroomsPromises);

      // // Step 4: Combine zone information with cribroom data
      // const updatedCribrooms = cribroomsData.flatMap((cribroomData, index) => {
      //   const matchingZone = zonesData[index];

      //   return cribroomData.map((cribroom) => ({
      //     ...cribroom,
      //     zone: matchingZone.name,
      //     is_active: cribroom.is_active ? "Activo" : "Inactivo",
      //   }));
      // });

      // Step 5: Update component state
      setCribrooms(updatedCribrooms);
      setFilteredCribroom(updatedCribrooms);

      toastUpdateSuccess("Salas cargadas", customId);
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

  async function handleEditClick(rowId) {
    setSelectedCribroom(rowId);
    setModalEditShow(true);
    const selectedCribroomData = getCribroomDataById(rowId); // Replace this with your function to get Cribroom data
    setSelectedCribroomData(selectedCribroomData);
    console.log("Edit clicked for row with id:", rowId);
    console.log("Edit clicked for row with id:", rowId);
  }
  function getCribroomDataById(CribroomId) {
    // Replace this with your logic to get Cribroom data by ID from the 'Cribrooms' array
    return cribrooms.find((Cribroom) => Cribroom.id === CribroomId);
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

  function handleHistoryClick(rowId, CRName) {
    setSelectedCribroom(rowId);
    setCribroomName(CRName);
    setModalHistoryShow(true);
    console.log("Edit clicked for row with id:", rowId);
  }

  // SEARCH FUNCTION
  function updateKeyword(keyword) {
    const filtered = cribrooms.filter((cribroom) => {

      return (
        `${cribroom.name.toLowerCase()}`.includes(keyword.toLowerCase()) ||
        `${cribroom.code.toLowerCase()}`.includes(keyword.toLowerCase())
      ); //set other possible filters to the SearchBar

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
      width: 100,
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
          <GridActionsCellItem
            variant="primary"
            icon={<HistoryIcon />}
            onClick={() => handleHistoryClick(params.row.id, params.row.name)}
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
              <CribroomForm
                data={selectedCribroomData}
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
          {selectedCribroom && (
            <HistoryTimeline
              id={selectedCribroom}
              tokens={authTokens.access}
              type="cribroom"
              show={modalHistoryShow}
              onHide={() => {
                setModalHistoryShow(false);
                setSelectedCribroom(""); // Reset selectedCribroom after closing modal
                reloadDataFunc();
              }}
            />
          )}
          {modalCreateShow && (
            <CribroomForm
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
                  <div
                    style={{ height: "100vh", width: "100%", margin: "20px" }}
                  >
                    {cribrooms.length > 0 && (
                      <DataGrid
                        style={{ borderRadius: "15px" }}
                        localeText={
                          esES.components.MuiDataGrid.defaultProps.localeText
                        }
                        checkboxSelection
                        disableRowSelectionOnClick
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                          setSelectedRows(newRowSelectionModel);
                        }}
                        columns={columns}
                        rows={cribrooms}
                        components={{ Toolbar: CustomToolbar }}
                        componentsProps={{
                          toolbar: {
                            selectedCribroomId: selectedRows, // Pass the selected cribroom ID
                            authTokens: authTokens,
                          },
                        }}
                      />
                    )}
                  </div>
                </div>
              </>
            </>
          )}
        </div>
      </body>
    </>
  );
}
