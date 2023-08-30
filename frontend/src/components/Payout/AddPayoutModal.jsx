import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import axios from "axios";

export function AddPayout(props) {

  const [zone, setZone] = useState("")

  const handleZoneChange = (event) => {
    setZone(event.target.value);
  }

  const handleAdd = async (event) =>{
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const payload = {
        amount : formData.get("amount"),
        date : formData.get("date"),
        zone : formData.get("zone"),
      }; 
      let response = await fetch(
        "http://127.0.0.1:8000/api/payout/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        props.onHide();
      }
    } catch (error) {
      console.log(error);
    };
  }
  
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="contenedor-form-wrapper">
        <Container fluid className="conteiner-form-room">
          <Form onSubmit={handleAdd} className="conteiner-form-edit">
            <h1 className="titulo">Agregar Pago</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Monto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Agregar el monto del pago"
                name="amount"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Fecha</Form.Label>
              <Form.Control type="date" name="date" required/>
            </Form.Group>
            <div className="col-md-2">
              <Form.Label className="mb-1">Seleccionar Zona</Form.Label>
              <Form.Select as="select" name="zone" value={zone} onChange={handleZoneChange} required>
                <option value="" disabled selected>
                  Seleccionar Zona
                </option>
                {props.zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="contenedor-boton-qr ">
              <Button
                className="boton-edit mt-3"
                boton
                variant="primary"
                type="submit"
              >
                Agregar Pago
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Modal>
  );
}
