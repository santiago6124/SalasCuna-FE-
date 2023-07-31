import React, { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
//import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import "./Login.css";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="body">
      <div>
        <Container fluid className="conteiner-form-login">
          <Form onSubmit={loginUser}>
            <h1 className="titulo">Iniciar Sesion</h1>
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
                  required
                />
              </div>

              {/* Rol label (Gotta change to dropdown later) */}
              <div className="col-md-6 mb-3">
                <Form.Label className="mb-1">Rol</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Rol del trabajador"
                  name="role"
                  required
                />
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
                  required
                />
              </Form.Group>
            </div>
            <div className="Form-Control">
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

            <div className="Form-Control">
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
                boton
                variant="primary"
                type="submit"
              >
                Ingresar
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
