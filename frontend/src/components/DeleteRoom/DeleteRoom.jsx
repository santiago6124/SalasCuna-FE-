import "./DeleteRoom.css";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "@mui/material/Alert";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'

import { deletingData, warningData } from "../../utils/toastMsgs";

export default function DeleteRoom(props) {
  const [selectedCribroom, setSelectedCribroom] = useState("");

  useEffect(() => {
    setSelectedCribroom(props.id);
  }, [props]);

  async function handleDelete(event) {
    event.preventDefault();
    console.log(selectedCribroom);
    try {
      const payload = {
        is_active: "false",
      };

      console.log("making fetch");
      await axios.patch(`/api/cribroomDir/${selectedCribroom}/?delete`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
          "Authorization": "JWT " + props.tokens
        }
      });
      deletingData("Sala Cuna desactivada");
      props.onHide();
    } catch (err) {
      warningData("Error al desactivar la Sala Cuna!");
      alert("Error al eliminar la sala cuna", err);
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
          Eliminar Sala Cuna
        </Modal.Title>
      </div>
      <div className="contenedor-linea-eliminar">
        <hr className="linea-eliminar"></hr>
      </div>
      <div className="par">
        <p>Esta seguro que desea Eliminar la Sala Cuna {selectedCribroom}?</p>
        <p>Esto hara que su estado pase a ser Inactivo,</p>
      </div>
      <div className="par">
        <Alert severity="warning">
          <p>Los chicos que esten en esta sala cuna tambien</p>
          <p>
            pasaran a estar en <strong>estado Inactivo</strong>
          </p>
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
