import "./CreateRoom.css";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Container, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import Menu from "../Menu/Menu";

import React, { useState, useEffect } from "react";
import {
  getAllShifts,
  getAllUsers,
  getAllZones,
} from "../../api/salasCuna.api";
import Cookies from "js-cookie";

export function CreateRoom(props) {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedZona, setSelectedZone] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  useEffect(() => {
    loadZones();
    loadShifts();
    loadUser();
  }, []);

  async function loadZones() {
    try {
      const response = await getAllZones();
      let data = await response.data;
      setZoneOptions(data);
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  }

  async function loadShifts() {
    try {
      const response = await getAllShifts();
      let data = await response.data;
      setShiftOptions(data);
    } catch (error) {
      console.error("Error fetching shift options:", error);
    }
  }

  async function loadUser() {
    try {
      const response = await getAllUsers();
      let data = await response.data;
      setUserOptions(data);
    } catch (error) {
      console.error("Error fetching UserCR options", error);
    }
  }

  async function handleSubmit(event) {
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
      CUIT: formData.get("CUITCR"),
      entity: formData.get("entityCR"),
      user: formData.get("UserCR"),
    };

    try {
      let response = await axios.post("/api/cribroom/", payload, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      console.log(response);
      if (response.request.status === 201) {
        console.log("Cribroom added successfully");
        window.location.reload();
      } else {
        console.log("Failed to add Cribroom");
      }
    } catch (err) {
      alert(":c");
      console.log(err);
    }
  }

  function handleShiftChange(event) {
    setSelectedShift(event.target.value);
  }

  function handleZoneChange(event) {
    setSelectedZone(event.target.value);
  }

  function handleUserChange(event) {
    setSelectedUser(event.target.value);
  }

  return (
    <body className="body">
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="conteiner-form-wrapper">
          <Container className="conteiner-form-createroom">
            <Form onSubmit={handleSubmit}>
              <h1 className="titulo">Agregar Sala Cuna</h1>
              <div className="contenedor-linea">
                <hr className="linea"></hr>
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="mb-1">Nombre De Sala</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Editar El Nombre De La Sala"
                  name="nameCR"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="mb-1">Codigo De Sala</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Editar El Nombre De La Sala"
                  name="codeCR"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="mb-1">Capacidad Maxima</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Editar La Capacidad Maxima De La Sala"
                  name="max_capacityCR"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <Form.Label className="mb-1">CUIT</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="editar el CUIT de la entidad de la sala cuna"
                      name="CUITCR"
                    />
                  </Col>
                  <Col>
                    <Form.Label className="mb-1">Entidad</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Editar la entidad de la sala cuna"
                      name="entityCR"
                    />
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
                  />
                </Col>
                <Col>
                  <Form.Label className="mb-1">Nro</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nro"
                    name="house_numberCR"
                  />
                </Col>
              </Row>

              <Row className="mb-1">
                <Col>
                  <Form.Group>
                    <Form.Label className="mb-1">Turno</Form.Label>
                    <Form.Group className="mb-1">
                      <Form.Select
                        name="shiftCR"
                        as="select"
                        value={selectedShift}
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
                    value={selectedZona}
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

              <Row>
                <Col>
                  <Form.Label>Encargado</Form.Label>
                  <Form.Select
                    name="UserCR"
                    as="select"
                    value={selectedUser}
                    className="mb-1"
                    onChange={handleUserChange}
                  >
                    <option value="" disabled>
                      Seleccionar Encargado
                    </option>
                    {userOptions.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
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
                >
                  Crear Sala Cuna
                </Button>
              </div>
            </Form>
          </Container>
        </div>
      </Modal>
    </body>
  );
}
