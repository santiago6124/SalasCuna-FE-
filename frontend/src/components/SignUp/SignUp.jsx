import React, { useContext, useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios"; // Import Axios for API calls


import "./SignUp.css";

const SignUp = () => {
  const [role, setRole] = useState("");
  const [rolesList, setRolesList] = useState([]); // State to store the list of roles

  const { signupUser } = useContext(AuthContext);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    // Fetch the roles from the backend API
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/RoleViewSet/?exclude_directora");
        setRolesList(response.data); // Update the state with the list of roles
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="body">
        <Container className="conteiner-form-signup">
          <Form onSubmit={signupUser} className="conteiner-form-edit">
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
                  required
                />
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
  );
};

export default SignUp;
