/* eslint-disable react-hooks/exhaustive-deps */
import "./Account.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { toastLoading, toastUpdateError } from "../../utils/toastMsgs";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getAllDepartments } from "../../api/salasCuna.api";
import Cookies from "js-cookie";
import { updateData, warningData } from "../../utils/toastMsgs";

export default function EditAccount() {
  const [datos, setDatos] = useState();
  const [departmentOptions, setDepartmentOptions] = useState ();
  const [selectedDepartment, setSelectetDepartment] = useState();
  let { user, authTokens } = useContext(AuthContext);
  const customId = useRef(null);

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage(){
    LoadUser(await loadDepartment());
  }

  async function loadDepartment() {
    try {
      const response = await getAllDepartments(authTokens.access);
      const departments = await response.data;
      setDepartmentOptions(await departments);
      return departments;
    } catch (error) {
      console.error("Error fetching department options:", error);
    }
  }

  async function getUser(allDepartments) {
    try {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "JWT " + authTokens.access,
        Accept: "application/json",
      };
      const response = await axios.get(`/api/user/${user.user_id}/`, {
        headers: headers,
      });
      const data = await response.data;

      const matchingDepartment = allDepartments.find(
      (department) => department.id === data.department);
      if (matchingDepartment) {
        setSelectetDepartment(matchingDepartment.id);
      }
      return data;
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  async function LoadUser(departmentOptions) {
    try {
      toastLoading("Cargando perfil", customId);
      getUser(departmentOptions)
        .then((data) => {
          setDatos(data);
        })
        .finally(toast.dismiss(customId.current));
    } catch (error) {
      toastUpdateError("Error al cargar", customId);
    }
  }

  async function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      city: formData.get("city"),
      department: formData.get("department"),
      address: formData.get("address"),
      phone_number: formData.get("phone"),
    };
    const headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken' : Cookies.get('csrftoken'),
      "Authorization": "JWT " + authTokens.access,
    }
    try {
      let response = await axios.patch(`/api/user/${user.user_id}/`, payload, {headers:headers})
      if (response.request.status === 200) {
        updateData("Perfil actualizado con exito")
      } else {
        warningData("Error al actualizar el perfil");
      }
    } catch (error) {
      
    }
  }

  function handleDepartmentChange(event){
    setSelectetDepartment(event.target.value);
  }

  return (
    <body>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Row className="d-flex mt-3">
          <Col className="">
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                defaultValue={datos?.first_name}
                name="first_name"
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
                name="last_name"
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
                name="city"
              />
            </Form.Group>
          </Col>
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Form.Label>Departamento:</Form.Label>
              <Form.Select
                      name="department"
                      as="select"
                      value={selectedDepartment ?? datos?.department}
                      className="mb-1"
                      onChange={handleDepartmentChange}
                    >
                      {departmentOptions?.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.department}
                        </option>
                      ))}
                    </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-3 mb-4">
          <Col className="pl-1 mb-1 ">
            <Form.Group>
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                type="text"
                placeholder="example@gmail.com"
                defaultValue={datos?.address}
                name="address"
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
                name="phone"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-3 mb-4">
          <Col className="justify-content-center d-flex">
            <Button className="m-2" type="submit" >Guardar Cambios</Button>
          </Col>
        </Row>
      </Form>
    </body>
  );
}
