import React, { useContext, useState } from 'react';


import Button from 'react-bootstrap/Button'; // Importa Button de react-bootstrap
import Modal from 'react-bootstrap/Modal'; // Importa Modal de react-bootstrap


export default function Profile({ show, handleClose }) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Titulo del Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Contenido del modal rectangular.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }