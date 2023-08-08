import "./CreateRoom.css";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import axios from "axios";

export function CreateRoom() {
  const [zonaOptions, setZonaOptions] = useState([]);
  const [selectedZona, setSelectedZona] = useState("");
  useEffect(() => {
    fetchZonaOptions();
  }, []);


  const fetchZonaOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/zone/");
      let jsonData = await response.json();
      setZonaOptions(jsonData);
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  };

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
                <Form.Select
                  as="select"
                  value={selectedZona}
                  onChange={(e) => setSelectedZona(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccionar Zona
                  </option>
                  {zonaOptions.map((zona) => (
                    <option key={zona.id} value={zona.id}>
                      {zona.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <div className="contenedor-boton-qr ">
              <Button className="boton-edit mt-3" boton variant="primary">
                Crear Sala Cuna
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}
