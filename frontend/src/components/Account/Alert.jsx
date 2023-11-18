import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "@mui/material/Alert";
import { Row, Col } from "react-bootstrap";

export default function AlertPW(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Row className="ps-4 w-100 align-items-*-center mt-4 mb-2">
          <Modal.Title className="text-center">
            Solicitar cambio de contraseña
          </Modal.Title>
        </Row>
        <Row className="contenedor-linea-alert ps-4 w-100">
          <hr className="linea-alert"></hr>
        </Row>

        <Modal.Body>
          <Row className="p-2 justify-content-center">
            <Alert severity="info">
              Desea solicitar un cambio de contraseña?
            </Alert>
          </Row>
          <Row className="ms-2 mt-3 ">
            <Col className="p-2 ml-100">
              <Button variant="primary" className="ms-3 ">
                Si
              </Button>
              <Button variant="danger" className="ms-3 ">
                No
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
