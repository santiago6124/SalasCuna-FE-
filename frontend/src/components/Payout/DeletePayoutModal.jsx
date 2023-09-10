import "../DeleteRoom/DeleteRoom.css"
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "@mui/material/Alert";
import axios from "axios";
import React from "react";

export default function DeletePayout(props) {
    async function handleDelete(event) {
      event.preventDefault();
      try {
        let response = await axios.delete(`/api/payout/${props.id}/`);
        if (response.request.status === 201) {
          console.log('Child added successfully');
          props.onHide();
      } else {
          console.log('Failed to add child');
        }
      } catch (err) {
        alert("Error al eliminar el payout");
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
              Eliminar Payout
            </Modal.Title>
          </div>
          <div className="contenedor-linea-eliminar">
            <hr className="linea-eliminar"></hr>
          </div>
          <div className="par">
            <p>Esta seguro que desea Eliminar este Payout {props.id}?</p>
            <p>Esto hara que sea borrado permanentemente</p>
          </div>
          <div className="par">
            <Alert severity="warning">
              <p>Este Payout no podra ser recuperado de ninguna manera y</p>
              <p>
                todos sus datos seran <strong>eliminados permanentemente</strong>
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
                  Eliminar
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