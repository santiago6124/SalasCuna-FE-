import "./EditUserModal.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { getAllGroup, getAllDepartments } from "../../api/salasCuna.api";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { updateData, warningData } from "../../utils/toastMsgs";

export default function UpdateUser(props) {
  const [selectedUser, setSelectedUser] = useState("");
  const [user, setUser] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [group, setGroup] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [department, setDepartment] = useState("");

  useEffect(() => {
    loadGroup();
    loadDepartments();
    setSelectedUser(props.id);
    loadSelectedUser(props.id);
  }, [props]);

  async function loadGroup() {
    try {
      const response = await getAllGroup(props.tokens);
      setGroupOptions(response.data);
    } catch (error) {
      console.error("Error fetching group options:", error);
    }
  }

  function handleGroupChange(event) {
    setGroup(event.target.value);
  }

  async function loadDepartments() {
    try {
      const response = await getAllDepartments(props.tokens);
      setDepartmentOptions(response.data);
    } catch (error) {
      console.error("Error fetching department options:", error);
    }
  }

  function handleDepartmentChange(event) {
    setDepartment(event.target.value);
  }

  async function loadSelectedUser(user_id) {
    try {
      const response = await axios.get(`/api/user/${user_id}/`, {headers: {
        'Content-Type': 'application/json',
        "Authorization": "JWT " + props.tokens
    }});
      const data = await response.data;
      setUser(data);
    } catch (error) {
      console.error("Error fetching selected user data:", error);
    }
  }

  async function handleEditUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      email: formData.get("email"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      dni: formData.get("dni"),
      group: formData.get("group"),
      phone_number: formData.get("phone_number"),
      city: formData.get("city"),
      department: formData.get("department"),
      address: formData.get("address"),
    };
    if (selectedUser) {
      try {
        let response = await axios.put(`/api/user/${selectedUser}/`, payload, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken' : Cookies.get('csrftoken'),
            "Authorization": "JWT " + props.tokens
          }
      });
        if (response.request.status === 200) {
          updateData("Usuario editado");
          console.log("Updated User");
          props.onHide();
        } else {
          warningData("Error al editar el usuario!");
          console.error("Error updating user:", response.statusText);
        }
      } catch (error) {
        alert(error);
      }
    }
  }

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
                  name="group"
                  defaultValue={user ? user.group : ""}
                  onChange={handleGroupChange}
                  required
                >
                  <option value="" disabled selected>
                    Seleccionar Rol
                  </option>
                  {groupOptions.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
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
                <Form.Select
                  as="select"
                  name="department"
                  defaultValue={user ? user.department : ""}
                  onChange={handleDepartmentChange}
                  required
                >
                  <option value="" disabled>
                    Seleccionar Departamento
                  </option>
                  {departmentOptions.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.department}
                    </option>
                  ))}
                </Form.Select>
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
