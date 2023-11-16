import "./DeleteRoom.css";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "@mui/material/Alert";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Cookies from 'js-cookie'

import { toastLoading, toastUpdateError, toastUpdateSuccess } from "../../../utils/toastMsgs";

export default function DeleteRoom(props) {
  const [selectedCribroom, setSelectedCribroom] = useState("");
  const CustomId = useRef(null);

  useEffect(() => {
    setSelectedCribroom(props.id);
  }, [props]);

  async function handleDelete(event) {
    event.preventDefault();
    toastLoading("Desactivando la Sala Cuna. Por favor, no toque nada", CustomId);
    try {
      const payload = {
        is_active: "false",
      };
      await axios.patch(`/api/cribroomDir/${selectedCribroom}/?delete`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
          "Authorization": "JWT " + props.tokens
        }
      });
      toastUpdateSuccess("Sala Cuna desactivada", CustomId);
      props.onHide();
    } catch (err) {
      toastUpdateError("Error al desactivar la Sala Cuna!");
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
        <p>¿Está seguro que desea eliminar la Sala Cuna {selectedCribroom}?</p>
        <p>Esto hará que su estado pase a ser inactivo.</p>
      </div>
      <div className="par">
        <Alert severity="warning">
          <p>Los chicos que están en esta sala cuna también</p>
          <p>
          pasarán a estar en <strong>ESTADO INACTIVO</strong>.
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
