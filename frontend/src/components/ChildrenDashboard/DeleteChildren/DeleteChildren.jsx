import React from "react";
import "./DeleteChildren.css";

import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import Cookies from "js-cookie";

export default function DeleteChildren(props) {
  const [selectedChild, setSelectedChild] = useState("");

  useEffect(() => {
    setSelectedChild(props.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(event) {
    event.preventDefault();
    console.log("chico: " + selectedChild);
    try {
      const payload = {
        is_active: "false",
      };

      console.log("making fetch");
      await axios.patch(
        `/api/child/${selectedChild}/?delete`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
            "Authorization": "JWT " + props.tokens
          },
        }
      );
      props.onHide();
    } catch (err) {
      alert("Error al eliminar al chico/a", err);
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
        <Modal.Title className="titulo-eliminar">Eliminar Chicos</Modal.Title>
      </div>
      <div className="contenedor-linea-eliminar">
        <hr className="linea-eliminar"></hr>
      </div>
      <div className="par">
        <Alert severity="warning">
          <p>Esta seguro que desea deshabilitar a {selectedChild.name}?</p>
          <p>Esto hara que su estado pase a ser INACTIVO.</p>
        </Alert>
      </div>
      <Modal.Footer>
        <div className="button-wrapper">
          <div>
            <Button
              className="mt-3"
              boton
              variant="danger"
              onClick={handleDelete}
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
