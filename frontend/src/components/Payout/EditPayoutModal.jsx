import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form/";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React from "react";
import axios from "axios";

export function EditPayout(props) {
  async function handleEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      amount: formData.get("amount"),
      date: formData.get("date"),
      zone: formData.get("zone"),
    };
    try {
      let response = await axios.put(`/api/payout/${props.id}/`, payload);
      if (response.request.status === 201) {
        console.log('Child added successfully');
        props.onHide();
      } else {
        console.log('Failed to add child');
      }
    } catch (error) {
      console.log(error);
    };
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="contenedor-form-wrapper">
        <Container fluid className="conteiner-form-room">
          <Form onSubmit={handleEdit} className="conteiner-form-edit">
            <h1 className="titulo">Modificar Pago</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Monto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editar el monto del pago"
                name="amount"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Fecha</Form.Label>
              <Form.Control type="date" name="date" />
            </Form.Group>
            <div className="col-md-2">
              <Form.Label className="mb-1">Seleccionar Zona</Form.Label>
              <Form.Select as="select" name="zone">
                <option value="" disabled>
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
                Editar Pago
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Modal>
  );
}
