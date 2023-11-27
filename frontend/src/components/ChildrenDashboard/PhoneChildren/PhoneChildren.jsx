import React from "react";
import "../DeleteChildren/DeleteChildren.css";

import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";

import { child_request } from "../../../api/salasCuna.api";


export default function DeleteChildren(props) {
    const [selectedChild, setSelectedChild] = useState("");
    const [childName, setChildName] = useState("");
    const [childState, setChildState] = useState("");

    useEffect(() => {
        setSelectedChild(props.id);
        setChildName(props.name);
        setChildState(props.is_active);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleDelete(event) {
        event.preventDefault();
        console.log("chico: " + selectedChild);
        try {
            // const payload = { is_active: childState ? false : true};
            const payload = { is_active: false };

            console.log('payload: ', payload);
            console.log('selectedChild: ', selectedChild);

            const childReponse = await child_request(props.tokens, 'patch', 0, payload, selectedChild);
            console.log('childReponse: ', childReponse);

            props.onHide();
        } catch (err) {
            alert("Error al eliminar al chico/a", err);
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Telefonos de contacto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="name@example.com"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.onHide}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
