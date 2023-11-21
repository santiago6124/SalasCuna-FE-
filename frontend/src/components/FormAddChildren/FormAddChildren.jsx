import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

import "./FormAddChildren.css";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  cribroom_request,
  gender_request,
  guardianType_request,
  locality_request,
  neighborhood_request,
  phoneFeature_request,
  shift_request,
  idenType_request,
} from "../../api/salasCuna.api";

import {
  formFields
} from "../../api/salasCuna.formFields";

export function FormAddChildren(props) {

  const [guardianTypes, setGuardianType] = useState([]);

  const [identTypes, setIdentType] = useState([]);
  const [genders, setGender] = useState([]);
  const [cribrooms, setCribroom] = useState([]);
  const [shifts, setShift] = useState([]);
  const [localities, setLocality] = useState([]);
  const [neighborhoods, setNeighborhood] = useState([]);

  const [phoneFeatures, setPhoneFeature] = useState([]);

  const [isDireccionVisible, setIsDireccionVisible] = useState(false);
  const [isTutorVisible, setIsTutorVisible] = useState(false);

  console.log('formFields: ', formFields);

  const [formFieldsLocal, setFormFieldsLocal] = useState({
    Child: formFields.Child,
    Guardian: formFields.Guardian,
    Phone: formFields.Phone,
  });

  const [formData, setFormData] = useState({
    // nombreChild: "Facundo",
    // apellidoChild: "Oliva Marchetto",
    // dniChild: 460327608,
    // fechaNacimientoChild: "2004-10-29",
    // fechaBaja: "2004-10-29",
    // fechaAlta: "2006-10-29",
    // nombreGuardian: "Lucas",
    // apellidoGuardian: "Oliva",
    // dniGuardian: 241191000,
    // telefono: 3534441111,
    // calle: 'la calle de mi casa',
    // numero_casa: 37,
    is_active: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  let {authTokens} = useContext(AuthContext);

  const toggleDireccion = () => {
    setIsDireccionVisible(!isDireccionVisible);
  };

  const toggleTutor = () => {
    setIsTutorVisible(!isTutorVisible);
  };

  useEffect(() => {
    LocalityList();
    NeighborhoodList();
    GenderList();
    CribroomList();
    ShiftList();
    IdentTypetList();
    GuardianTypeList();
    PhoneFeatureList();

    getChildren();
  }, []);

  const renderformFieldsLocal = (fields) => {
    return Object.keys(fields).map((fieldName) => {
      const field = fields[fieldName];
  
      return (
        <Form.Group className="mb-3" key={field.name}>
          <Form.Label className="mb-1">{field.label}</Form.Label>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              className="form-control"
              required={field.required}
            >
              {field.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option[Object.keys(option)[1]]}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <Form.Check
              type="checkbox"
              label={field.label}
              name={field.name}
              checked={formData[field.name]}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked })}
              required={field.required}
            />
          ) : (
            <Form.Control
              type={field.type}
              placeholder={`Ingrese ${field.label.toLowerCase()}`}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              required={field.required}
            />
          )}
        </Form.Group>
      );
    });
  };

  async function getChildren() {
    let response = await cribroom_request(authTokens.access);
    let data = await response.data;
    console.log(data);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const guardianPayload = {
      first_name: formData.get("nombreGuardian"),
      last_name: formData.get("apellidoGuardian"),
      dni: formData.get("dniGuardian"),
      guardian_phone_number: formData.get("telefono"),
      guardian_phone_Feature: formData.get("phoneFeature"),
      guardian_Type: formData.get("guardianType"),
      gender: formData.get("generoGuardian"),
    };

    try {
      let responseG = await axios.post('/api/GuardianListCreateView/', guardianPayload, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          "Authorization": "JWT " + authTokens.access
        },
      });

      let us = await axios.get("/api/GuardianListCreateView/", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "JWT " + authTokens.access,
            "Accept": "application/json"
          }
      })
      var userId = us.data.length+11;
      var userId = us.data[us.data.length-1].id;
      console.log(userId);

      const payload = {
        first_name: formData.get("nombreChild"),
        last_name: formData.get("apellidoChild"),
        dni: formData.get("dniChild"),
        age: formData.get("edadChild"),
        birthdate: formData.get("fechaNacimientoChild"),
        house_number: formData.get("numero_casa"),
        registration_date: formData.get("fechaAlta"),
        disenroll_date: formData.get("fechaBaja")
          ? formData.get("fechaBaja")
          : null,
        locality: formData.get("locality"),
        gender: formData.get("generoChild"),
        cribroom: formData.get("salacuna"),
        shift: formData.get("turno"),
        neighborhood: formData.get("neighborhood"),
        street: formData.get("calle"),
        guardian_first_name: formData.get("nombreGuardian"),
        guardian_last_name: formData.get("apellidoGuardian"),
        guardian_dni: formData.get("dniGuardian"),
        guardian_phone_number: formData.get("telefono"),
        guardian_phone_Feature: formData.get("phoneFeature"),
        guardian_guardian_Type_id: formData.get("guardianType"),
        guardian_gender_id: formData.get("generoGuardian"),
        guardian: userId,
      };

      let response = await axios.post(`/api/child/?no_depth`, payload, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          "Authorization": "JWT " + authTokens.access
        },
      });
      if (response.request.status === 201) {
        console.log("Child edited successfully");
        window.location.reload();
      } else {
        console.log("Failed to edit child");
      }
    } catch (err) {
      alert(":c");
      console.log(err);
    }
  }

  const IdentTypetList = async () => {
    try {
      const response = await idenType_request(authTokens.access);
      setIdentType(response.data);
      formFieldsLocal.Child.ident_type.options = response.data;
      formFieldsLocal.Guardian.ident_type.options = response.data;

    } catch (error) {
      console.error("Error fetching generos:", error);
    }
  };


  const GenderList = async () => {
    try {
      const response = await gender_request(authTokens.access);
      setGender(response.data);
      formFieldsLocal.Child.gender.options = response.data;

    } catch (error) {
      console.error("Error fetching generos:", error);
    }
  };

  async function CribroomList() {
    try {
      const response = await cribroom_request(authTokens.access);
      setCribroom(response.data);
      formFieldsLocal.Child.cribroom.options = response.data;
    } catch (error) {
      console.log("Error fetching Salas Cunas:", error);
    }
  }

  async function ShiftList() {
    try {
      const response = await shift_request(authTokens.access);
      setShift(response.data);
      formFieldsLocal.Child.shift.options = response.data;
    } catch (error) {
      console.log("Error fetching Turnos:", error);
    }
  }

  async function LocalityList() {
    try {
      const response = await locality_request(authTokens.access);
      setLocality(response.data);
      formFieldsLocal.Child.locality.options = response.data;
    } catch (error) {
      console.error("Error fetching localidad:", error);
    }
  }

  async function NeighborhoodList() {
    try {
      const response = await neighborhood_request(authTokens.access);
      setNeighborhood(response.data);
      formFieldsLocal.Child.neighborhood.options = response.data;
    } catch (error) {
      console.error("Error fetching barrio:", error);
    }
  }

  const navigate = useNavigate();

  const GuardianTypeList = async () => {
    try {
      const response = await guardianType_request(authTokens.access);
      setGuardianType(response.data);
      formFieldsLocal.Guardian.guardian_Type.options = response.data;
    } catch (error) {
      console.error("Error fetching estados:", error);
    }
  };

  const PhoneFeatureList = async () => {
    try {
      const response = await phoneFeature_request(authTokens.access);
      setPhoneFeature(response.data);
      formFieldsLocal.Phone.phone_Feature.options = response.data;
    } catch (error) {
      console.error("Error fetching estados:", error);
    }
  };


  return (
    <Modal
      {...props}
      size="sm"
      className="mb-3 mt-3"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <body className="body-ac">
      <div className="container-form-wrapper">
        <Form className="conteiner-form" onSubmit={handleSubmit}>
          <h1 className="titulo">Añadir Niños/as</h1>

          <div className="contenedor-linea">
            <hr className="linea" />
          </div>

          {renderformFieldsLocal(formFieldsLocal.Child)}

          <div className="toggle-button" onClick={() => toggleTutor()}>
            {isTutorVisible ? "Ocultar Añadir tutor" : "Mostrar Añadir tutor"}
          </div>

          {isTutorVisible && renderformFieldsLocal(formFieldsLocal.Guardian)}

          <div className="toggle-button" onClick={() => toggleDireccion()}>
            {isDireccionVisible ? "Ocultar Direccion" : "Mostrar Direccion"}
          </div>

          {isDireccionVisible && renderformFieldsLocal(formFieldsLocal.Phone)}

          <div className="contenedor-boton mb-1 ">
            <Button as="input" type="submit" value="Cargar" size="lg" />
          </div>
        </Form>
      </div>
    </body>
  </Modal>
  );
}
