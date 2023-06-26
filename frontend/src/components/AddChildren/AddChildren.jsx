<<<<<<< HEAD:frontend/src/components/AddChildren/AddChildren.jsx

import './AddChildren.css';

=======
import '../styles/styles.css';
>>>>>>> addChildren:frontend/src/components/añadirChico.jsx
import Col from 'react-bootstrap/Col/';
import Row from 'react-bootstrap/Row/';
import Form from 'react-bootstrap/Form/';
<<<<<<< HEAD:frontend/src/components/AddChildren/AddChildren.jsx
import { Button } from 'react-bootstrap';

=======
>>>>>>> addChildren:frontend/src/components/añadirChico.jsx
import { FaQrcode } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

<<<<<<< HEAD:frontend/src/components/AddChildren/AddChildren.jsx
export function AddChildren() {
  return (
    <Form className='conteiner-form'>
        <h1 className='titulo'>Añadir Niños/as</h1>
        
        <div className='contenedor-linea'>
            <hr className='linea' ></hr>
        </div>
        <Form.Group className="mb-3" >
            <Form.Label className='mb-1'>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Ingrese un nombre" />
        </Form.Group>
        <Form.Group className="mb-3" >
=======
export function AñadirChico() {
  useEffect(() => {
    getChildren();
  }, []);

  const getChildren = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/all-objects/');
    let data = await response.json();
    console.log(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const payload = {
      id: "4545455",
      first_name: formData.get("nombre"),
      last_name: formData.get("apellido"),
      dni: formData.get("dni"),
      birthdate: formData.get("fechaNacimiento"),
      registration_date: formData.get("fechaAlta"),
      gender: formData.get("genero"),
      cribroom: 1,
      shift: 1,
      user: 1,
      guardian: 1,
      child_state: 1,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/child/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Child added successfully');
        // Perform any additional actions if needed
      } else {
        console.log('Failed to add child');
        // Handle the error if needed
      }
    } catch (error) {
      console.error('An error occurred while adding child:', error);
    }
  };

  return (
    <Form className="conteiner-form" onSubmit={handleSubmit}>
      <h1 className="titulo">Añadir Niños/as</h1>

      <div className="contenedor-linea">
        <hr className="linea" />
      </div>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1">Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingrese un nombre" name="nombre" />
      </Form.Group>

      <Form.Group className="mb-3" >
>>>>>>> addChildren:frontend/src/components/añadirChico.jsx
            <Form.Label className='mb-1'>Apellido</Form.Label>
            <Form.Control type="text" placeholder="Ingrese un apellido" />
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label className='mb-1'>DNI</Form.Label>
            <Form.Control type="number" placeholder="Ingrese un DNI" />
        </Form.Group>
        <Row className="mb-3">
            <Col>
                <Form.Label className='mb-1'>Tutor</Form.Label>
                <Form.Control type="text" placeholder="Ingresar tutor" />
            </Col>
            <Col>
                <Form.Label className='mb-1'>Genero</Form.Label>
                <Form.Select aria-label="Floating label select example">
                    <option> </option>
                    <option value="1">Masculino</option>
                    <option value="2">Femenino</option>
                </Form.Select>
            </Col>    
        </Row>
            
        <Form.Group className="mb-3" >
            <Form.Label className='mb-1'>Fecha De Nacimiento</Form.Label>
            <Form.Control type="date" placeholder="" />
        </Form.Group>
        <Row className="mb-3">
            <Col>
                <Form.Label className='mb-1'>Fecha de baja</Form.Label>
                <Form.Control type="date" placeholder="" />
            </Col>
            <Col>
                <Form.Label className='mb-1'>Fecha de alta</Form.Label>
                <Form.Control type="date" placeholder="" />
            </Col>    
        </Row>
        <Form.Group className="mb-3" >
            <Form.Label className='mb-1'>Domicilio</Form.Label>
            <Form.Control type="text" placeholder="Ingrese un domicilio" />
        </Form.Group>
<<<<<<< HEAD:frontend/src/components/AddChildren/AddChildren.jsx
        <div className='contenedor-boton-qr '>
            <Button className='boton-qr mt-3' boton variant="primary">
                <FaQrcode />
            </Button>
        </div>
=======


      <div className="contenedor-boton mb-5">
        <Button as="input" type="submit" value="Cargar" size="lg" />
      </div>
>>>>>>> addChildren:frontend/src/components/añadirChico.jsx
    </Form>
  );
}