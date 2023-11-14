import "./Account.css";
import { Row, Col, Form } from "react-bootstrap";
import React, {useContext, useEffect, useState, useRef} from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import {
    toastLoading,
    toastUpdateError,
  } from "../../utils/toastMsgs";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';


export default function ProfilePage() {
    const [userData, setUserData] = useState();

    let { user, authTokens } = useContext(AuthContext);
    const customId = useRef(null);

    useEffect(() => {
        LoadUser();
    }, []);

    async function getUser() {
        try {
            let headers = {
                "Content-Type": "application/json",
                "Authorization": "JWT " + authTokens.access,
                "Accept": "application/json",
            };
            const response = await axios.get(`/auth/users/${user.user_id}/`, {headers: headers});
            return response.data
        } catch (error) {
            console.error("Error fetching user data", error);
            return error
        }
    };

    async function LoadUser(){
        try {
            toastLoading("Cargando perfil", customId);
            setUserData(await getUser());
            toast.dismiss(customId.current);
            console.log(userData);
        } catch (error) {
            toastUpdateError("Error al cargar", customId);
        }
    }

  return (
    <body>
        <ToastContainer/>
        <Form>
      <Row className="d-flex justify-content-center mt-3">
        <Col className="justify-content-center text-center">
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Nombre" />
          </Form.Group>
        </Col>
        <Col className="justify-content-center text-center">
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" placeholder="Apellido" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-5">
        <Col className="justify-content-center text-center">
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="example@gmail.com" />
          </Form.Group>
        </Col>
        <Col className="justify-content-center text-center">
          <Form.Group>
            <Form.Label>DNI</Form.Label>
            <Form.Control type="text" placeholder="12345678" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-5 mb-4">
        <Col className="justify-content-center text-center">
          <Form.Group>
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="text" placeholder="54 9 351 123 4567" />
          </Form.Group>
        </Col>
        <Col className="justify-content-center text-center">
          <Form.Group>
            <Form.Label>Rol</Form.Label>
            <Form.Control type="text" placeholder="Rol" />
          </Form.Group>
        </Col>
      </Row>
    </Form>
    </body>
    
  );
}
