import React, { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Menu from "../Menu/Menu";
import "./Login.css";

export function Login() {
  let { loginUser } = useContext(AuthContext);
  return (
    <>
      <header className="header-login">
        <Menu />
      </header>
      <body className="body-login">
        <div className="div-form-login"> 
          <Container fluid className="conteiner-form-login">
            <Form onSubmit={loginUser}>
              <h1 className="titulo">Iniciar Sesión</h1>

              <div className="contenedor-linea">
                <hr className="linea"></hr>
              </div>
              <Form.Group className="mb-3">
                <Form.Label className="mb-1">Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  name="username"
                  required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="mb-1">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  name="password"
                  minLength="8"
                  required />
              </Form.Group>
              <div className="contenedor-boton-createuser">
                <Button
                  className="mt-3"
                  boton
                  variant="primary"
                  type="submit"
                >
                  Log in
                </Button>
              </div>
            </Form>
            <Link to="/signup/">
              <Button variant="link" className="link">
                No tengo una cuenta
              </Button>
            </Link>
            <Link to="/reset-password/">
              <Button variant="link" className="link">
                Me olvidé la contraseña
              </Button>
            </Link>
          </Container>
        </div>
      </body>
    </>
  );
}
