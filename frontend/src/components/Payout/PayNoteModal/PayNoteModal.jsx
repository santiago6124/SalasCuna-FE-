import React, { useContext, useState, useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../../../context/AuthContext";
// import "./SignUp.css";
import {renderFormFields} from "../../renderFormFields/renderFormFields";

import { payNoteHeaders_request } from "../../../api/salasCuna.api";

import {
  toastLoading,
  toastUpdateError,
  toastUpdateSuccess,
} from "../../../utils/toastMsgs";

export default function PayNoteModal(props) {

  const { authTokens } = useContext(AuthContext);
  const [payNoteHeaders, setPayNoteHeaders] = useState([]);

  useEffect(() => {
    getAll();

  }, []);

  const customId = useRef(null);
  async function getAll() {
    try {
      toastLoading("Cargando los Datos", customId);
      const payNoteHeaders_response = await payNoteHeaders_request(authTokens.access);

      console.log('payNoteHeaders_response: ', payNoteHeaders_response);

      props.formData.dirige_a_sr = payNoteHeaders_response.data[0].dirige_a_sr;
      props.formData.dirige_a_persona_cr = payNoteHeaders_response.data[0].dirige_a_persona_cr;
      props.formData.ministerio = payNoteHeaders_response.data[0].ministerio;
      props.formData.resolucion = payNoteHeaders_response.data[0].resolucion;

      setPayNoteHeaders(payNoteHeaders_response);

      toastUpdateSuccess("Datos cargados", customId);
    } catch (error) {
      toastUpdateError("Error al cargar los Datos!", customId);
      console.error(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);

      const payload = {
        dirige_a_sr: formData.get("dirige_a_sr"),
        dirige_a_persona_cr: formData.get("dirige_a_persona_cr"),
        ministerio: formData.get("ministerio"),
        resolucion: formData.get("resolucion"),
      };

      console.log('payload: ', payload);

      let response = await payNoteHeaders_request(authTokens.access, 'post', payload); // Include headers in the request

      console.log('response: ', response);

      if (response.request.status === 201) {
        // props.onHide();
        console.log('to ok');
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
