import "../styles/styles.css";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

import React from "react";

export function RedirectSala() {
  return (
    <Form className="conteiner-form">
      <h1 className="titulo">Editar Sala Cuna</h1>

      <div className="contenedor-linea">
        <hr className="linea"></hr>
      </div>
      <Row>
        <Col xs={9} className="conteiner"></Col>
        <Form.Group className="mb-3">
          <Form.Label className="mb-1">Seleccionar Sala Cuna Que Desea Editar</Form.Label>
          <Form.Select placeholder="Seleccionar Sala Cuna" className="mb-1">
            <option value="Sala Cuna 1">Sala Cuna 1</option>
            <option value="Sala Cuna 2">Sala Cuna 2</option>
            <option value="Sala Cuna 3">Sala Cuna 3</option>
          </Form.Select>
            <Button className="button" boton variant="primary">Submit</Button>
        </Form.Group>
      </Row>
    </Form>
  );
}
