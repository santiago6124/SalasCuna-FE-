import React, {useEffect, useState} from 'react';

import '../AddChildren/AddChildren.css';

import Col from 'react-bootstrap/Col/';
import Row from 'react-bootstrap/Row/';
import Form from 'react-bootstrap/Form/';
import {Button} from 'react-bootstrap';
import axios from 'axios';

export function FormAddChildren() {

    useEffect(() => {
        getChildren();
    }, []);

    const getChildren = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/all-objects/');
        let data = await response.json();
        console.log(data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target);
        const payload = {
            id: "4545455",
            first_name: formData.get("nombreChield"),
            last_name: formData.get("apellidoChield"),
            dni: formData.get("dniChield"),
            birthdate: formData.get("fechaNacimientoChield"),
            registration_date: formData.get("fechaAlta"),
            gender: formData.get("generoChield"),
            cribroom: formData.get("salacuna"),
            shift: formData.get("turno"),
            user: formData.get("usuario"),
            guardian: formData.get("tutor"),
            child_state: formData.get("estado"),
            disenroll_date: formData.get("fechaBaja"),
            street: formData.get("calle"),
            house_number: formData.get("numero_casa"),
            locality: formData.get("locality"),
            neighborhood: formData.get("neighborhood"),

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
                window.location.reload(); 
            } else {
                console.log('Failed to add child');
                
            }
        } catch (error) {
            console.error('An error occurred while adding child:', error);
        }
    };

    const [tutores, setTutores] = useState([]); 
    const [chieldGenders, setGenerosChield] = useState([]); 
    const [guardianGenders, setGenerosGuardian] = useState([]);
    const [salas, setSalas] = useState([]); 
    const [shifts, setTurno] = useState([]); 
    const [localities, setLocalities] = useState([]); 
    const [neighborhoods, setNeighborhoods] = useState([]); 
    const [childStates, setChildStates] = useState([]); 
    

    const [selectedGeneroChield, setSelectedGeneroChield] = useState('');
    const [selectedGeneroGuardian, setSelectedGeneroGuardian] = useState('');
    const [selectedTutor, setSelectedTutor] = useState('');
    const [selectedSalaCuna, setSelectedSalacuna] = useState('');
    const [selectedTurno, setSelectedTurno] = useState('');
    const [selectedLocality, setSelectedLocality] = useState('');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const [selectedChildState, setSelectedChildState] = useState('');
    

    const handleGeneroChieldChange = (event) => {
        setSelectedGeneroChield(event.target.value);
        
    };
    
    const handleGeneroGuardianChange = (event) => {
        setSelectedGeneroGuardian(event.target.value);
        
    };
    const handleTutorChange = (event) => {
        setSelectedTutor(event.target.value);
        
    };
    const handleSalaCunaChange = (event) => {
        setSelectedSalacuna(event.target.value);
        
    };
    const handleTurnoChange = (event) => {
        setSelectedTurno (event.target.value);
        
    };
    const handleLocalityChange = (event) => {
        setSelectedLocality(event.target.value);
        
    };
    const handleNeighborhoodChange = (event) => {
        setSelectedNeighborhood(event.target.value);
        
    };
    const handleChildStateChange = (event) => {
        setSelectedChildState(event.target.value);
        
    };
    

    useEffect(() => {
        getChildren();
        ListTutors();
        ListGeneroChield();
        ListGeneroGuardian();
        ListSalasCuna();
        ListShift();
        ListLocality();
        ListNeighborhood();
        ListChieldState();
    }, []);

    const ListTutors = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ChildRelatedObjectsView/');
            setTutores(response.data.guardian);
            } catch(error) {
                console.error('Error fetching tutores:', error);
            };
    };

    const ListGeneroChield = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/ChildRelatedObjectsView/');
          setGenerosChield(response.data.gender);
        } catch (error) {
          console.error('Error fetching generos:', error);
        }
      };

      const ListGeneroGuardian = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/ChildRelatedObjectsView/');
          setGenerosGuardian(response.data.gender);
        } catch (error) {
          console.error('Error fetching generos:', error);
        }
      };

    const ListSalasCuna = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ChildRelatedObjectsView/');
            setSalas(response.data.cribroom);
            }   catch (error)  {
                console.log('Error fetching Salas Cunas:', error);
            };
    };

    const ListShift = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ChildRelatedObjectsView/');
            setTurno(response.data.shift);
            } catch (error) {
                console.log('Error fetching Turnos:', error);
            };
    };

    const ListLocality = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ChildRelatedObjectsView/');
            setLocalities(response.data.locality);
            } catch(error) {
                console.error('Error fetching localidad:', error);
            };
    };

    const ListNeighborhood = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ChildRelatedObjectsView/');
            setNeighborhoods(response.data.neighborhood);
            } catch(error) {
                console.error('Error fetching barrio:', error);
            };
    };

    const ListChieldState = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ChildRelatedObjectsView/');
            setChildStates(response.data.child_state);
            } catch(error) {
                console.error('Error fetching estados:', error);
            };
    };

    

  return (
    <Form className="conteiner-form" onSubmit={handleSubmit}>
            
            <h1 className="titulo">Añadir Niños/as</h1>

            <div className="contenedor-linea">
                <hr className="linea"/>
            </div>

            <Form.Group className="mb-3">
                <Form.Label className="mb-1">Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingrese un nombre" name="nombreChield" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>Apellido</Form.Label>
                <Form.Control type="text" placeholder="Ingrese un apellido"name="apellidoChield" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>DNI</Form.Label>
                <Form.Control type="number" placeholder="Ingrese un DNI"name="dniChield" />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>Fecha De Nacimiento</Form.Label>
                <Form.Control type="date" placeholder="" name="fechaNacimientoChield" />
            </Form.Group>

            <Row className="mb-3">
                <Col>
                    <div>
                        <Form.Label className='mb-1'>Genero</Form.Label>
                        <select id="gender" name="generoChield" value={selectedGeneroChield} onChange={handleGeneroChieldChange} className='form-control'>
                            <option value="">Generos</option>
                            {chieldGenders.map((gender) => (
                                <option key={gender.id} value={gender.id}>
                                    {gender.gender}
                                </option>
                            ))}
                        </select>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label className='mb-1'>Estado</Form.Label>
                        <select id="child_state" name="estado" value={selectedChildState} onChange={handleChildStateChange} className='form-control'>
                            <option value="">Estado</option>
                            {childStates.map((child_state) => (
                                <option key={child_state.id} value={child_state.id}>
                                    {child_state.child_state}
                                </option>
                            ))}
                        </select>
                    </div>
                </Col>
            </Row>
            
            <Row className="mb-3">
                <Col>
                    <div>
                        <Form.Label className='mb-1'>Sala Cuna</Form.Label>
                        <select id="cribroom" name="salacuna" value={selectedSalaCuna} onChange={handleSalaCunaChange} className='form-control'>
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
                        <select id="guardian" name="tutor" value={selectedGeneroGuardian} onChange={handleGeneroGuardianChange} className='form-control'>
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
                <select id="shift" name="turno" value={selectedTurno} onChange={handleTurnoChange} className='form-control'>
                    <option value="">Turnos</option>
                    {shifts.map((shift) => (
                        <option key={shift.id} value={shift.id}>
                            {shift.shift}
                        </option>
                    ))}
                </select>
            </div>

                    
            <Row className="mb-5">
                <Col>
                    <Form.Label className='mb-1'>Fecha de baja</Form.Label>
                    <Form.Control type="date" placeholder="" name="fechaBaja"/>
                </Col>
                <Col>
                    <Form.Label className='mb-1'>Fecha de alta</Form.Label>
                    <Form.Control type="date" placeholder="" name="fechaAlta"/>
                </Col>
            </Row>


            






            <h1 className='titulo'>Añadir Tutor/a</h1>

            <div className='contenedor-linea'>
                <hr className='linea'></hr>
            </div>

            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingrese un nombre" name="nombreGuardian" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>Apellido</Form.Label>
                <Form.Control type="text" placeholder="Ingrese un apellido" name="apellidoGuardian"/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className='mb-1'>DNI</Form.Label>
                <Form.Control type="number" placeholder="Ingrese un DNI" name='dniGuardian' />
            </Form.Group>

            <div className='mb-3'>
                <Form.Label className='mb-1'>Genero</Form.Label>
                <select id="gender" name='generoGuardian' value={selectedGeneroGuardian} onChange={handleGeneroGuardianChange} className='form-control'>
                    <option value="">Generos</option>
                    {guardianGenders.map((gender) => (
                        <option key={gender.id} value={gender.id}>
                            {gender.gender}
                        </option>
                    ))}
                </select>
            </div>

            <Form.Group className="mb-5">
                <Form.Label className='mb-1'>Fecha De Nacimiento</Form.Label>
                <Form.Control type="date" placeholder="" name="fechaNacimientoGuardian" />
            </Form.Group>












            <h1 className='titulo'>Añadir Domicilio</h1>

            <div className='contenedor-linea'>
                <hr className='linea'></hr>
            </div>
            <Row className="mb-3">
                <Col>
                    <Form.Label className='mb-1'>Calle</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese una calle" name="calle"/>
                </Col>
                <Col>
                    <Form.Label className='mb-1'>Numero</Form.Label>
                    <Form.Control type="number" placeholder="Ingrese un numero" name="numero_casa"/>
                </Col>
            </Row>

            <div className='mb-3'>
                <Form.Label className='mb-1'>Barrio</Form.Label>
                <select id="neighborhood" name="neighborhood" value={selectedNeighborhood} onChange={handleNeighborhoodChange} className='form-control'>
                    <option value="">Localidad</option>
                    {neighborhoods.map((neighborhood) => (
                        <option key={neighborhood.id} value={neighborhood.id}>
                            {neighborhood.neighborhood}
                        </option>
                    ))}
                </select>
            </div>

            <div className='mb-3'>
                <Form.Label className='mb-1'>Localidad</Form.Label>
                <select id="locality" name="locality" value={selectedLocality} onChange={handleLocalityChange} className='form-control'>
                    <option value="">Localidad</option>
                    {localities.map((locality) => (
                        <option key={locality.id} value={locality.id}>
                            {locality.locality}
                        </option>
                    ))}
                </select>
            </div>


            <Row className="mb-4">
                <Col>
                    <Form.Label className='mb-1'>Departamento</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese una calle" name='departamento'/>
                </Col>
                <Col>
                    <Form.Label className='mb-1'>Telefono</Form.Label>
                    <Form.Control type="number" placeholder="Ingrese un telefono" name='telefono' />
                </Col>
            </Row>
 
            <div className="contenedor-boton mb-1 ">
                <Button as="input" type="submit" value="Cargar" size="lg"/>
            </div>
        </Form>

        
  )
}
