import React, { useContext, useState } from 'react';
import '../Profile/Profile.css'


import Button from 'react-bootstrap/Button'; // Importa Button de react-bootstrap
import Modal from 'react-bootstrap/Modal'; // Importa Modal de react-bootstrap


export default function Profile({ show, handleClose }) {
    return (
      <Modal dialogClassName="card modal-90h" show={show} onHide={handleClose}>
        
          
        
      </Modal>
    );
  }