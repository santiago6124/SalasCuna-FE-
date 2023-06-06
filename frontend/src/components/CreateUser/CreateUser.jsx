import React from "react";

import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "./CreateUser.css";

export function CreateUser() {
  return (
    <Form className="conteiner-form-createuser">
      <h1 className="titulo-createuser">Crear Usuario</h1>

      <div>
        <h1 className="linea-conteiner-createuser"></h1>
      </div>
      <Form.Group>
        <Form.Label className="mb-2">Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre de usuario"
          className="mb-3"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-2">Contraseña</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese Una Contraseña"
          className="mb-3"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-2">Repetir Contraseña</Form.Label>
        <Form.Control
          type="text"
          placeholder="Repetir La Contraseña"
          className="mb-3"
        ></Form.Control>
      </Form.Group>
      <div className="contenedor-boton-createuser">
        <Button className="boton mt-3" boton variant="primary">Crear Usuario</Button>
      </div>
    </Form>
  );
}
