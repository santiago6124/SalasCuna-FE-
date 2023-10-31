import React, { useContext, useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../../context/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./SignUp.css";
import { getAllDepartments, getAllGroup } from "../../api/salasCuna.api";

export default function SignUp(props) {
  const [role, setRole] = useState("");
  const [rolesList, setRolesList] = useState([]); // State to store the list of roles
  const [department, setDepartment] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const { authTokens, signupUser } = useContext(AuthContext);

  function handleRoleChange(event) {
    setRole(event.target.value);
  }

  function handleDepartmentChange(event) {
    setDepartment(event.target.value);
  }

  useEffect(() => {
    fetchRoles();
    fetchDepartments();
  }, []);

  // Fetch the roles from the backend API
  async function fetchRoles() {
    try {
      const response = await getAllGroup(authTokens.access);
      setRolesList(response.data); // Update the state with the list of roles
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  async function fetchDepartments() {
    try {
      const response = await getAllDepartments(authTokens.access);
      setDepartmentsList(response.data);
    } catch (error) {
      console.log("Error fetching departments", error)
    }
  };

  function handleSubmit(event){
    signupUser(event).then(props.onHide());
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="contenedor-form-wrapper">
        <Container className="conteiner-form-signup">
          <Form onSubmit={handleSubmit} className="conteiner-form-edit">
            <h1 className="titulo">Agregar Usuario</h1>
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
                    required />
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
                  required />
              </Col>

              {/* Apellido Label */}
              <Col className="col-md-6 rs mb-1">
                <Form.Label className="mb-1">Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Apellido"
                  name="last_name"
                  required />
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
                  required />
              </Col>
              {/* Rol label (Dropdown) */}
              <Col className="col-md-6 rs mb-1">
                <Form.Label className="mb-1">Rol</Form.Label>
                <Form.Select
                  as="select"
                  name="role"
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
              <Col>
                <Form.Group className="col-lg-15 mb-1">
                  <Form.Label className="mb-1 ">Numero De Telefono</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingresar Nro De Telefono"
                    name="phone_number"
                    required />
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
                  required />
              </Col>
              {/* Departamento */}
              <Col className="col-md-6 rs mb-1">
                <Form.Label className="mb-1">Departamento</Form.Label>
                <Form.Select as='select' name="department" onChange={handleDepartmentChange} required>
                  <option value='' disabled selected>
                    Seleccionar Departamento
                  </option>
                  {departmentsList.map((department) => (
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
                    required />
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
                    required />
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
                    required />
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
                Agregar Usuario
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Modal>
  );
}
