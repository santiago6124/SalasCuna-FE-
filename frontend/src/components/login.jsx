import React, { useContext } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  return (
    <Container fluid className="conteiner-form-login">
      <Form>
        <h1 className="titulo">Iniciar Sesion</h1>

        <div className="contenedor-linea">
          <hr className="linea"></hr>
        </div>
        <Form.Group className="mb-3">
          <Form.Label className="mb-1">Usuario</Form.Label>
          <Form.Control type="text" placeholder="Ingrese su nombre de usuario" name="username" required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="mb-1">Contraseña</Form.Label>
          <Form.Control type="text" placeholder="Ingrese su contraseña" name="password" minLength='8' required/>
        </Form.Group>
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
  );
};
export default LoginPage;
