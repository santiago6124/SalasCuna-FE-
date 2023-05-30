import React from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FaQrcode } from 'react-icons/fa';

export function AñadirTutor() {
  return (
    <Form className='conteiner-form'>
        <h1 className='titulo'>Añadir Tutor/a</h1>
        
        <div className='contenedor-linea'>
            <hr className='linea' ></hr>
        </div>

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
            <Form.Select aria-label="Floating label select example">
                <option> </option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
            </Form.Select>
        </Form.Group>
            
        <Form.Group className="mb-3" >
            <Form.Label className='mb-1'>Fecha De Nacimiento</Form.Label>
            <Form.Control type="date" placeholder="" />
        </Form.Group>

        <div className='contenedor-boton-qr '>
            <Button className='boton-qr mt-3' boton variant="primary">
                <FaQrcode />
            </Button>
        </div>
    </Form>
  );
}
