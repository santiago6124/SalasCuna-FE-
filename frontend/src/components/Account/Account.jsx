import "./Account.css";
import {Row, Col, Container, Form} from "react-bootstrap";

export default function ProfilePage() {
    return (
        <Form>
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col className="justify-content-center text-center">
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre"/>
                        </Form.Group>
                    </Col>
                    <Col className="justify-content-center text-center">
                    <Form.Group>
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" placeholder="Apellido"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col className="justify-content-center text-center">
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="example@gmail.com"/>
                        </Form.Group>
                    </Col>
                    <Col className="justify-content-center text-center">
                    <Form.Group>
                            <Form.Label>DNI</Form.Label>
                            <Form.Control type="text" placeholder="12345678"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col className="justify-content-center text-center">
                        <Form.Group>
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="text" placeholder="54 9 351 123 4567"/>
                        </Form.Group>
                    </Col>
                    <Col className="justify-content-center text-center">
                    <Form.Group>
                            <Form.Label>Rol</Form.Label>
                            <Form.Control type="text" placeholder="Rol"/>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}