import React from "react";
import "./GeneratePadron.css";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import Button from "react-bootstrap/Button/";
import Table from "react-bootstrap/Table/";

//import InputGroup from "react-bootstrap/InputGroup/";

export function GeneratePadron() {
    return (
        <div className="container-note mt-5">
            <div className="container-titulo-note ">
                <h1>Generar Padron</h1>
            </div>
            <div className="contenedor-linea-note">
                <hr className="linea-note"></hr>
            </div>
            <Row className="mb-3">
                <Col>
                    <div className="input-select">
                        <Form.Select placeholder="Seleccionar Sala Cuna" className="mb-1">
                            <option></option>
                            <option value="Capital">Capital</option>
                            <option value="Interior">Interior</option>
                        </Form.Select>
                    </div>
                </Col>
                <Col>
                    <div className="container-botones-padron">
                        <div className="btn-pdf">
                            <Button>PDF</Button>
                        </div>
                        <div className="btn-excel">
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
                        <th>Sala Cuna</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>N° DNI</th>
                        <th> Fecha de Nacimiento</th>
                        <th>Edad</th>
                        <th>Sexo</th>
                        <th>Calle</th>
                        <th>Numero Calle</th>
                        <th>Depar- tamento</th>
                        <th>Localidad</th>
                        <th>Car. Tel.</th>
                        <th>Telefono</th>
                        <th>Apellido Nombre Tutor</th>
                        <th>DNI Tutor</th>
                        <th>Turno</th>
                        <th>Estado</th>
                        <th>Seleccionar</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                        <td>ok</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
