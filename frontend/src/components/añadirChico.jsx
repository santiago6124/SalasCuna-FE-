import '../styles/añadirChico.css';

import Col from 'react-bootstrap/Col/';
import Row from 'react-bootstrap/Row/';
import Button from 'react-bootstrap/Button/';
import Form from 'react-bootstrap/Form/';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';


export function AñadirChico() {
  return (
    <Form className='conteiner-form'>
        <h1 className='titulo'>Añadir Niños/as</h1>
        
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

                <Row className="mb-3">
                    <Col>
                        <Form.Label className='mb-1'>Tutor</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Col>
                    <Col>
                        <Form.Label className='mb-1'>Genero</Form.Label>
                        <Form.Control type="text" placeholder="" />
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