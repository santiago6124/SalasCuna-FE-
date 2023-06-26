import React from "react";
import {Card, Container, FloatingLabel, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import { Button} from "react-bootstrap";

const ResetPasswordConfirmPage = () => {

    const {uid, token} = useParams()
    let history = useNavigate()

    let uidToken = uid
    let activationToken = token


    let resetPasswordConfirm = async (e) => {
        e.preventDefault()
        let response = await fetch('/auth/users/reset_password_confirm/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "uid": uidToken,
                "token": activationToken,
                "new_password": e.target.new_password.value,
                "re_new_password": e.target.re_new_password.value
            })
        })
        if (response.status === 204) {
            history('/')
        } else {
            alert('Something went wrong')
        }
    }

    return (
        
        <Form onSubmit={resetPasswordConfirm} className="conteiner-form-changepw">
            <h1 className="titulo-changepw">Cambiar Contraseña</h1>
            <div>
                <h1 className="linea-conteiner-changepw"></h1>
            </div>
            <Form.Group>
                <Form.Label className="mb-2">Gmail</Form.Label>
                <Form.Control
                    name='gmail'
                    type="text"
                    placeholder="Ingrese su gmail"
                    className="mb-3"
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label className="mb-2">Ingresar Nueva Contraseña</Form.Label>
                <Form.Control
                    name='new_password'
                    type="text"
                    placeholder="Ingrese la Nueva Contraseña"
                    className="mb-3"
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label className="mb-2">Repetir Nueva Contraseña</Form.Label>
                <Form.Control
                    name='re_new_password'
                    type="text"
                    placeholder="Repetir La Nueva Contraseña"
                    className="mb-3"
                ></Form.Control>
            </Form.Group>
            <div className="contenedor-boton-changepw">
                <Button className="boton mt-3" boton variant="primary" type='submit'>Cambiar Contraseña</Button>
            </div>
        </Form>

    );
}

export default ResetPasswordConfirmPage