import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form/";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap"
import React, { useContext, useState, useEffect } from "react"; // Import useContext
import axios from "axios";
import AuthContext from "../../context/AuthContext"; // Import the AuthContext
import {renderFormFields} from "../renderFormFields/renderFormFields";
import './EditPayoutModal.css';


export function EditPayout(props) {
  const { authTokens } = useContext(AuthContext); // Get authTokens from the AuthContext
  

  async function handleEdit(event) {
    event.preventDefault();
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
    
    try {
      let response = await axios.put(`/api/payout/${props.id}/`, payload, { headers });
      // console.log(response.request.status);
      // console.log(response.request);
      if (response.request.statusText === 'OK') {
        console.log('Payout edited successfully');
        props.onHide();
      } else {
        console.log('Failed to edit payout');
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
                    Editar Pago
                  </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Modal>
  );
}
