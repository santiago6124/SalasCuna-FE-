import "./DeleteRoom.css";
import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

import React from "react";

export function DeleteRoom(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form className="conteiner-form-eliminar">
        <h1 className="titulo-eliminar">Eliminar Sala Cuna</h1>
        <div className="contenedor-linea-eliminar">
          <hr className="linea-eliminar"></hr>
        </div>
        <Row>
          <Col xs={9} className="conteiner-eliminar"></Col>
          <Form.Group className="mb-3">
            <Form.Label className="mb-1 mt-3">
              Esta Seguro que desea Deshabilitar la Sala Cuna
            </Form.Label>
            <div className="contenedor-boton-eliminar mt-4">
              <Button className="boton-eliminar" boton variant="danger">
                Dehabilitar
              </Button>
              <Button className="boton-edit mt-3" boton variant="primary">
                Cancelar
              </Button>
            </div>
          </Form.Group>
        </Row>
      </Form>
    </Modal>
  );
}
