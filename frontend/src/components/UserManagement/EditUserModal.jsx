import "../EditRoom/EditRoom.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import { getAllRoles } from "../../api/salasCuna.api";

export function UpdateUser(props) {
    const [selectedUser, setSelectedUser] = useState([]);
    const [roleOptions, setRolesOptions] = useState([]);


    useEffect(() => {
        loadRoles();
        loadSelectedUser(props.id)
    }, []);

    async function loadSelectedUser(user_id) {
        try {
            const responseUsers = axios.get("/api/user/" + user_id);
            if (response.ok) {
                const userData = await responseUsers.data;
                setSelectedUser(userData[0])
            } else {
                console.error("Error fetching selected user data:", response.statusText);
            }

        } catch (error) {
            console.error("Error fetching selected user data:", error);
        }
    }

    const loadRoles = async () => {
        try {
          const response = await getAllRoles();
          setRolesOptions(response.data);
        } catch (error) {
          console.error("Error fetching role options:", error);
        }
      };

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
          <div className="contenedor-form-wrapper">
            <Container fluid className="conteiner-form-room">
              <Form onSubmit={handleEdit} className="conteiner-form-edit">
                <h1 className="titulo">Editar Usuario</h1>
                <div className="contenedor-linea">
                  <hr className="linea"></hr>
                </div>
    
                <Form.Group className="mb-3">
                  <Form.Label className="mb-1">Nombre Del Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Editar El Nombre Del Usuario"
                    name="first_name"
                    defaultValue={user ? user.first_name : ""}
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
                          value={selectedShift ? selectedShift: cribroom.shift}
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
                      value={selectedZone ? selectedZone: cribroom.zone}
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