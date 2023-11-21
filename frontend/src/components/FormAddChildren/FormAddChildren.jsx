import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

import "./FormAddChildren.css";

import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
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
  guardian_request,
  phone_request,
  child_request,
} from "../../api/salasCuna.api";

import {
  formFields
} from "../../api/salasCuna.formFields";

import {
  modelFields
} from "../../api/salasCuna.modelFields";

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
    Child_is_active: false
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

  const renderformFieldsLocal = (fields, prefix) => {
    return Object.keys(fields).map((fieldName) => {
      const field = fields[fieldName];
  
      return (
        <Form.Group className="mb-3" key={`${prefix}_${field.name}`}>
          <Form.Label className="mb-1">{field.label}</Form.Label>
          {field.type === "select" ? (
            <select
              name={`${prefix}_${field.name}`}
              value={formData[field.name]} // Cambiado aquí
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
              label={`${prefix}_${field.label}`}
              name={`${prefix}_${field.name}`}
              checked={formData[`${prefix}_${field.name}`]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [`${prefix}_${field.name}`]: e.target.checked,
                })
              }
              required={field.required}
            />
          ) : (
            <Form.Control
              type={field.type}
              placeholder={`Ingrese ${field.label.toLowerCase()}`}
              name={`${prefix}_${field.name}`}
              value={formData[`${prefix}_${field.name}`]}
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

    const payload = {};
    // Iterar sobre las claves de formData para construir el payload
    Object.keys(formData).forEach((key) => {
      // Dividir la clave usando '_' para obtener el prefijo y el nombre del campo
      const [prefix, ...rest] = key.split('_');
      const fieldName = rest.join('_');  // Reconstruir el nombre del campo

      // Verificar si el prefijo existe en el payload, si no, inicializarlo como un objeto vacío
      if (!payload[prefix]) {
        payload[prefix] = {};
      }

      // Asignar el valor al campo correspondiente en el payload
      payload[prefix][fieldName] = formData[key];
    });
    console.log('payload: ', payload);

    try {
      let GuardianResponse = await guardian_request(authTokens.access, 'post', 0, payload.Guardian);
      console.log(GuardianResponse);

      payload.Phone['guardian'] = GuardianResponse.data.id;
      let PhoneResponse = await phone_request(authTokens.access, 'post', 0, payload.Phone);
      console.log(PhoneResponse);

      payload.Child['guardian'] = GuardianResponse.data.id;
      let ChildResponse = await child_request(authTokens.access, 'post', 0, payload.Child);
      console.log(ChildResponse);
     
      if (ChildResponse.request.status === 201) {
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
      formData['Guardian_ident_type'] = response.data[0].id;
      formData['Child_ident_type'] = response.data[0].id;

    } catch (error) {
      console.error("Error fetching generos:", error);
    }
  };


  const GenderList = async () => {
    try {
      const response = await gender_request(authTokens.access);
      setGender(response.data);
      formFieldsLocal.Child.gender.options = response.data;
      formData['Child_gender'] = response.data[0].id;


    } catch (error) {
      console.error("Error fetching generos:", error);
    }
  };

  async function CribroomList() {
    try {
      const response = await cribroom_request(authTokens.access);
      setCribroom(response.data);
      formFieldsLocal.Child.cribroom.options = response.data;
      formData['Child_cribroom'] = response.data[0].id;

    } catch (error) {
      console.log("Error fetching Salas Cunas:", error);
    }
  }

  async function ShiftList() {
    try {
      const response = await shift_request(authTokens.access);
      setShift(response.data);
      formFieldsLocal.Child.shift.options = response.data;
      formData['Child_shift'] = response.data[0].id;

    } catch (error) {
      console.log("Error fetching Turnos:", error);
    }
  }

  async function LocalityList() {
    try {
      const response = await locality_request(authTokens.access);
      setLocality(response.data);
      formFieldsLocal.Child.locality.options = response.data;
      formData['Child_locality'] = response.data[0].id;

    } catch (error) {
      console.error("Error fetching localidad:", error);
    }
  }

  async function NeighborhoodList() {
    try {
      const response = await neighborhood_request(authTokens.access);
      setNeighborhood(response.data);
      formFieldsLocal.Child.neighborhood.options = response.data;
      formData['Child_neighborhood'] = response.data[0].id;

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
      formData['Guardian_guardian_Type'] = response.data[0].id;

    } catch (error) {
      console.error("Error fetching estados:", error);
    }
  };

  const PhoneFeatureList = async () => {
    try {
      const response = await phoneFeature_request(authTokens.access);
      setPhoneFeature(response.data);
      formFieldsLocal.Phone.phone_Feature.options = response.data;
      formData['Phone_phone_Feature'] = response.data[0].id;

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

          {renderformFieldsLocal(formFieldsLocal.Child, 'Child')}

          <div className="toggle-button" onClick={() => toggleTutor()}>
            {isTutorVisible ? "Ocultar Añadir tutor" : "Mostrar Añadir tutor"}
          </div>

          {isTutorVisible && renderformFieldsLocal(formFieldsLocal.Guardian, 'Guardian')}

          <div className="toggle-button" onClick={() => toggleDireccion()}>
            {isDireccionVisible ? "Ocultar Direccion" : "Mostrar Direccion"}
          </div>

          {isDireccionVisible && renderformFieldsLocal(formFieldsLocal.Phone, 'Phone')}

          <div className="contenedor-boton mb-1 ">
            <Button as="input" type="submit" value="Cargar" size="lg" />
          </div>
        </Form>
      </div>
    </body>
  </Modal>
  );
}
