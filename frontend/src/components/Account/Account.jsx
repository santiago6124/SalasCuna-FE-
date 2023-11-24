import "./Account.css";
import { Row, Col, Form } from "react-bootstrap";
import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { toastLoading, toastUpdateError } from "../../utils/toastMsgs";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getAllGroup } from "../../api/salasCuna.api";

export default function ProfilePage() {
  const [datos, setDatos] = useState();
  let { user, authTokens } = useContext(AuthContext);
  const customId = useRef(null);
  const [groupName, setGroupName] = useState();

  useEffect(() => {
    LoadUser();
  }, []);

  async function getGroups() {
    const responseGroup = await getAllGroup(authTokens.access);
    const GroupData = await responseGroup.data;
    return GroupData;
  }

  async function getUser(grupos) {
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
      const matchingGroup = grupos.find(
        (group) => group.id === data.groups[0]
      );
      if (matchingGroup){
        data.group = matchingGroup.name;
      }
      return data;
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  async function LoadUser() {
    try {
      toastLoading("Cargando perfil", customId);
      getUser(await getGroups())
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
                  {datos?.group}
                </Form.Label>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </body>
  );
}
