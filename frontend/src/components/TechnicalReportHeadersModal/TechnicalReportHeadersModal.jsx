import React, { useContext, useState, useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../../context/AuthContext";
// import "./SignUp.css";
import {renderFormFields} from "../renderFormFields/renderFormFields";

import {
  technicalReportHeaders_request,
} from "../../api/salasCuna.api";

import {
  toastLoading,
  toastUpdateError,
  toastUpdateSuccess,
} from "../../utils/toastMsgs";

export default function TechnicalReportHeadersModal(props) {

  const { authTokens } = useContext(AuthContext);
  const [technicalReportTable_data, setTechnicalReportTable_data] = useState([]);

  useEffect(() => {
    getAll();

  }, []);

  const customId = useRef(null);
  async function getAll() {
    try {
      toastLoading("Cargando los Datos", customId);
      const technicalReportTable_response = await technicalReportHeaders_request(authTokens.access);

      console.log('technicalReportTable_response: ', technicalReportTable_response);

      props.formData.encabezado_ministerio_base64 = technicalReportTable_response.data[0].encabezado_ministerio_base64;
      props.formData.encabezado_gobierno_base64 = technicalReportTable_response.data[0].encabezado_gobierno_base64;

      props.formData.ministro = technicalReportTable_response.data[0].ministro;
      props.formData.resolucion = technicalReportTable_response.data[0].resolucion;
      props.formData.remitanse = technicalReportTable_response.data[0].remitanse;

      setTechnicalReportTable_data(technicalReportTable_response);

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
        encabezado_ministerio_base64: formData.get("encabezado_ministerio_base64"),
        encabezado_gobierno_base64: formData.get("encabezado_gobierno_base64"),
        ministro: formData.get("ministro"),
        resolucion: formData.get("resolucion"),
        remitanse: formData.get("remitanse"),
      };

      console.log('payload: ', payload);

      let response = await technicalReportHeaders_request(authTokens.access, 'post', payload); // Include headers in the request

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
