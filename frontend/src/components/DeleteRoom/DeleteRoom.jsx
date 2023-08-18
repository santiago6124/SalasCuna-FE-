import "./DeleteRoom.css";
import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

import React, { useState, useEffect } from "react";

export default function DeleteRoom(props) {
  const [selectedCribroom, setSelectedCribroom] = useState("");

  useEffect(() => {
    setSelectedCribroom(props.id);
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        is_active: "False",
      };

      let response = await fetch(
        "http://127.0.0.1:8000/api/cribroom/" + selectedCribroom + "/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } catch (err) {
      alert("Error al eliminar la sala cuna");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="conteiner-modal-eliminar"
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
        <p>
          Esta seguro que desea Eliminar la Sala Cuna {selectedCribroom}?
          Esto hara que su estado pase a ser Inactivo, 
        </p>
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
              Dehabilitar
            </Button>
          </div>
            <Button className="mt-3" boton variant="primary">
              Cancelar
            </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
