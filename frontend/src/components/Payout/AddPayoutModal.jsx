import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react"; // Import useContext
import axios from "axios";
import AuthContext from "../../context/AuthContext"; // Import your AuthContext
import {renderFormFields} from "../renderFormFields/renderFormFields";
import './AddPayoutModal.css';

import {
  getAllZones,
} from "../../api/salasCuna.api";

export function AddPayout(props) {
  const [zone, setZone] = useState("");
  const { authTokens } = useContext(AuthContext); // Get the authTokens from your context

  async function handleAdd(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const payload = {
        amount: formData.get("amount"),
        date: formData.get("date"),
        zone: formData.get("zone"),
      };

      let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + authTokens.access,
        "Accept": "application/json"
      };

      let response = await axios.post(`/api/payout/`, payload, { headers }); // Include headers in the request

      if (response.request.status === 201) {
        props.onHide();
      }
    } catch (error) {
      console.log(error);
    }
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
            
            {renderFormFields(props.formFields.payout, props.formData, props.handleInputChange)}

            <div className="button-container">
              <Button
                className="close-button mt-3"
                onClick={props.onHide} // Usa la función onHide para cerrar el modal
              >
                Cerrar
              </Button>

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
