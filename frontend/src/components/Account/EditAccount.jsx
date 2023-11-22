import "./Account.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { toastLoading, toastUpdateError } from "../../utils/toastMsgs";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

export default function EditAccount() {
  const [datos, setDatos] = useState();
  let { user, authTokens } = useContext(AuthContext);
  const customId = useRef(null);

  useEffect(() => {
    LoadUser();
  }, []);

  async function getUser() {
    try {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "JWT " + authTokens.access,
        Accept: "application/json",
      };
      const response = await axios.get(`/auth/users/${user.user_id}/`, {
        headers: headers,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  async function LoadUser() {
    try {
      toastLoading("Cargando perfil", customId);
      getUser()
        .then((data) => {
          setDatos(data);
        })
        .finally(toast.dismiss(customId.current));
    } catch (error) {
      toastUpdateError("Error al cargar", customId);
    }
  }

  return (
    <body>
      <ToastContainer />
      <Form>
        <Row className="d-flex mt-3">
          <Col className="">
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                defaultValue={datos?.first_name}
              />
            </Form.Group>
          </Col>
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido"
                defaultValue={datos?.last_name}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-3">
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Form.Label>Ciudad:</Form.Label>
              <Form.Control
                type="text"
                placeholder="12345678"
                defaultValue={datos?.city}
              />
            </Form.Group>
          </Col>
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Form.Label>Departamento:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Departamento"
                defaultValue={datos?.department}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-3 mb-4">
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@gmail.com"
                defaultValue={datos?.address}
              />
            </Form.Group>
          </Col>
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Form.Label>Telefono:</Form.Label>
              <Form.Control
                type="text"
                placeholder="54 9 351 123 4567"
                defaultValue={datos?.phone_number}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-3 mb-4">
          <Col className="justify-content-center d-flex">
            <Button className="m-2">Guardar Cambios</Button>
            <Button className="m-2" variant="danger">Cancelar</Button>
          </Col>
        </Row>
      </Form>
    </body>
  );
}
