import React from "react";
import "./DeleteChildren.css";

import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import Cookies from "js-cookie";

import { child_request } from "../../../api/salasCuna.api";

export default function DeleteChildren(props) {
  const [selectedChild, setSelectedChild] = useState("");
  const [childName, setChildName] = useState("");
  const [childState, setChildState] = useState("");

  useEffect(() => {
    setSelectedChild(props.id);
    setChildName(props.name);
    setChildState(props.is_active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(event) {
    event.preventDefault();
    console.log("chico: " + selectedChild);
    try {
      const payload = { is_active: childState ? false : true };

      console.log("payload: ", payload);
      console.log("selectedChild: ", selectedChild);

      const childReponse = await child_request(
        props.tokens,
        "patch",
        0,
        payload,
        selectedChild
      );
      console.log("childReponse: ", childReponse);

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
        <Modal.Title className="titulo-eliminar">
          Deshabilitar Chicos
        </Modal.Title>
      </div>
      <div className="contenedor-linea-eliminar">
        <hr className="linea-eliminar"></hr>
      </div>
      <div className="par">
        <Alert severity="warning">
          <p>Está seguro que desea deshabilitar a {childName}?</p>
          <p>Esto hará que su estado pase a ser INACTIVO.</p>
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
