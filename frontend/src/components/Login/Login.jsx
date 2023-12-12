import React, { useContext, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Menu from "../Menu/Menu";
import "./Login.css";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import { updateData, warningData } from "../../utils/toastMsgs";
import { ToastContainer } from "react-toastify";

export function Login() {
  let { loginUser } = useContext(AuthContext);

  const [showPasswordRequest, setShowPasswordResquest] = useState(false);
  const handleClose = () => setShowPasswordResquest(false);

  function managePasswordRequest() {
    setShowPasswordResquest(true);
  }

  async function handleSubmit(event) {
    resetPasswordRequest(event).then(handleClose());
  }

  let resetPasswordRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const headers = {
      "Content-Type": "application/json"
    };
    const payload = {
      email: formData.get("email")
    };
    try {
      let response = await axios.post("/auth/users/reset_password/", payload, {
        headers: headers,
      });
      if (response.request.status === 204) {
        updateData("Se envió una solucitud a su correo electronico")
      }
    } catch (error) {
      warningData("Ocurrio un error durante la solicitud")
    }
  }

  return (
    <>
      <header className="header-login">
        <Menu />
      </header>
      <body className="body-login">
        <ToastContainer />
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
            <Button variant="link" className="link" onClick={() => managePasswordRequest()}>
              Me olvidé la contraseña
            </Button>

            {showPasswordRequest && (
              <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showPasswordRequest}
                onHide={handleClose}
                keyboard={false}
              >
                <Modal.Header closeButton></Modal.Header>
                <Row className="ps-4 w-100 align-items-*-center mt-4 mb-2">
                  <Modal.Title className="text-center">
                    Solicitar cambio de contraseña
                  </Modal.Title>
                </Row>
                <Row className="contenedor-linea-alert ps-4 w-100">
                  <hr className="linea-alert"></hr>
                </Row>
                <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row className="p-2 justify-content-center">

                      <Form.Group>
                        <Form.Label className="mb-2">
                          Ingresar Email para enviar el correo de restablecimiento de contraseña
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Ingrese su Email"
                          className="mb-3"
                        ></Form.Control>
                      </Form.Group>

                    </Row>
                    <Row className="ms-2 mt-3 ">
                      <Col className="p-2 ml-100">
                        <Button
                          variant="primary"
                          className="ms-3 "
                          type="submit"
                        >
                          Si
                        </Button>

                        <Button
                          variant="danger"
                          className="ms-3 "
                          onClick={() => handleClose()}
                        >
                          No
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Modal.Body>
              </Modal>
            )}
          </Container>
        </div>
      </body >
    </>
  );
}
