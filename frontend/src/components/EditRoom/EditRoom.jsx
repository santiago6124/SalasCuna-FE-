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

  useEffect(() => {
    loadZones();
    loadShifts();
    setSelectedCribroom(props.id);
    loadSelectedCribroom(props.id); // Load selected cribroom data
  }, [props]);

  async function loadZones() {
    try {
      const response = await getAllZones(props.tokens);
      setZoneOptions(response.data);
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  }

  async function loadShifts() {
    try {
      const response = await getAllShifts(props.tokens);
      setShiftOptions(response.data);
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

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Nombre De Sala</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editar El Nombre De La Sala"
                name="nameCR"
                defaultValue={cribroom ? cribroom.name : ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Codigo De Sala</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editar El Nombre De La Sala"
                name="codeCR"
                defaultValue={cribroom ? cribroom.code : ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Capacidad Maxima</Form.Label>
              <Form.Control
                type="number"
                placeholder="Editar La Capacidad Maxima De La Sala"
                name="max_capacityCR"
                defaultValue={cribroom ? cribroom.max_capacity : ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label className="mb-1">CUIT</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Editar el CUIT de la entidad de la sala cuna"
                    name="CUITCR"
                    defaultValue={cribroom ? cribroom.CUIT : ""}
                  />
                </Col>
                <Col>
                <Form.Label className="mb-1">Entidad</Form.Label>
                <Form.Control
                type="text"
                placeholder="Editar la entidad de la sala cuna"
                defaultValue = {cribroom? cribroom.entity:""}
                name="entityCR"/>
                </Col>
              </Row>
            </Form.Group>
            <Row className="mb-1">
              <Col xs={9}>
                <Form.Label className="mb-1">Calle</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Editar Calle"
                  name="streetCR"
                  defaultValue={cribroom ? cribroom.street : ""}
                />
              </Col>
              <Col>
                <Form.Label className="mb-1">Nro</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nro"
                  name="house_numberCR"
                  defaultValue={cribroom ? cribroom.house_number : ""}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label className="mb-1">Turno</Form.Label>
                  <Form.Group className="mb-3">
                    <Form.Select
                      name="shiftCR"
                      as="select"
                      value={selectedShift ? selectedShift : cribroom.shift}
                      className="mb-1"
                      onChange={handleShiftChange}
                    >
                      <option value="" disabled>
                        Seleccionar Turno
                      </option>
                      {shiftOptions.map((shift) => (
                        <option key={shift.id} value={shift.id}>
                          {shift.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form.Group>
              </Col>
              <Col>
                <Form.Label className="mb-1">Zona</Form.Label>
                <Form.Select
                  name="zoneCR"
                  as="select"
                  value={selectedZone ? selectedZone : cribroom.zone}
                  onChange={handleZoneChange}
                >
                  <option value="" disabled>
                    Seleccionar Zona
                  </option>
                  {zoneOptions.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
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
