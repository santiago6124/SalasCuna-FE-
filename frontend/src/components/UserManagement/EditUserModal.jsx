import "./EditUserModal.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import { getAllRoles } from "../../api/salasCuna.api";

export default function UpdateUser(props) {
  const [selectedUser, setSelectedUser] = useState([]);
  const [roleOptions, setRolesOptions] = useState([]);
  const [role, setRole] = useState("");
  const [rolesList, setRolesList] = useState([]);
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    loadRoles();
    loadSelectedUser(props.id);
  }, []);

  async function loadSelectedUser(user_id) {
    try {
      const responseUsers = axios.get(
        "http://127.0.0.1:8000/api/user/" + user_id
      );
      if (responseUsers.ok) {
        const userData = await responseUsers.data;
        setSelectedUser(userData[0]);
      } else {
        console.error(
          "Error fetching selected user data:",
          responseUsers.statusText
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
        <Container fluid className="conteiner-form-signup">
          <Form>
            <h1 className="titulo">Editar Usuario</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>

            <div className="Form-Control">
              {/* Email Label */}
              <Col>
                <Form.Group className="mb-1">
                  <Form.Label className="mb-2">E-mail</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar E-mail"
                    name="email"
                    required
                  />
                </Form.Group>
              </Col>
            </div>
            <Row>
              {/* Nombre Label */}
              <Col className="col-md-6 mb-1">
                <Form.Label className="mb-1">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar nombre"
                  name="first_name"
                  required
                />
              </Col>

              {/* Apellido Label */}
              <Col className="col-md-6 mb-1">
                <Form.Label className="mb-1">Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Apellido"
                  name="last_name"
                  required
                />
              </Col>
            </Row>
            <Row>
              {/* DNI  Label*/}
              <Col className="col-md-6 mb-1">
                <Form.Label className="mb-1">DNI</Form.Label>
                <Form.Control
                  type="int"
                  placeholder="Ingresar El Dni"
                  name="dni"
                  required
                />
              </Col>

              {/* Rol label (Dropdown) */}
              <Col className="col-md-6 mb-1">
                <Form.Label className="mb-1">Rol</Form.Label>
                <Form.Select
                  as="select"
                  name="role"
                  value={role}
                  onChange={handleRoleChange}
                  required
                >
                  <option value="" disabled selected>
                    Seleccionar Rol
                  </option>
                  {rolesList.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            {/*Phone number Label*/}
            <div className="Form-Control">
              <Form.Group className="mb-1">
                <Form.Label className="mb-1 ">Numero De Telefono</Form.Label>
                <Form.Control
                  className="form-label"
                  type="number"
                  placeholder="Ingresar Nro De Telefono"
                  name="phone_number"
                  required
                />
              </Form.Group>
            </div>

            <Row>
              {/* Ciudad */}
              <Col className="col-md-6 mb-1">
                <Form.Label className="mb-1">Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Ciudad"
                  name="city"
                  required
                />
              </Col>

              {/* Departamento */}
              <Col className="col-md-6 mb-1">
                <Form.Label className="mb-1">Departamento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Departamento"
                  name="department"
                  required
                />
              </Col>
            </Row>
            <div className="Form-Control">
              {/*Address Label*/}
              <Form.Group className="mb-1">
                <Form.Label className="mb-1">Direccion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Direccion"
                  name="address"
                  required
                />
              </Form.Group>
            </div>
            <Row>
              {/*Password Label*/}
              <Col className="col-md-6 mb-1">
                <Form.Group className="mb-1">
                  <Form.Label className="mb-1">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    name="password"
                    minLength="8"
                    required
                  />
                </Form.Group>
              </Col>

              <Col className="col-md-6 mb-1">
                {/*Repeat Password Label*/}
                <Form.Group className="mb-1">
                  <Form.Label className="mb-1">Repetir Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña de nuevo"
                    name="re_password"
                    minLength="8"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="contenedor-boton-createuser">
              <Button
                className="boton mt-1"
                boton
                variant="primary"
                type="submit"
              >
                Editar
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Modal>
  );
}
