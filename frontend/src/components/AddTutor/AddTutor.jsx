import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';

import { FaQrcode } from 'react-icons/fa';

export function AddTutor() {
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        listGenero();
    }, []);

    const listGenero = () => {
        axios
            .get('http://127.0.0.1:8000/api/all-gender/')
            .then((response) => {
                console.log(response);
                setGeneros(response.data); 
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Form className='conteiner-form'>
            <h1 className='titulo'>Añadir Tutor/a</h1>

            <div className='contenedor-linea'>
                <hr className='linea'></hr>
            </div>

            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingrese un nombre"/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>Apellido</Form.Label>
                <Form.Control type="text" placeholder="Ingrese un apellido"/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>DNI</Form.Label>
                <Form.Control type="number" placeholder="Ingrese un DNI"/>
            </Form.Group>

            <div className='form-group mb-3'>
                <Form.Label className='mb-1'>Genero</Form.Label>
                <select name="generos" className='form-control'>
                        {generos.map(elemento => (
                        <option key={elemento.id} value={elemento.id}>{elemento.genero}</option>
                    )
                    )}
                </select>
            </div>

            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>Fecha De Nacimiento</Form.Label>
                <Form.Control type="date" placeholder=""/>
            </Form.Group>
            
            <div className="contenedor-boton mb-5">
                <Button as="input" type="submit" value="Cargar" size="lg"/>
            </div>
        </Form>
    );
}