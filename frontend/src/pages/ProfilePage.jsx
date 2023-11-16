import React,{useState} from "react";
import {Row, Col, Container, Button} from "react-bootstrap";
import Account from "../components/Account/Account";
import Menu from "../components/Menu/Menu";
import profileImage from "../media/Profile.jpg";
import "../components/Account/Account.css";

export default function ProfilePage() {
  const [showAccount, setShowAccount] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  function manageAccount() {
    setShowPassword(false);
    setShowAccount(true);
  };

  function managePassword(){
    setShowAccount(false);
    setShowPassword(true);
  };

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
                    onClick={manageAccount()}
                    style={{ borderLeft: "4px solid #ef7e0e" }}
                  >
                    Info de cuenta
                  </Button>
                </Col>
                <Col className="mt-1 mb-2">
                  <Button
                    variant="prueba"
                    className="prueba"
                    onClick={managePassword()}
                    style={{ borderLeft: "4px solid #ef7e0e" }}
                  >
                    Cambiar contraseña
                  </Button>
                </Col>
              </div>
            </Col>
            <Col>
              <Account />
            </Col>
          </Row>
        </Container>
      </body>
    </div>
  );
}