import "./CreateRoom.css";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

import React, { useState, useEffect } from "react";


export function CreateRoom() {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [selectedZona, setSelectedZone] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  useEffect(() => {
    loadZones();
    loadShifts();
  }, []);

  const loadZones = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/zone/");
      let jsonData = await response.json();
      setZoneOptions(jsonData);
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  };

  const loadShifts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/shift/");
      let jsonData = await response.json();
      setShiftOptions(jsonData);
    } catch (error) {
      console.error("Error fetching shift options:", error);
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
                type="number"
                placeholder="Editar La Capacidad Maxima De La Sala"
              />
            </Form.Group>
            <Row className="mb-1">
              <Col xs={9}>
                <Form.Label className="mb-1">Calle</Form.Label>
                <Form.Control type="text" placeholder="Editar Calle" />
              </Col>
              <Col >
                <Form.Label className="mb-1">Nro</Form.Label>
                <Form.Control type="number" 
                placeholder="Nro"
                 />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label className="mb-1">Turno</Form.Label>
                  <Form.Group className="mb-3">
                    <Form.Select
                      as="select"
                      value={selectedShift}
                      className="mb-1"
                      onChange={(e) => setSelectedShift(e.target.value)}
                    >
                      <option value="" disabled>
                        Seleccionar Turno
                      </option>
                      {shiftOptions.map((shift) => (
                        <option key={shift.id} value={shift.id}>
                          {shift.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form.Group>
              </Col>
              <Col>
                <Form.Label className="mb-1">Zona</Form.Label>
                <Form.Select
                  as="select"
                  value={selectedZona}
                  onChange={(e) => setSelectedZone(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccionar Zona
                  </option>
                  {zoneOptions.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name}
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
