/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from "react";

import "./ChildrenManagement.css";


import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { getAllCribroomsWithoutDepth } from "../../api/salasCuna.api";
import { GridActionsCellItem } from "@mui/x-data-grid";

import DeleteChildren from "../DeleteChildren/DeleteChildren";
import EditChildren from "../FormEditChildren/FormEditChildren";

import {
  DataGrid,
} from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import AuthContext from "../../context/AuthContext";
import { toastLoading, toastUpdateError, toastUpdateSuccess, warningData } from "../../utils/toastMsgs";
import { ToastContainer } from "react-toastify";

export default function ChildrenManagement() {
  const [cribroomOptions, setCribroom] = useState([]);
  const [selectedCribroom, setSelectedCribroom] = useState("");
  const [childs, setChild] = useState([]);
  const [cribroomCapacity, setCribroomCapacity] = useState("");
  const [showNewButton, setShowNewButton] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const [childName, setChildName] = useState("");

  const navigate = useNavigate();

  let { authTokens } = useContext(AuthContext);
  const customId = useRef(null);

  let headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + authTokens.access,
    "Accept": "application/json"
  }

  useEffect(() => {
    LoadCribrooms();
  }, []);

  async function LoadCribrooms() {
    try {
      toastLoading("Cargando Salas Cunas", customId)
      let response = await getAllCribroomsWithoutDepth(authTokens.access);
      let data = await response.data;
      setCribroom(data);
      toastUpdateSuccess("Salas cargadas", customId)
    } catch (error) {
      console.error("Error fetching Cribroom Options", error);
      toastUpdateError("Error al cargar las salas!", customId)
    }
  }

  function handleNewClick() {
    if (!cribroomCapacity) {
      navigate("/children-management/new");
    } else {
      warningData("La cribroom tiene la capacidad máxima");
    }
  }

  async function CRCapacity(selectedSalaCuna) {
    try {
      let response = await axios.get(
        `/api/cribroom/?no_depth&id=${selectedSalaCuna}`, { headers: headers }
      );
      console.log(response);
      if (response.request.status === 200) {
        setCribroomCapacity(response.data[0].reachMax);
      } else {
        console.error("Error al obtener la capacidad de la sala cuna");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  }


  async function handleCribroomChange(event) {
      setSelectedCribroom(event.target.value);
  }

  useEffect(() => {
    if (selectedCribroom) {
      loadChildren(selectedCribroom);
    }
  }, [selectedCribroom]);

  async function loadChildren() {
    try {
      toastLoading("Cargando Chicos", customId);
      console.log("ID de la Cribroom seleccionada:", selectedCribroom);
      const res = await axios.get(
        "/api/child/?no_depth&cribroom_id=" + selectedCribroom, { headers: headers }
      );
      console.log("API Response:", res.data);
      const updateChild = await res.data.map((child) => {
        return {
          ...child,
          is_active: child.is_active ? "Activo" : "Inactivo",
        };
      });
      setChild(updateChild);
      setShowNewButton(true);
      CRCapacity(selectedCribroom);
      toastUpdateSuccess("Chicos cargados", customId);
    } catch (error) {
      console.log("Error fetching Chicos:", error);
      toastUpdateError("Error al cargar los chicos!", customId);
    }
  }

  function handleDeleteClick(rowId, ChildName) {
    setSelectedChild(rowId);
    setChildName(ChildName);
    setModalDeleteShow(true);
    console.log("Edit clicked for row with id:", rowId);
  }

  async function handleEditClick(rowId) {
    setSelectedChild(rowId);
    setModalEditShow(true);
    console.log("Edit clicked for row with id:", rowId);
  }
  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "first_name",
      headerName: "Nombre",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "last_name",
      headerName: "Apellido",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dni",
      headerName: "DNI",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "is_active",
      headerName: "Estado",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 90,
      headerAlign: "center",
      align: "center",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(params.row.id, params.row.name)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditClick(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <body>
      <ToastContainer />
      {selectedChild && (
        <>
          <EditChildren
            id={selectedChild}
            show={modalEditShow}
            tokens={authTokens.access}
            onHide={() => {
              setModalEditShow(false);
              setSelectedChild(""); // Reset selectedCribroom after closing modal
            }}
          />
        </>
      )}
      {selectedChild && (
        <DeleteChildren
          id={selectedChild}
          name={childName}
          show={modalDeleteShow}
          tokens={authTokens.access}
          onHide={() => {
            setModalDeleteShow(false);
            setSelectedChild(""); // Reset selectedCribroom after closing modal
            /*window.location.reload();*/
          }}
        />
      )}
      {!selectedChild && (
        <div className="body-cm">
          <h1 className="titulo-cm">Gestion De Chicos/as</h1>
          <div className="contenedor-linea-cm">
            <hr className="linea-cm"></hr>
          </div>
          <div>
            <Row className="mb-3">
              <Col>
                <div className="container">
                  <div className="dropdown-container">
                    <Form.Label className="mb-1 mt-3">
                      Seleccionar Sala Cuna
                    </Form.Label>
                    <Form.Select
                      as="select"
                      value={selectedCribroom}
                      className="mb-1"
                      onChange={handleCribroomChange}
                    >
                      <option value="" disabled>
                        Seleccionar Sala Cuna
                      </option>
                      {cribroomOptions.map((cribroom) => (
                        <option key={cribroom.id} value={cribroom.id}>
                          {cribroom.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </Col>
              <Col>
                {showNewButton && ( // Mostrar el botón solo si showNewButton es true
                  <div className="contenedor-boton-new">
                    <Button
                      as="input"
                      type="submit"
                      value="Agregar chico/a"
                      size="m"
                      onClick={handleNewClick}
                    />
                  </div>
                )}
              </Col>
            </Row>

            <div className="DataGrid-Wrapper">
              <DataGrid
                style={{ borderRadius: "15px", margin: "20px", width: "" }}
                rows={childs}
                columns={columns}
                autoHeight
                pageSize={5}
              />
            </div>
          </div>
        </div>
      )}

    </body>
  );
}
