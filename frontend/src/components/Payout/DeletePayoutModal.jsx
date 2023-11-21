import "../CribroomDashboard/DeleteRoom/DeleteRoom.css"
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "@mui/material/Alert";
import axios from "axios";
import React, { useContext } from "react"; // Import useContext
import AuthContext from "../../context/AuthContext"; // Import the AuthContext

import { payout_request } from "../../api/salasCuna.api";

export default function DeletePayout(props) {
  const { authTokens } = useContext(AuthContext); // Get authTokens from the AuthContext

  async function handleDelete(event) {
    event.preventDefault();

    try {

      // Send the headers along with the delete request
      const response = await payout_request(authTokens.access, 'delete', 0, {}, props.id);


      if (response.status === 204) {
        console.log('Payout deleted successfully');
        props.onHide();
      } else {
        console.log('Failed to delete payout');
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
