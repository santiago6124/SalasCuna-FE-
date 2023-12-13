/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from "react";

import "./ChildrenManagement.css";

import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { cribroom_request, child_request } from "../../api/salasCuna.api";
import { GridActionsCellItem } from "@mui/x-data-grid";

import DeleteChildren from "./DeleteChildren/DeleteChildren";
import HistoryTimeline from "../CribroomDashboard/ObjectHistory";
import { PhoneModal } from "../PhoneModal/PhoneModal";
import { ChildForm } from "../ChildForm/ChildForm";

import { DataGrid, esES } from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import PhoneIcon from "@mui/icons-material/Phone";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BallotIcon from "@mui/icons-material/Ballot";

import AuthContext from "../../context/AuthContext";
import {
  toastLoading,
  toastUpdateError,
  toastUpdateSuccess,
  warningData,
} from "../../utils/toastMsgs";
import { ToastContainer } from "react-toastify";

export default function ChildrenManagement(props) {
  const [cribroomOptions, setCribroom] = useState([]);
  const [selectedCribroom, setSelectedCribroom] = useState("");
  const [childs, setChild] = useState([]);
  const [cribroomCapacity, setCribroomCapacity] = useState("");
  const [showNewButton, setShowNewButton] = useState(false);
  const [modalCreateShow, setModalCreateShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalPhoneShow, setModalPhoneShow] = useState(false);
  const [modalGuardianShow, setModalGuardianShow] = useState(false);

  const [selectedChild, setSelectedChild] = useState("");
  const [childName, setChildName] = useState("");
  const [modalHistoryShow, setModalHistoryShow] = useState(false);

  const [selectedChildData, setSelectedChildData] = useState(null);

  const navigate = useNavigate();

  let { authTokens } = useContext(AuthContext);
  const customId = useRef(null);

  let headers = {
    "Content-Type": "application/json",
    Authorization: "JWT " + authTokens.access,
    Accept: "application/json",
  };

  useEffect(() => {
    LoadCribrooms();
  }, []);

  async function LoadCribrooms() {
    try {
      toastLoading("Cargando Salas Cunas", customId);
      let response = await cribroom_request(authTokens.access);
      let data = await response.data;
      setCribroom(data);
      toastUpdateSuccess("Salas cargadas", customId);
    } catch (error) {
      console.error("Error fetching Cribroom Options", error);
      toastUpdateError("Error al cargar las salas!", customId);
    }
  }

  function handleCreateClick() {
    setModalCreateShow(true);
  }

  async function CRCapacity(selectedSalaCuna) {
    try {
      let response = await cribroom_request(
        authTokens.access,
        "get",
        1,
        {},
        selectedSalaCuna
      );
      if (response.request.status === 200) {
        setCribroomCapacity(response.data.reachMax);
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
      const res = await child_request(
        authTokens.access,
        "get",
        1,
        {},
        undefined,
        `&cribroom_id=${selectedCribroom}`
      );
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
    const selectedChildData = getChildDataById(rowId); // Replace this with your function to get child data
    setSelectedChildData(selectedChildData);
    console.log("Edit clicked for row with id:", rowId);
  }
  async function handlePhoneClick(rowId) {
    setSelectedChild(rowId);
    setModalPhoneShow(true);
    const selectedChildData = getChildDataById(rowId); // Replace this with your function to get child data
    setSelectedChildData(selectedChildData);
    console.log("Edit clicked for row with id:", rowId);
  }
  async function handleGuardianClick(rowId) {
    setSelectedChild(rowId);
    setModalGuardianShow(true);
    const selectedChildData = getChildDataById(rowId); // Replace this with your function to get child data
    setSelectedChildData(selectedChildData);
    console.log("Edit clicked for row with id:", rowId);
  }

  function handleHistoryClick(rowId, ChildName) {
    setSelectedChild(rowId);
    setChildName(ChildName);
    setModalHistoryShow(true);
    console.log("History clicked for row with id:", rowId);
  }

  function getChildDataById(childId) {
    // Replace this with your logic to get child data by ID from the 'childs' array
    return childs.find((child) => child.id === childId);
  }

  const columns = [
    {
      field: "first_name",
      headerName: "Nombre",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "last_name",
      headerName: "Apellido",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "identification",
      headerName: "DNI",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "birthdate",
      headerName: "Fecha Nacimiento",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "street",
      headerName: "Calle",
      width: 170,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "house_number",
      headerName: "Numero de Casa",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "registration_date",
      headerName: "Fecha Registro",
      width: 190,
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
      width: 110,
      headerAlign: "center",
      align: "center",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Activado/Desactivado"
          onClick={() => handleDeleteClick(params.row.id, params.row.name)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar Informacion"
          onClick={() => handleEditClick(params.row.id)}
          showInMenu
        />,
        <GridActionsCellItem
          variant="primary"
          icon={<HistoryIcon />}
          onClick={() => handleHistoryClick(params.row.id, params.row.name)}
          label="Historial"
          showInMenu
        />,
        <GridActionsCellItem
          variant="primary"
          icon={<PhoneIcon />}
          onClick={() => handlePhoneClick(params.row.id)}
          label="Telefono/s"
          showInMenu
        />,

        <GridActionsCellItem
          variant="primary"
          icon={<PeopleAltIcon />}
          onClick={() => handleGuardianClick(params.row.id)}
          label="Pariente/s"
          showInMenu
        />,
        <GridActionsCellItem
          variant="primary"
          icon={<BallotIcon />}
          label="Encuesta"
          showInMenu
        />,
      ],
    },
  ];

  function reloadDataFunc() {
    loadChildren();
  }

  return (
    <body>
      <ToastContainer />
      {selectedChild && (
        <>
          <ChildForm
            data={selectedChildData}
            show={modalEditShow}
            tokens={authTokens.access}
            onHide={() => {
              setModalEditShow(false);
              setSelectedChild(""); // Reset selectedChild after closing modal
              setSelectedChildData(null); // Reset selectedChildData after closing modal
              reloadDataFunc();
            }}
          />
        </>
      )}
      {selectedChild && (
        <>
          <PhoneModal
            show={modalPhoneShow}
            tokens={authTokens.access}
            onHide={() => {
              setModalPhoneShow(false);
              setSelectedChild(""); // Reset selectedChild after closing modal
              reloadDataFunc();
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
            setSelectedChild("");
            reloadDataFunc();
          }}
        />
      )}
      {selectedChild && (
        <ChildForm
          show={modalGuardianShow}
          isGuardian={true} // or pass the actual value based on your logic
          data={selectedChildData}
          id={selectedChild}
          name={childName}
          tokens={authTokens.access}
          onHide={() => {
            setModalGuardianShow(false);
            setSelectedChild("");
            reloadDataFunc();
          }}
        />
      )}
      {modalCreateShow && (
        <ChildForm
          show={modalCreateShow}
          onHide={() => {
            setModalCreateShow(false);
            reloadDataFunc();
          }}
        />
      )}
      {selectedChild && (
        <HistoryTimeline
          id={selectedChild}
          tokens={authTokens.access}
          type="child"
          show={modalHistoryShow}
          onHide={() => {
            setModalHistoryShow(false);
            setSelectedChild(""); // Reset selectedCribroom after closing modal
            reloadDataFunc();
          }}
        />
      )}
      {!selectedChild && (
        <div className="body-cm">
          <h1 className="titulo-cm">Gestion De Chicos/as</h1>
          <div className="contenedor-linea-cm">
            <hr className="linea-cm"></hr>
          </div>
          <div className="div-cm">
            <Row className="mb-3">
              <Col>
                <div>
                  <div className="dropdown-container">
                    <Form.Label className="mb-1 mt-3">
                      Seleccionar Sala Cuna
                    </Form.Label>
                    <Form.Select
                      as="select"
                      value={selectedCribroom}
                      className="mb-1 select-dropdown-down"
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
                  <div className="button-container">
                    <Button
                      as="input"
                      type="submit"
                      value="Agregar chico/a"
                      size="m"
                      onClick={handleCreateClick}
                    />
                  </div>
                )}
              </Col>
            </Row>

            <div className="DataGrid-Wrapper-cm">
              <DataGrid
                style={{ borderRadius: "15px", width: "100%" }}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={childs}
                columns={columns}
                autoHeight
                pageSize={10}
                pageSizeOptions={[10]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </body>
  );
}
