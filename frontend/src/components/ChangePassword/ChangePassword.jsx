import React from "react";

import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "./ChangePassword.css";

const ChangePassword = () => {

  let history = useNavigate()

  let resetPasswordEmail = async (e) => {
      e.preventDefault()
      let response = await fetch('/auth/users/reset_password/', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json"
          },
          body: JSON.stringify({
              "email": e.target.email.value
          })
      })
      if (response.status === 204) {
          history('/')
      } else {
          alert('Something went wrong')
      }
  }

  return (
    <Form className="conteiner-form-changepw">
      <h1 className="titulo-changepw">Cambiar Contraseña</h1>

      <div>
        <h1 className="linea-conteiner-changepw"></h1>
      </div>
      <Form.Group>
        <Form.Label className="mb-2">Nombre de Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre de usuario"
          className="mb-3"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-2">Ingresar Nueva Contraseña</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese la Nueva Contraseña"
          className="mb-3"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-2">Repetir Nueva Contraseña</Form.Label>
        <Form.Control
          type="text"
          placeholder="Repetir La Nueva Contraseña"
          className="mb-3"
        ></Form.Control>
      </Form.Group>
      <div className="contenedor-boton-changepw">
        <Button className="boton mt-3" boton variant="primary">
          Cambiar Contraseña
        </Button>
      </div>
    </Form>
  );
}

export default ChangePassword