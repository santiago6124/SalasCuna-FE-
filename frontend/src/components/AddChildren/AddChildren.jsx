import './AddChildren.css';

import Col from 'react-bootstrap/Col/';
import Row from 'react-bootstrap/Row/';
import Form from 'react-bootstrap/Form/';
import {Button} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export function AddChildren() {
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
            cribroom: formData.get("salacuna"),
            shift: formData.get("turno"),
            user: formData.get("usuario"),
            guardian: formData.get("tutor"),
            child_state: formData.get("estado"),
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

    const [tutores, setTutores] = useState([]); 
    const [generos, setGeneros] = useState([]); 
    const [salas, setSalas] = useState([]); 
    const [turnos, setTurno] = useState([]); 

    useEffect(() => {
        getChildren();
        listTutors();
        listGenero();
        listSalasCuna();
        listShift();
    }, []);

    const listTutors = () => {
        axios
            .get('http://127.0.0.1:8000/api/all-tutors/')
            .then((response) => {
                console.log(response);
                this.setTutores(response.data); 
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const listGenero = () => {
        axios
            .get('http://127.0.0.1:8000/api/all-gender/')
            .then((response) => {
                console.log(response);
                this.setGeneros(response.data); 
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const listSalasCuna = () => {
        axios
            .get('http://127.0.0.1:8000/api/all-rooms/')
            .then((response) => {
                console.log(response);
                this.setSalas(response.data); 
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const listShift = () => {
        axios
            .get('http://127.0.0.1:8000/api/all-shifts/')
            .then((response) => {
                console.log(response);
                this.setTurnos(response.data); 
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Form className="conteiner-form" onSubmit={handleSubmit}>
            <h1 className="titulo">Añadir Niños/as</h1>

            <div className="contenedor-linea">
                <hr className="linea"/>
            </div>

            <Form.Group className="mb-3">
                <Form.Label className="mb-1">Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingrese un nombre" name="nombre"/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>Apellido</Form.Label>
                <Form.Control type="text" placeholder="Ingrese un apellido"name="apellido"/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>DNI</Form.Label>
                <Form.Control type="number" placeholder="Ingrese un DNI"name="dni"/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>Fecha De Nacimiento</Form.Label>
                <Form.Control type="date" placeholder="" name="fechaNacimiento"/>
            </Form.Group>

            <Row className="mb-3">
                <Col>
                    <div className='form-group'>
                    <Form.Label className='mb-1'>Genero</Form.Label>
                        <select name="generos" className='form-control'>
                            {generos.map(elemento => (
                                <option key={elemento.id} value={elemento.id}>{elemento.genero}</option>
                            )
                            )}
                        </select>
                    </div>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label className='mb-1'>Domicilio</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese un domicilio" name= "domicilio"/>
                    </Form.Group>    
                </Col>
            </Row>
            
            <Row className="mb-3">
                <Col>
                    <div className='form-group'>
                        <Form.Label className='mb-1'>Sala Cuna</Form.Label>
                        <select name="salas" className='form-control'>
                            {salas.map(elemento => (
                                <option key={elemento.id} value={elemento.id}>{elemento.sala}</option>
                            )
                            )}
                        </select>
                    </div>
                </Col>
                <Col>
                    <div className='form-group'>
                        <Form.Label className='mb-1'>Tutor</Form.Label>
                        <select name="tutores" className='form-control'>
                            {tutores.map(elemento => (
                                <option key={elemento.id} value={elemento.id}>{elemento.tutor}</option>
                            )
                            )}
                        </select>
                    </div>
                </Col>
            </Row>       

            <div className='form-group mb-3'>
                <Form.Label className='mb-1'>Turno</Form.Label>
                <select name="turnos" className='form-control'>
                    {turnos.map(elemento => (
                        <option key={elemento.id} value={elemento.id}>{elemento.turno}</option>
                    )
                    )}
                </select>
            </div>
                    
            <Row className="mb-3">
                <Col>
                    <Form.Label className='mb-1'>Fecha de baja</Form.Label>
                    <Form.Control type="date" placeholder="" name="fechaBaja"/>
                </Col>
                <Col>
                    <Form.Label className='mb-1'>Fecha de alta</Form.Label>
                    <Form.Control type="date" placeholder="" name="fechaAlta"/>
                </Col>
            </Row>
 
            <div className="contenedor-boton mb-5">
                <Button as="input" type="submit" value="Cargar" size="lg"/>
            </div>
        </Form>
    );
}