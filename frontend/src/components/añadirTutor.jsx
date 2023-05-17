import React from 'react'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';

export function AñadirTutor() {
  return (
    <Form className='conteiner-form'>
        <h1 className='titulo'>Añadir Tutor/a</h1>
        
        <div className='contenedor-linea'>
            <hr className='linea' ></hr>
        </div>

        <Row>
            <Col xs={9} className='conteiner'>
                <Form.Group className="mb-3" >
                    <Form.Label className='mb-1'>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese un nombre" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label className='mb-1'>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese un apellido" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label className='mb-1'>DNI</Form.Label>
                    <Form.Control type="number" placeholder="Ingrese un DNI" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label className='mb-1'>Genero</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese un Genero" />
                </Form.Group>
            
                <Form.Group className="mb-3" >
                    <Form.Label className='mb-1'>Fecha De Nacimiento</Form.Label>
                    <Form.Control type="date" placeholder="" />
                </Form.Group>

                
            </Col>
            <Col>
                <Button className='boton-qr' boton variant="primary">
                    <FontAwesomeIcon icon={ faQrcode } style={{color: "#ffffff",}} />
                </Button>
            </Col>
        </Row>
    </Form>
  );
}
