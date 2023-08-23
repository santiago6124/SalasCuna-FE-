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
    loadSelectedUser(props.id);
  }, []);

  async function loadSelectedUser(user_id) {
    try {
      const responseUsers = axios.get("/api/user/" + user_id);
      if (response.ok) {
        const userData = await responseUsers.data;
        setSelectedUser(userData[0]);
      } else {
        console.error(
          "Error fetching selected user data:",
          response.statusText
        );
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
              <Form.Label className="mb-1">Email Del Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editar El e-mail Del Usuario"
                name="email"
                defaultValue={user ? user.email : ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Apellido del usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editar el apellido del usuario"
                name="last_name"
                defaultValue={user ? user.last_name : ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Direccion Del Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editar la direccion del usuario"
                name="address"
                defaultValue={user ? user.address : ""}
              />
              <Form.Label className="mb-1">Departamento Del Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editar el departamento del usuario"
                name="department"
                defaultValue={user ? user.department : ""}
              />
              <Form.Label className="mb-1">Ciudad Del Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editar la ciudad del usuario"
                name="city"
                defaultValue={user ? user.city : ""}
              />
            </Form.Group>
            <Row className="mb-1">
              <Col xs={9}>
                <Form.Label className="mb-1">DNI del usuario</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Editar DNI del usuario"
                  name="dni"
                  defaultValue={user ? user.dni : ""}
                />
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="mb-1">Rol del usuario</Form.Label>
                  <Form.Group className="mb-3">
                    <Form.Select
                      name="role"
                      as="select"
                      value={roleOptions ? roleOptions : user.role}
                      className="mb-1"
                      /* onChange={} */
                    >
                      <option value="" disabled>
                        Seleccionar rol
                      </option>
                      {roleOptions.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Numero de telefono</Form.Label>
              <Form.Control
                type="number"
                placeholder="Editar el numero de telefono del usuario"
                name="last_name"
                defaultValue={user ? user.phone_number : ""}
              />
            </Form.Group>
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
