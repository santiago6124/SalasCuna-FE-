import React from 'react'
import './DeleteChildren.css';

import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import { FaQrcode } from 'react-icons/fa';


export function DeleteChildren() {
  return (
    <Form className='conteiner-form'>
        <h1 className='titulo'>Dar Baja Niños/as</h1>
        
        <div className='contenedor-linea'>
            <hr className='linea' ></hr>
        </div>
        <Form.Group className="mb-3 mt-5" >
            <Form.Label className='mb-1'><b>Nombre</b></Form.Label>
            <Form.Control type="text" placeholder="Ingrese un nombre" />
        </Form.Group>
            
        <div className='contenedor-boton-qr '>
            <Button className='boton-qr mt-5' boton variant="primary">
                Eliminar
            </Button>
        </div>

    </Form>
  );
}