import "../CribroomDashboard/DeleteRoom/DeleteRoom.css";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import { deletingData, warningData } from "../../utils/toastMsgs";

export default function DeleteUser(props) {
  const [selectedUser, setSelectedUser] = useState("");
  const [userName, setUserName] = useState("");


  useEffect(() => {
    setSelectedUser(props.id);
    setUserName(props.name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(event) {
    event.preventDefault();
    console.log(selectedUser);
    try {
      const activated = await axios.get(`/api/user/${selectedUser}/`, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
          "Authorization": "JWT " + props.tokens
        }
      });
      var payload
      if (activated.data.is_active){
        payload = {
          is_active: "false",
        }}
      else {
        payload = {
          is_active: "true",
        }}
      console.log("making fetch");
      let response = await axios.patch(`/api/user/${selectedUser}/`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken' : Cookies.get('csrftoken'),
          "Authorization": "JWT " + props.tokens
        }
    });
      if (response.request.status === 200) {
        deletingData("Usuario desactivado")
        console.log('Updated user successfully');
        props.onHide();
      } else {
        warningData("Error al desactivar el usuario!");
        console.log('Failed to update user');
      }
    } catch (err) {
      alert("Error al eliminar el usuario", err);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <Modal.Title className="titulo-eliminar">
          Eliminar Usuario
        </Modal.Title>
      </div>
      <div className="contenedor-linea-eliminar">
        <hr className="linea-eliminar"></hr>
      </div>
      <div className="par">
        <p>Esta seguro que desea Eliminar este Usuario {userName}?</p>
        <p>Esto hara que su estado pase a ser Inactivo</p>
      </div>
      <div className="par">
        <Alert severity="warning">
          <p>Este usuario no podra seguir utilizando los servicios de SalasCuna</p>
        </Alert>
      </div>
      <Modal.Footer>
        <div className="button-wrapper">
          <div>
            <Button
              className="mt-3"
              boton
              variant="danger"
              onClick={(handleDelete)}
            >
              Deshabilitar
            </Button>
          </div>
          <Button
            className="mt-3"
            boton
            variant="primary"
            onClick={props.onHide}
          >
            Cancelar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
