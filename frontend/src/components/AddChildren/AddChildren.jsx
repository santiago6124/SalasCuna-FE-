import '../styles/styles.css';
import '../AddChildren/AddChildren.css';

import Col from 'react-bootstrap/Col/';
import Row from 'react-bootstrap/Row/';
import Form from 'react-bootstrap/Form/';

import { FaQrcode } from 'react-icons/fa';


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
        <div className='contenedor-boton-qr '>
            <Button className='boton-qr mt-3' boton variant="primary">
                <FaQrcode />
            </Button>
        </div>
    </Form>
);
}