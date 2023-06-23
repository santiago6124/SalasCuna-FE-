import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "./CreateUser.css";

const CreateUser = () => {
  /*let {signupUser} = useContext(AuthContext)*/
  return (
    <Form className="conteiner-form-createuser">
      <h1 className="titulo-createuser">Crear Usuario</h1>

      <div>
        <h1 className="linea-conteiner-createuser"></h1>
      </div>
      <Form.Group>
        <Form.Label className="mb-2">Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su nombre" className="mb-3" name="first_name"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-2">Apellido</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su apellido" className="mb-3" name="last_name"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-2">Email</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su direccion de correo" className="mb-3" name="email"></Form.Control>
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
export default CreateUser;