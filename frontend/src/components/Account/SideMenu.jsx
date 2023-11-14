import "./Account.css";
import profileImage from "../../media/Profile.jpg";
import { Button } from "react-bootstrap";

import { Col, Row } from "react-bootstrap";

export default function SideMenu() {
  return (
    <div className="MainDiv">
      <div className="image-container">
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
          style={{ borderLeft: "4px solid #ef7e0e" }}
        >
          Info de cuenta
        </Button>
      </Col>
      <Col className="mt-1 mb-2">
        <Button
          variant="prueba"
          className="prueba"
          style={{ borderLeft: "4px solid #ef7e0e" }}
        >
          Cambiar contrasenia
        </Button>
      </Col>
    </div>
  );
}
