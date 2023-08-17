import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import UpdateRoomModaled from "../EditRoom/EditRoom";
import DeleteRoom from "../DeleteRoom/DeleteRoom";
import { UpdateRoom } from "../EditRoom/EditRoom";
import "./CribroomDashboard.css";

import React, { useEffect, useState } from "react";

import {
  getAllShifts,
  getAllZones,
  getAllCribroomsWithoutDepth,
} from "../../api/salasCuna.api";

//DataGrid Import
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

//UI Icons Imports
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import EditIcon from "@mui/icons-material/Edit";

export default function CribroomDashboard() {
  const [cribrooms, setCribrooms] = useState([]);
  const [filteredCribroom, setFilteredCribroom] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [zoneOptions, setZoneOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [selectedCribroom, setSelectedCribroom] = useState("");

  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [confirmedEdit, setEditConfirmed] = useState(false);
  const [confirmedDelete, setDeleteConfirmed] = useState(false);

  useEffect(() => {
    listCribroom();
  }, []);

  const listCribroom = async () => {
    try {
      const response = await getAllCribroomsWithoutDepth();
      setCribrooms(response.data);
      setFilteredCribroom(response.data);
      console.log(response.data);
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

  const handleEditClick = (rowId) => {
    setSelectedCribroom(rowId);
    setModalEditShow(true);
    console.log("Edit clicked for row with id:", rowId);
  };

  const handleDeleteClick = (rowId) => {
    setSelectedCribroom(rowId);
    setModalDeleteShow(true);
    console.log("Edit clicked for row with id:", rowId);
  };
  // SEARCH FUNCTION

  const updateKeyword = (keyword) => {
    const filtered = cribrooms.filter((cribroom) => {
      return `${cribroom.name.toLowerCase()}`.includes(keyword.toLowerCase());
    });
    setKeyword(keyword);
    setFilteredCribroom(filtered);
    console.log(filteredCribroom);
  };
  const handleCribroomChange = async (event) => {
    setSelectedCribroom(event.target.value);
  };

  const handleConfirmClick = async (event) => {
    setEditConfirmed(true);
  };

  const hanldeEditConfirmClick = async (event) => {
    setDeleteConfirmed(true);
  };

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
                }}
              />

              {selectedCribroom && (
              <DeleteRoom
                id={selectedCribroom}
                show={modalDeleteShow}
                onHide={() => {
                  setModalDeleteShow(false);
                  setSelectedCribroom(""); // Reset selectedCribroom after closing modal
                }}
              />
            )}
          </>
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
                        field: "locality",
                        headerName: "Localidad",
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
                            onClick={() => handleDeleteClick(params.row.id)}
                          />,
                          <>
                            <GridActionsCellItem
                              variant="primary"
                              icon={<EditIcon />}
                              onClick={() => handleEditClick(params.row.id)}
                            />

                            <UpdateRoom
                              id={selectedCribroom}
                              show={modalEditShow}
                              onHide={() => setModalEditShow(false)}
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
