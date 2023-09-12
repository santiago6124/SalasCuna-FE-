import React, { useContext, useState } from 'react';
import '../Profile/Profile.css'


import Button from 'react-bootstrap/Button'; // Importa Button de react-bootstrap
import Modal from 'react-bootstrap/Modal'; // Importa Modal de react-bootstrap


export default function Profile({ show, handleClose }) {
    return (
      <Modal  
      dialogClassName="modal-90h custom-clip-path"  
      show={show} 
      onHide={handleClose} 
      style={{ width: '250px', 
               height: '500px'
            }}>
        
    
        
      </Modal>
    );
  }