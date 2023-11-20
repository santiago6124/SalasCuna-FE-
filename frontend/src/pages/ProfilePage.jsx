import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Account from "../components/Account/Account";
import Menu from "../components/Menu/Menu";
import profileImage from "../media/Profile.jpg";
import "../components/Account/Account.css";
import Modal from "react-bootstrap/Modal";
import Alert from "@mui/material/Alert";
import { ChangePassword } from "../components/ChangePassword/ChangePassword";

export default function ProfilePage() {
  const [showAccount, setShowAccount] = useState(true);
  const [showPasswordRequest, setShowPasswordResquest] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => setShowPasswordResquest(false);

  function manageAccount() {
    setShowPassword(false);
    setShowAccount(true);
  };

  function managePassword() {
    setShowAccount(false);
    setShowPasswordResquest(false);
    setShowPassword(true);
  };

  function managePasswordRequest() {
    setShowPasswordResquest(true);
  }

  return (
    <div className="App">
      <header style={{ marginTop: 100 }}>
        <div>
          <Menu />
        </div>
      </header>
      <body className="mt-5">
        <Container>
          <Row>
            <Col md={3}>
              <div className="MainDiv">
                <div className="image-container justify-content-center">
                  <img src={profileImage} alt="Perfil" className="circle-image" />
                </div>
                <div className="mt-2">
                  <h3>Bienvenido:</h3>
                </div>
                <div className="contenedor-linea-sm">
                  <hr className="linea-sm"></hr>
                </div>
                <Col className="mt-1 mb-2">
                  <Button
                    variant="prueba"
                    className="prueba"
                    onClick={() => manageAccount()}
                    style={{ borderLeft: "4px solid #ef7e0e" }}
                  >
                    Info de cuenta
                  </Button>
                </Col>
                <Col className="mt-1 mb-2">
                  <Button
                    variant="prueba"
                    className="prueba"
                    onClick={() => managePasswordRequest()}
                    style={{ borderLeft: "4px solid #ef7e0e" }}
                  >
                    Cambiar contraseña
                  </Button>
                </Col>
              </div>
            </Col>
            <Col>
              {showAccount &&
                <Account />
              }
              {showPasswordRequest &&
                <Modal
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={showPasswordRequest}
                  onHide={handleClose}
                  keyboard={false}>
                  <Modal.Header closeButton>
                  </Modal.Header>
                  <Row className="ps-4 w-100 align-items-*-center mt-4 mb-2">
                    <Modal.Title className="text-center">
                      Solicitar cambio de contraseña
                    </Modal.Title>
                  </Row>
                  <Row className="contenedor-linea-alert ps-4 w-100">
                    <hr className="linea-alert"></hr>
                  </Row>
                  <Modal.Body>
                    <Row className="p-2 justify-content-center">
                      <Alert severity="info">
                        Desea solicitar un cambio de contraseña?
                      </Alert>
                    </Row>
                    <Row className="ms-2 mt-3 ">
                      <Col className="p-2 ml-100">
                        <Button variant="primary" className="ms-3 " onClick={() => managePassword()}>
                          Si
                        </Button>
                        <Button variant="danger" className="ms-3 ">
                          No
                        </Button>
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>
              }
              {showPassword &&
                <ChangePassword />
              }
            </Col>
          </Row>
        </Container>
      </body>
    </div>
  );
}