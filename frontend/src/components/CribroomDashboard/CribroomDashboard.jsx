import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import {UpdateRoom} from "../EditRoom/EditRoom";
import DeleteRoom from "../DeleteRoom/DeleteRoom";
import "./CribroomDashboard.css";

import React, { useEffect, useState } from "react";

import {
  getAllCribroomsWithoutDepth,
  getAllZones,
  handlePermissions,
} from "../../api/salasCuna.api";

//DataGrid Import
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

//UI Icons Imports
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function CribroomDashboard() {
  const [cribrooms, setCribrooms] = useState([]);
  const [filteredCribroom, setFilteredCribroom] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCribroom, setSelectedCribroom] = useState("");
  const [cribroomName, setCribroomName] = useState("");

// Modal variables
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);


  useEffect(() => {
    listCribroom();
  }, []);

  async function listCribroom() {
    try {
      const zonesData = (await getAllZones()).data;
      const cribroomData = (await getAllCribroomsWithoutDepth()).data;
      const updatedCribrooms = await cribroomData.map(cribroom => {
        const matchingZone = zonesData.find(zone => zone.id === cribroom.zone);
        console.log(matchingZone)
        if (matchingZone) {
          return {
            ...cribroom,
            zone: matchingZone.name,
            is_active: cribroom.is_active ? "Activo" : "Inactivo"
            };
        }
        else {
          return {
            ...cribroom,
            is_active: cribroom.is_active ? "Activo" : "Inactivo"
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

  function handleEditClick(rowId) {
    setSelectedCribroom(rowId);
    setModalEditShow(true);
    console.log("Edit clicked for row with id:", rowId);
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

  return (
    <>
      <body>
        <div className="cribroom-dashboard">
          <header className="header">
            <Menu />
          </header>
          {selectedCribroom && (
            <>
              <UpdateRoom
                id={selectedCribroom}
                show={modalEditShow}
                onHide={() => {
                  setModalEditShow(false);
                  setSelectedCribroom(""); // Reset selectedCribroom after closing modal
                  window.location.reload();
                }}
              />
          </>
        )}
        {selectedCribroom && (
              <DeleteRoom
                id={selectedCribroom}
                name={cribroomName}
                show={modalDeleteShow}
                onHide={() => {
                  setModalDeleteShow(false);
                  setSelectedCribroom(""); // Reset selectedCribroom after closing modal
                  /*window.location.reload();*/
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
                <div>
                  <SearchBar
                    keyword={keyword}
                    onChange={updateKeyword}
                    placeholder={"Buscar Sala Cuna"}
                  />
                </div>
                <div className="DataGrid-Wrapper">
                  <DataGrid
                    style={{ borderRadius: "15px", margin: "20px" }}
                    rows={filteredCribroom}
                    columns={[
                      {
                        field: "id",
                        headerName: "Codigo Sala Cuna",
                        width: 150,
                      },
                      { field: "name", headerName: "Nombre", width: 200 },
                      { field: "street", headerName: "Direccion", width: 150 },
                      {
                        field: "house_number",
                        headerName: "Numero",
                        width: 150,
                      },
                      {
                        field: "max_capacity",
                        headerName: "Cap. Maxima",
                        width: 150,
                      },
                      {
                        field: "zone",
                        headerName: "Zona",
                        width: 150,
                      },
                      { field: "is_active", headerName: "Estado", width: 150 },
                      { field: "entity", headerName: "Entidad", width: 150 },
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
                    ]}
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

