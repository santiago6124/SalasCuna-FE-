import React from 'react'

import Col from 'react-bootstrap/Col/';
import Row from 'react-bootstrap/Row/';
import Form from 'react-bootstrap/Form/';
import Button from 'react-bootstrap/Button/';
import Table from 'react-bootstrap/Table/';
import InputGroup from 'react-bootstrap/InputGroup/';

export function PaymentNote() {
  return (
    <div className='container-note'>
        <div className='container-titulo-note mt-5'>
            <h1>Nota de Pago</h1>
        </div>
        <div className='contenedor-note'>
            <hr className='linea-note' ></hr>
        </div>
        <Row className="mb-3">
            <Col>
                <Form.Select placeholder="Seleccionar Sala Cuna" className="mb-1">
                    <option></option>
                    <option value="Capital">Capital</option>
                    <option value="Interior">Interior</option>
                </Form.Select>
            </Col>
            <Col>
                <div>
                    <div>
                        <Button>PDF</Button>
                    </div>
                    <div>
                        <Button>Excel</Button>
                    </div>
                </div>
            </Col>
        </Row>

        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre Sala</th>
                        <th>CUIT</th>
                        <th>Entidad</th>
                        <th>Cantidad de Niños</th>
                        <th>Seleccionar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01</td>
                        <td>teclitas</td>
                        <td>2243</td>
                        <td>RRHH</td>
                        <td>5</td>
                        <td><InputGroup.Checkbox aria-label="Checkbox for following text input" /></td>
                    </tr>
                </tbody>
            </Table>
        </div>
        <div>
            <Button>Seleccionar Todo</Button>
        </div>

    </div>
  )
}

