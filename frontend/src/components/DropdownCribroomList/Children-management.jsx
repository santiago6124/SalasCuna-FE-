import React, { useState } from "react";

import "../DropdownCribroomList/DropdownCribroomList.css";

import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { getAllCribroomsWithoutDepth } from "../../api/salasCuna.api";
import { GridActionsCellItem } from "@mui/x-data-grid";

import {
  DataGrid,
  GridToolbar,
  GridToolbarExport,
  GridToolbarContainer,
} from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import AsyncSelect from "react-select/async";

import { ExportButton } from "./ExcelExport/ExportButton";

function CustomToolbar(props) {
  const { selectedCribroomId } = props;

  return (
    <GridToolbarContainer {...props}>
      <ExportButton selectedCribroomId={selectedCribroomId} />
    </GridToolbarContainer>
  );
}

export default function ChildrenManagement() {
  const [cribrooms, setCribrooms] = useState([]);
  const [childs, setChild] = useState([]);
  const [selectedCribroom, setSelectedCribroom] = useState("");
  const [cribroomCapacity, setCribroomCapacity] = useState("");
  const [showNewButton, setShowNewButton] = useState(false);

  const [selectedCribroomId, setSelectedCribroomId] = useState(null); // State variable to hold the selected cribroom ID

  const navigate = useNavigate();

  const handleEditClick = (childId) => {
    navigate("/children-management/edit", { state: { childId } });
    console.log("id chico" + childId);
  };
  function handleNewClick() {
    if (!cribroomCapacity) {
      navigate("/children-management/new");
    } else {
      window.alert("La cribroom tiene la capacidad máxima");
    }
  }

  async function CRCapacity(selectedSalaCuna) {
    try {
      let response = await axios.get(
        `/api/cribroom/?no_depth&id=${selectedSalaCuna}`
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

  async function handleCargarClick() {
    if (selectedCribroom) {
      try {
        console.log("ID de la Cribroom seleccionada:", selectedCribroom);
        const res = await axios.get(
          "/api/child/?no_depth&cribroom_id=" + selectedCribroom
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
        setSelectedCribroomId(selectedCribroom); // Update the selected cribroom ID
      } catch (error) {
        console.log("Error fetching Chicos:", error);
      }
    } else {
      console.log("Ninguna Cribroom seleccionada");
    }
  }

  async function handleLoadCribroomOptions(inputValue) {
    try {
      const response = await getAllCribroomsWithoutDepth();
      setCribrooms(response.data);
      console.log("All Cribrooms:", response.data); // Verifica las opciones de sala cuna
      if (!inputValue) {
        console.log("No inputValue. Returning all cribrooms.");
        return response.data.map((cribroom) => ({
          value: cribroom.id,
          label: cribroom.name,
        }));
      }
      const filteredOptions = response.data.filter((cribroom) =>
        cribroom.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      console.log("Filtered Options:", filteredOptions); // Verifica las opciones filtradas
      return filteredOptions.map((cribroom) => ({
        value: cribroom.id,
        label: cribroom.name,
      }));
    } catch (error) {
      console.log("Error fetching Cribrooms:", error);
      return [];
    }
  }

  async function handleDelete(childId) {
    try {
      console.log(childId + " id");
      const response = await axios.patch(
        `/api/child/${childId}/?disenroll=True`
      );
      console.log("Response after updating child state:", response.data);
      CRCapacity(selectedCribroom);
    } catch (err) {
      alert("Error updating child state");
    }
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
          onClick={() => handleDelete(params.row.id)}
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
                <Form.Label className="mb-1">Salas Cunas</Form.Label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={handleLoadCribroomOptions}
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      setSelectedCribroom(selectedOption.value);
                    }
                  }}
                  defaultOptions
                />
              </div>

              <div className="button-container">
                <Button
                  as="input"
                  type="button"
                  value="Cargar"
                  size="m"
                  onClick={handleCargarClick}
                />
              </div>
            </div>
          </Col>
          <Col>
            {showNewButton && ( // Mostrar el botón solo si showNewButton es true
              <div className="contenedor-boton-new">
                <Button
                  as="input"
                  type="submit"
                  value="New"
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
  );
}
