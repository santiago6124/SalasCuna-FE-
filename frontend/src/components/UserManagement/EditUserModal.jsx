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
  const [selectedUser, setSelectedUser] = useState("");
  const [user, setUser] = useState([]);
  const [roleOptions, setRolesOptions] = useState([]);
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    loadRoles();
    setSelectedUser(props.id);
    loadSelectedUser(props.id);
  }, []);

  const loadRoles = async () => {
    try {
      const response = await getAllRoles();
      setRolesOptions(response.data);
    } catch (error) {
      console.error("Error fetching role options:", error);
    }
  };

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

  const handleEditUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      email: formData.get("email"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      dni: formData.get("dni"),
      role: formData.get("role"),
      phone_number: formData.get("phone_number"),
      city: formData.get("city"),
      department: formData.get("department"),
      address: formData.get("address"),
      password: formData.get("password"),
      re_password: formData.get("re_password"),
    };
    if (selectedUser) {
      try {
        let response = await fetch(
          "http://127.0.0.1:8000/api/user/" + selectedUser + "/",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          console.log("Updated User");
          props.onHide();
        } else {
          console.error("Error updating user:", response.statusText);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="contenedor-form-wrapper">
        <Container fluid className="conteiner-form-signup">
          <Form onSubmit={handleEditUser} className="conteiner-form-edit">
            <h1 className="titulo">Editar Usuario</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>

            <div className="Form-Control">
              {/* Email Label */}
              <Col>
                <Form.Group className="col-lg-15 mb-1">
                  <Form.Label className="mb-1">E-mail</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar E-mail"
                    name="email"
                    defaultValue={user ? user.email : ""}
                    required
                  />
                </Form.Group>
              </Col>
            </div>
            <Row>
              {/* Nombre Label */}
              <Col className="col-md-6 ls mb-1">
                <Form.Label className="mb-1">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar nombre"
                  name="first_name"
                  defaultValue={user ? user.first_name : ""}
                  required
                />
              </Col>

              {/* Apellido Label */}
              <Col className="col-md-6 rs mb-1">
                <Form.Label className="mb-1">Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Apellido"
                  name="last_name"
                  defaultValue={user ? user.last_name : ""}
                  required
                />
              </Col>
            </Row>
            <Row>
              {/* DNI  Label*/}
              <Col className="col-md-6 ls mb-1">
                <Form.Label className="mb-1">DNI</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresar El Dni"
                  name="dni"
                  defaultValue={user ? user.dni : ""}
                  required
                />
              </Col>

              {/* Rol label (Dropdown) */}
              <Col className="col-md-6 rs mb-1">
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
                  {roleOptions.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            {/*Phone number Label*/}
            <div className="Form-Control">
              <Col>
              <Form.Group className="col-lg-15 mb-1">
                <Form.Label className="mb-1 ">Numero De Telefono</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresar Nro De Telefono"
                  name="phone_number"
                  defaultValue={user ? user.phone_number : ""}
                  required
                />
              </Form.Group>
              </Col>
            </div>

            <Row>
              {/* Ciudad */}
              <Col className="col-md-6 ls mb-1">
                <Form.Label className="mb-1">Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Ciudad"
                  name="city"
                  defaultValue={user ? user.city : ""}
                  required
                />
              </Col>

              {/* Departamento */}
              <Col className="col-md-6 rs mb-1">
                <Form.Label className="mb-1">Departamento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Departamento"
                  name="department"
                  defaultValue={user ? user.department : ""}
                  required
                />
              </Col>
            </Row>
            <div className="Form-Control">
              {/*Address Label*/}
                <Col>
                    <Form.Group className="col-lg-15 mb-1">
                    <Form.Label className="mb-1">Direccion</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresar Direccion"
                      name="address"
                      defaultValue={user ? user.address : ""}
                      required
                    />
                  </Form.Group>
                </Col>
            </div>
            <Row>
              {/*Password Label*/}
              <Col className="col-md-6 ls mb-1">
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

              {/*Repeat Password Label*/}
              <Col className="col-md-6 rs mb-1">
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

            <div className= "contenedor-boton-createuser">
              <Button type="submit"
                className="boton mt-1"
                boton
                variant="primary"
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
