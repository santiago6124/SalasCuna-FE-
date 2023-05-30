import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FaQrcode } from 'react-icons/fa';

export function AñadirDomicilio() {
  return (
    <Form className='conteiner-form'>
        <h1 className='titulo'>Añadir Domicilio</h1>
        
        <div className='contenedor-linea'>
            <hr className='linea' ></hr>
        </div>

        <Row className="mb-3">
            <Col>
                <Form.Label className='mb-1'>Calle</Form.Label>
                <Form.Control type="text" placeholder="Ingrese una calle" />
            </Col>
            <Col>
                <Form.Label className='mb-1'>Numero</Form.Label>
                <Form.Control type="number" placeholder="Ingrese un numero" />
            </Col>    
        </Row>

        <Form.Group className="mb-3" >
            <Form.Label className='mb-1'>Barrio</Form.Label>
            <Form.Control type="text" placeholder="Ingrese un barrio" />
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label className='mb-1'>Localidad</Form.Label>
            <Form.Control type="text" placeholder="Ingrese un Localidad" />
        </Form.Group>

        <Row className="mb-3">
            <Col>
                <Form.Label className='mb-1'>Departamento</Form.Label>
                <Form.Control type="text" placeholder="Ingrese una calle" />
            </Col>
            <Col>
                <Form.Label className='mb-1'>Telefono</Form.Label>
                <Form.Control type="number" placeholder="Ingrese un telefono" />
            </Col>    
        </Row>


    </Form>
  );
}
