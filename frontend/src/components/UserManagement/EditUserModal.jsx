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

export default function UpdateUser(props) {
  const [selectedUser, setSelectedUser] = useState("");
  const [user, setUser] = useState([]);
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
      const responseUsers = await fetch(
        "http://127.0.0.1:8000/api/user/" + user_id + "/",
        { method: "GET" }
      );
      if (responseUsers.ok) {
        const userData = await responseUsers.json();
        const userr = userData;
        setUser(userr);
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

  const handleEdit = async () => {
    console.log(selectedUser)
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="contenedor-form-wrapper">
        <Container fluid className="conteiner-form-signup">
          <Form onSubmit={handleEdit}>
            <h1 className="titulo">Crear Usuario</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>

            <div className="Form-Control">
              {/* Email Label */}
              <Form.Group className="mb-3">
                <Form.Label className="mb-1">E-mail</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar E-mail"
                  name="email"
                  defaultValue={user ? user.email : ""}
                  required
                />
              </Form.Group>
            </div>
            <div className="form-row">
              {/* Nombre Label */}
              <div className="col-md-6 mb-3">
                <Form.Label className="mb-1">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar nombre"
                  name="first_name"
                  defaultValue={user ? user.first_name : ""}
                  required
                />
              </div>

              {/* Apellido Label */}
              <div className="col-md-6 mb-3">
                <Form.Label className="mb-1">Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Apellido"
                  name="last_name"
                  defaultValue={user ? user.last_name : ""}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              {/* DNI  Label*/}
              <div className="col-md-6 mb-3">
                <Form.Label className="mb-1">DNI</Form.Label>
                <Form.Control
                  type="int"
                  placeholder="Ingresar El Dni"
                  name="dni"
                  defaultValue={user ? user.dni : ""}
                  required
                />
              </div>

              {/* Rol label (Dropdown) */}
              <div className="col-md-6 mb-3">
                <Form.Label className="mb-1">Rol</Form.Label>
                <Form.Select
                  as="select"
                  name="role"
                  defaultValue={user ? user.role : ""}
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
              </div>
            </div>

            {/*Phone number Label*/}
            <div className="Form-Control">
              <Form.Group className="mb-3">
                <Form.Label className="mb-1 ">Numero De Telefono</Form.Label>
                <Form.Control
                  className="form-label"
                  type="number"
                  placeholder="Ingresar Nro De Telefono"
                  name="phone_number"
                  defaultValue={user ? user.phone_number : ""}
                  required
                />
              </Form.Group>
            </div>

            <div className="form-row">
              {/* Ciudad */}
              <div className="col-md-6 mb-3">
                <Form.Label className="mb-1">Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Ciudad"
                  name="city"
                  defaultValue={user ? user.city : ""}
                  required
                />
              </div>

              {/* Departamento */}
              <div className="col-md-6 mb-3">
                <Form.Label className="mb-1">Departamento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Departamento"
                  name="department"
                  defaultValue={user ? user.department : ""}
                  required
                />
              </div>
            </div>
            <div className="Form-Control">
              {/*Address Label*/}
              <Form.Group className="mb-3">
                <Form.Label className="mb-1">Direccion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Direccion"
                  name="address"
                  defaultValue={user ? user.address : ""}
                  required
                />
              </Form.Group>
            </div>
              <div className="form-row">
                {/*Password Label*/}
                <Form.Group className="mb-3">
                  <Form.Label className="mb-1">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    name="password"
                    minLength="8"
                    required
                  />
                </Form.Group>
              </div>

                <div className="col-md-6 mb-3">
                {/*Repeat Password Label*/}
                <Form.Group className="mb-3">
                  <Form.Label className="mb-1">Repetir Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña de nuevo"
                    name="re_password"
                    minLength="8"
                    required
                  />
                </Form.Group>
                </div>

            <div className="contenedor-boton-createuser">
              <Button
                className="boton mt-3"
                boton variant="primary"
                type="submit"
              >
                Ingresar
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Modal>
  );
}
