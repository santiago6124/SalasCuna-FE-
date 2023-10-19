import "../EditRoom/EditRoom.css";

import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'

import {
  getAllShifts,
  getAllZones,
} from "../../api/salasCuna.api";
import axios from "axios";

import { updateData } from "../../utils/toastMsgs";

import { ToastContainer } from 'react-toastify';

export function UpdateRoom(props) {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [selectedCribroom, setSelectedCribroom] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [cribroom, setCribroom] = useState([]);

  const [formFields, setFormFields] = useState({
    cribroom: [
      {
        name: "nameCR",
        label: "Nombre De Sala",
        type: "text",
        required: true,
      },
      {
        name: "codeCR",
        label: "Codigo De Sala",
        type: "text",
        required: true,
      },
      {
        name: "max_capacityCR",
        label: "Capacidad Maxima",
        type: "number",
        required: true,
      },
      {
        name: "CUITCR",
        label: "CUIT",
        type: "text",
        required: true,
      },
      {
        name: "entityCR",
        label: "Entidad",
        type: "text",
        required: true,
      },
      {
        name: "streetCR",
        label: "Calle",
        type: "text",
        required: true,
      },
      {
        name: "house_numberCR",
        label: "Nro",
        type: "number",
        required: true,
      },
      {
        name: "shiftCR",
        label: "Turno",
        type: "select",
        options: shiftOptions, // You need to define shiftOptions
        required: true,
      },
      {
        name: "zoneCR",
        label: "Zona",
        type: "select",
        options: zoneOptions, // You need to define zoneOptions
        required: true,
      },
    ],
  });

  const [formData, setFormData] = useState({});  /// mas adelante get request para obtener cribroom basado en los props id

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    loadZones();
    loadShifts();
    setSelectedCribroom(props.id);
    loadSelectedCribroom(props.id); // Load selected cribroom data
  }, [props]);

  
  const renderFormFields = (fields) => {
    console.log('fields', fields);
    return fields.map((field) => (
      <Form.Group className="mb-3" key={field.name}>
        <Form.Label className="mb-1">{field.label}</Form.Label>
        {field.type === "select" ? (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className="form-control"
            required={field.required}
          >
            {field.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option[Object.keys(option)[1]]} {/* Adjust this based on your option structure */}
              </option>
            ))}
          </select>
        ) : (
          <Form.Control
            type={field.type}
            placeholder={`Ingrese ${field.label.toLowerCase()}`}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            required={field.required}
          />
        )}
      </Form.Group>
    ));
  };

  async function loadZones() {
    try {
      const response = await getAllZones(props.tokens);
      setZoneOptions(response.data);
      formFields['cribroom'][8]['options'] = response.data;
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  }

  async function loadShifts() {
    try {
      const response = await getAllShifts(props.tokens);
      setShiftOptions(response.data);
      formFields['cribroom'][7]['options'] = response.data;
    } catch (error) {
      console.error("Error fetching shift options:", error);
    }
  }

  async function loadSelectedCribroom(cribroomId) {
    try {
      const response = await axios.get(`/api/cribroom/?no_depth&id=${cribroomId}`, {headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : Cookies.get('csrftoken'),
        "Authorization": "JWT " + props.tokens
      }});
      let data = await response.data; // Extract JSON data
      setCribroom(data[0]);
    } catch (error) {
      console.error("Error fetching selected cribroom data:", error);
    }
  }

  async function handleEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      name: formData.get("nameCR"),
      code: formData.get("codeCR"),
      max_capacity: formData.get("max_capacityCR"),
      street: formData.get("streetCR") ? formData.get("streetCR") : "",
      house_number: formData.get("house_numberCR"),
      shift: formData.get("shiftCR"),
      zone: formData.get("zoneCR"),
      CUIT: formData.get("CUITCR"),
      entity: formData.get("entityCR"),
    };
    if (selectedCribroom) {
      try {
        let response = await axios.put(`/api/cribroomDir/${selectedCribroom}/?no_depth`, payload, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken' : Cookies.get('csrftoken'),
            "Authorization": "JWT " + props.tokens
          }
      });
        console.log(response);
        if (response.request.status === 200) {
          console.log("Cribroom Updated");
          props.onHide();
        } else {
          console.log('Failed to Update');
        }

      } catch (err) {
          alert(":c");
          console.log(err);
      }
    }
  }

  function handleShiftChange(event) {
    setSelectedShift(event.target.value);
  }

  function handleZoneChange(event) {
    setSelectedZone(event.target.value);
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="contenedor-form-wrapper">
        <ToastContainer />
        <Container fluid className="conteiner-form-room">
          <Form onSubmit={handleEdit} className="conteiner-form-edit">
            <h1 className="titulo">Editar Sala Cuna</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>

            
            {renderFormFields(formFields.cribroom)}


            <div className="contenedor-boton-qr ">
              <Button
                className="boton-edit mt-3"
                boton
                variant="primary"
                type="submit"
                onClick={updateData}
              >
                Editar Sala Cuna
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Modal>
  );
}
