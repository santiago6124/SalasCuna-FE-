import React, { useContext, useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../../context/AuthContext";
import "./SignUp.css";
import {renderFormFields} from "../renderFormFields/renderFormFields";

export default function SignUp(props) {

  const { authTokens, signupUser } = useContext(AuthContext);

  function handleSubmit(event){
    signupUser(event).then(props.onHide());
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="contenedor-form-wrapper">
        <Container className="conteiner-form-signup">
          <Form onSubmit={handleSubmit} className="conteiner-form-edit">
            <h1 className="titulo">Agregar Usuario</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>
            
            
            {renderFormFields(props.formFields.user, props.formData, props.handleInputChange)}

            <div className="contenedor-boton-createuser">
              <Button
                className="boton mt-1"
                boton
                variant="primary"
                type="submit"
              >
                Agregar Usuario
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Modal>
  );
}
