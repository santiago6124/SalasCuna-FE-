import React from 'react'
import './TechnicalReport.css';

import Col from 'react-bootstrap/Col/';
import Row from 'react-bootstrap/Row/';
import Form from 'react-bootstrap/Form/';
import Button from 'react-bootstrap/Button/';
import Table from 'react-bootstrap/Table/';
import InputGroup from 'react-bootstrap/InputGroup/';


export function TechnicalReport() {
  return (
    <div className='container-report mt-5'>
        <div className='container-titulo-report '>
            <h1>Informe Tecnico</h1>
        </div>
        <div className='contenedor-linea-report'>
            <hr className='linea-report' ></hr>
        </div>
        <Row className="mb-3">
            <Col>
                <div className='input-select'>
                    <Form.Select placeholder="Seleccionar Sala Cuna" className="mb-1">
                        <option></option>
                        <option value="Capital">Capital</option>
                        <option value="Interior">Interior</option>
                    </Form.Select>
                </div>  
            </Col>
            <Col>
                <div className='container-botones-report'>
                    <div className='btn-1-report'>
                        <Button>PDF</Button>
                    </div>
                    <div className='btn-2'>
                        <Button>Excel</Button>
                    </div>
                </div>
            </Col>
        </Row>

        <div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre Sala</th>
                        <th>CUIT</th>
                        <th>Entidad</th>
                        <th>Cantidad de Niños</th>
                        <th>Seleccionar <InputGroup.Checkbox className="btn-selectall" aria-label="Checkbox for following text input" /></th>
                    </tr>
                </thead>
                <tbody className='tabla-report'>
                    <tr>
                        <td>01</td>
                        <td>teclitas</td>
                        <td>2243</td>
                        <td>RRHH</td>
                        <td>5</td>
                        <td><InputGroup.Checkbox /></td>
                    </tr>
                </tbody>
            </Table>
        </div>

    </div>
  )
}



