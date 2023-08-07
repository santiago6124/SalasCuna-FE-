import "./SelectRoom.css";
import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

import React, { useEffect, useState } from "react";

export function SelectRoom() {
    const [cribroom, setCribroom] = useState([]);

    useEffect(() =>{
        LoadCribrooms();
    });
    let LoadCribrooms = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/cribroom/');
            let jsonData = await response.json();
            console.log(jsonData);
            setCribroom(jsonData);

        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <Form className="conteiner-form-select">
            <h1 className="titulo-select">Editar Sala Cuna</h1>
            <div className="contenedor-linea-select">
                <hr className="linea-select"></hr>
            </div>
            <Row>
                <Col xs={9} className="conteiner-select"></Col>
                <Form.Group className="mb-3">
                    <Form.Label className="mb-1 mt-3">
                        Seleccionar Sala Cuna Que Desea Editar
                    </Form.Label>
                    <Form.Select placeholder="Seleccionar Sala Cuna" className="mb-1">
                        {cribroom.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.name}
                            </option>
                        ))}
                    </Form.Select>
                    <div className="contenedor-boton-select">
                        <Button className="button-select mt-4" boton variant="primary">
                            Confirmar
                        </Button>
                    </div>
                </Form.Group>
            </Row>
        </Form>
    );
}