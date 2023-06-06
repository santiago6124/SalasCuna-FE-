import React from "react";

import { Form } from "react-bootstrap";
import Button from "react-bootstrap";

import "./CreateUser.css";

export function CreateUser() {
    return(
        <Form className="container-form-createuser">
            <h1 className="titulo-createuser">Crear Usuario</h1>

            <div><h1 className="linea-container-createuser"></h1></div>
            <Form.Group>
                <Form.Label className="mb-1">Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el nombre de usuario"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label className="mb-1">Contraseña</Form.Label>
                <Form.Control type="text" placeholder="Ingrese Una Contraseña"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label className="mb-1">Repetir Contraseña</Form.Label>
                <Form.Control type="text" placeholder="Repetir La Contraseña"></Form.Control>
            </Form.Group>
            <div className='contenedor-boton'>
            <Button className='boton mt-3' boton variant="primary">
                <FaQrcode />
            </Button>
        </div>
        </Form>
    );
}
