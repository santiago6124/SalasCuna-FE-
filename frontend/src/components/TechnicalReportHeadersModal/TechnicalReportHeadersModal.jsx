import React, { useContext, useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../../context/AuthContext";
// import "./SignUp.css";
import {renderFormFields} from "../renderFormFields/renderFormFields";
import axios from "axios";

export default function TechnicalReportHeadersModal(props) {

  const { authTokens, signupUser } = useContext(AuthContext);

  async function handleSubmit(event){
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const payload = {
        encabezado: formData.get("encabezado"),
        ministro: formData.get("ministro"),
        resolucion: formData.get("resolucion"),
        remitanse: formData.get("remitanse"),
      };

      let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + authTokens.access,
        "Accept": "application/json"
      };

      let response = await axios.post(`/api/TechnicalReportTableListCreateView/`, payload, { headers }); // Include headers in the request

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
        <Container className="conteiner-form-signup">
          <Form onSubmit={handleSubmit} className="conteiner-form-edit">
            <h1 className="titulo">Encabezados</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>
            
            
            {renderFormFields(props.formFields.encabezados, props.formData, props.handleInputChange)}

            <div className="contenedor-boton-createuser">
              <Button
                className="boton mt-1"
                boton
                variant="primary"
                type="submit"
              >
                Modificar Encabezados
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Modal>
  );
}
