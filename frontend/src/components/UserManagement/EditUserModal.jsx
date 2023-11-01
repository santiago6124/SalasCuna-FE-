import "./EditUserModal.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form/";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { updateData, warningData } from "../../utils/toastMsgs";
import {renderFormFields} from "../renderFormFields/renderFormFields";

export default function UpdateUser(props) {
  const [selectedUser, setSelectedUser] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    setSelectedUser(props.id);
    loadSelectedUser(props.id);
  }, []);


  async function loadSelectedUser(user_id) {
    try {
      const response = await axios.get(`/api/user/${user_id}/`, {headers: {
        'Content-Type': 'application/json',
        "Authorization": "JWT " + props.tokens
    }});
      const data = await response.data;
      setUser(data);
    } catch (error) {
      console.error("Error fetching selected user data:", error);
    }
  }

  async function handleEditUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      email: formData.get("email"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      dni: formData.get("dni"),
      group: formData.get("group"),
      phone_number: formData.get("phone_number"),
      city: formData.get("city"),
      department: formData.get("department"),
      address: formData.get("address"),
    };
    if (selectedUser) {
      try {
        let response = await axios.patch(`/api/user/${selectedUser}/`, payload, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken' : Cookies.get('csrftoken'),
            "Authorization": "JWT " + props.tokens
          }
      });
        if (response.request.status === 200) {
          updateData("Usuario editado");
          console.log("Updated User");
          props.onHide();
        } else {
          warningData("Error al editar el usuario!");
          console.error("Error updating user:", response.statusText);
        }
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="contenedor-form-wrapper">
        <Container fluid className="conteiner-form-signup">
          <Form onSubmit={handleEditUser} className="conteiner-form-edit">
            <h1 className="titulo">Editar Usuario</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>

            {renderFormFields(props.formFields.user, props.formData, props.handleInputChange)}

            <div className= "contenedor-boton-createuser">
              <Button type="submit"
                className="boton mt-1"
                boton
                variant="primary"
              >
                Editar
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Modal>
  );
}
