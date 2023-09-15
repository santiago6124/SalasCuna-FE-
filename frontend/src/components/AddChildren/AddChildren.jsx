import './AddChildren.css';

import Col from 'react-bootstrap/Col/';
import Row from 'react-bootstrap/Row/';
import Form from 'react-bootstrap/Form/';
import {Button} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { getAllCribroomsWithoutDepth, getAllGenders, getAllShifts } from '../../api/salasCuna.api';

import Cookies from 'js-cookie';

export function AddChildren() {
    async function handleSubmit(event) {
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
            let response = await axios.post('/api/child/', payload , {
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken' : Cookies.get('csrftoken')
                }
            });
            console.log(response);
            if (response.request.status === 201) {
                console.log('Child added successfully');
                window.location.reload();
            } else {
                console.log('Failed to add Child');
            }

        } catch (err) {
            alert(":c");
            console.log(err);
        }
    }

    const [tutores, setTutores] = useState([]); 
    const [genders, setGeneros] = useState([]); 
    const [salas, setSalas] = useState([]); 
    const [shifts, setTurno] = useState([]); 

    const [selectedGenero, setSelectedGenero] = useState('');
    const [selectedTutor, setSelectedTutor] = useState('');
    const [selectedSalaCuna, setSelectedSalacuna] = useState('');
    const [selectedTurno, setSelectedTurno] = useState('');

    function handleGeneroChange(event) {
        setSelectedGenero(event.target.value);
    }
    function handleTutorChange(event) {
        setSelectedTutor(event.target.value);
    }
    function handleSalaCunaChange(event) {
        setSelectedSalacuna(event.target.value);
    }
    function handleTurnoChange(event) {
        setSelectedTurno(event.target.value);
    }

    useEffect(() => {
        ListTutors();
        ListGenero();
        ListSalasCuna();
        ListShift();
    }, []);

    async function ListTutors() {
        try {
            const response = await axios.get('/api/GuardianListCreateView/');
            setTutores(response.data.guardian);
        } catch (error) {
            console.error('Error fetching tutores:', error);
        };
    }

    async function ListGenero() {
        try {
            const response = await getAllGenders();
            setGeneros(response.data.gender);
        } catch (error) {
            console.error('Error fetching generos:', error);
        }
    }

    async function ListSalasCuna() {
        try {
            const response = await getAllCribroomsWithoutDepth();
            setSalas(response.data);
        } catch (error) {
            console.log('Error fetching Salas Cunas:', error);
        };
    }

    async function ListShift() {
        try {
            const response = await getAllShifts();
            setTurno(response.data);
        } catch (error) {
            console.log('Error fetching Turnos:', error);
        };
    }

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
                    <div>
                        <Form.Label className='mb-1'>Genero</Form.Label>
                        <select id="gender" value={selectedGenero} onChange={handleGeneroChange} className='form-control'>
                            <option value="">Generos</option>
                            {genders.map((gender) => (
                                <option key={gender.id} value={gender.id}>
                                    {gender.gender}
                                </option>
                            ))}
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
                    <div>
                        <Form.Label className='mb-1'>Sala Cuna</Form.Label>
                        <select id="cribroom" value={selectedSalaCuna} onChange={handleSalaCunaChange} className='form-control'>
                            <option value="">Sala Cuna</option>
                            {salas.map((cribroom) => (
                                <option key={cribroom.id} value={cribroom.id}>
                                    {cribroom.cribroom}
                                </option>
                            ))}
                        </select>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label className='mb-1'>Tutor</Form.Label>
                        <select id="guardian" value={selectedTutor} onChange={handleTutorChange} className='form-control'>
                            <option value="">Tutores</option>
                            {tutores.map((guardian) => (
                                <option key={guardian.id} value={guardian.id}>
                                    {guardian.guardian}
                                </option>
                            ))}
                        </select>
                    </div>
                </Col>
            </Row>       
            
            <div className='mb-3'>
                <Form.Label className='mb-1'>Turno</Form.Label>
                <select id="shift" value={selectedTurno} onChange={handleTurnoChange} className='form-control'>
                    <option value="">Turnos</option>
                    {shifts.map((shift) => (
                        <option key={shift.id} value={shift.id}>
                            {shift.shift}
                        </option>
                    ))}
                </select>
            </div>

                    
            <Row className="mb-4">
                <Col>
                    <Form.Label className='mb-1'>Fecha de baja</Form.Label>
                    <Form.Control type="date" placeholder="" name="fechaBaja"/>
                </Col>
                <Col>
                    <Form.Label className='mb-1'>Fecha de alta</Form.Label>
                    <Form.Control type="date" placeholder="" name="fechaAlta"/>
                </Col>
            </Row>
 
            <div className="contenedor-boton mb-1 ">
                <Button as="input" type="submit" value="Cargar" size="lg"/>
            </div>
        </Form>
    );
}