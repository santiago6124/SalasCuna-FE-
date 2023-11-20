import React from "react";

import { Button, Form } from "react-bootstrap";

import "./ChangePassword.css";

export function ChangePassword() {
    return (
        <Form>
            <h1 className="titulo-changepw">Cambiar Contraseña</h1>

            <div>
                <h1 className="linea-conteiner-changepw"></h1>
            </div>
            <Form.Group>
                <Form.Label className="mb-2">Dirección de email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese su dirección de email"
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
