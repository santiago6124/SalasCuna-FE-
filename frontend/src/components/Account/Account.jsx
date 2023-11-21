import "./Account.css";
import { Row, Col, Form } from "react-bootstrap";
import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { toastLoading, toastUpdateError } from "../../utils/toastMsgs";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

export default function ProfilePage() {
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
        <Row className="d-flex mt-3 mb-3">
          <Col className="">
            <Form.Group>
              <Row>
                <Form.Label>Nombre:</Form.Label>
              </Row>
              <Row>
                <Form.Label className="border border-black rounded p-2 m-2 w-75">
                  {datos?.first_name}
                </Form.Label>
              </Row>
            </Form.Group>
          </Col>
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Row>
                <Form.Label>Apellido: </Form.Label>
              </Row>
              <Row>
                <Form.Label className="border border-black rounded p-2 m-2 w-75">
                  {datos?.last_name}
                </Form.Label>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex mt-3 mb-3">
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Row>
                <Form.Label>Email: </Form.Label>
              </Row>
              <Row>
                <Form.Label className="border border-black rounded p-2 m-2 w-75">
                  {datos?.email}
                </Form.Label>
              </Row>
            </Form.Group>
          </Col>
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Row>
                <Form.Label>DNI: </Form.Label>
              </Row>
              <Row>
                <Form.Label className="border border-black rounded p-2 m-2 w-75">
                  {datos?.dni}
                </Form.Label>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex mt-3 mb-3">
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Row>
                <Form.Label>Telefono: </Form.Label>
              </Row>
              <Row>
                <Form.Label className="border border-black rounded p-2 m-2 w-75">
                  {datos?.phone_number}
                </Form.Label>
              </Row>
            </Form.Group>
          </Col>
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Row>
                <Form.Label>Rol: </Form.Label>
              </Row>
              <Row>
                <Form.Label className="border border-black rounded p-2 m-2 w-75">
                  {datos?.groups}
                </Form.Label>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </body>
  );
}
