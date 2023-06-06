import "./DeleteRoom.css";
import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

import React from "react";

export function DeleteRoom() {
    return (
      <Form className="conteiner-form-eliminar">
        <h1 className="titulo-eliminar">Eliminar Sala Cuna</h1>
        <div className="contenedor-linea-eliminar">
          <hr className="linea-eliminar"></hr>
        </div>
        <Row>
          <Col xs={9} className="conteiner-eliminar"></Col>
          <Form.Group className="mb-3">
            <Form.Label className="mb-1 mt-3">
              Seleccionar Sala Cuna Que Desea Eliminar
            </Form.Label>
            <Form.Select placeholder="Seleccionar Sala Cuna" className="mb-1">
              <option value="Sala Cuna 1">Sala Cuna 1</option>
              <option value="Sala Cuna 2">Sala Cuna 2</option>
              <option value="Sala Cuna 3">Sala Cuna 3</option>
            </Form.Select>
            <div className="contenedor-boton-eliminar mt-4">
              <Button className="boton-eliminar" boton variant="primary">
                Eliminar
              </Button>
            </div>
          </Form.Group>
        </Row>
      </Form>
    );
  }