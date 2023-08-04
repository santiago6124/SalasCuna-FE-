import "./CreateRoom.css";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import {Container} from "react-bootstrap";
import { Button } from "react-bootstrap";

export function CreateRoom() {
  return (
    <div className="body">
      <div className="contenedor-form-wrapper">
        <Container fluid className="conteiner-form-room">
          <Form className="conteiner-form-edit">
            <h1 className="titulo">Agregar Sala Cuna</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Nombre De Sala</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editar El Nombre De La Sala"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Codigo De Sala</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editar El Nombre De La Sala"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Capacidad Maxima</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editar La Capacidad Maxima De La Sala"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Turno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Seleccione El Turno De La Sala"
              />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Label className="mb-1">Direccion</Form.Label>
                <Form.Control type="text" placeholder="Editar Direccion" />
              </Col>
              <Col>
                <Form.Label className="mb-1">Zona</Form.Label>
                <Form.Control type="text" placeholder="Editar Zona" />
              </Col>
            </Row>
            <div className="contenedor-boton-qr ">
              <Button className="boton-edit mt-3" boton variant="primary">
                Editar
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}
