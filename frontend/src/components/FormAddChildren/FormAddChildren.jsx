import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";

import "./FormAddChildren.css";

import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

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
import { toastLoading, toastUpdateError, toastUpdateSuccess } from "../../utils/toastMsgs";

export function FormAddChildren(props) {
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

  let { authTokens } = useContext(AuthContext);

  const toggleDireccion = () => {
    setIsDireccionVisible(!isDireccionVisible);
  };

  const toggleTutor = () => {
    setIsTutorVisible(!isTutorVisible);
  };

  useEffect(() => {
    getAll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderformFieldsLocal(fields, prefix) {
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
              onChange={(e) => setFormData({
                ...formData,
                [`${prefix}_${field.name}`]: e.target.checked,
              })}
              required={field.required} />
          ) : (
            <Form.Control
              type={field.type}
              placeholder={`Ingrese ${field.label.toLowerCase()}`}
              name={`${prefix}_${field.name}`}
              value={formData[`${prefix}_${field.name}`]}
              onChange={handleInputChange}
              required={field.required} />
          )}
        </Form.Group>
      );
    });
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

  const customId = useRef(null);

  async function getAll() {
    try {
      toastLoading("Cargando los Datos", customId);
      const Promesas = Promise.all([
        locality_request(authTokens.access),
        idenType_request(authTokens.access),
        gender_request(authTokens.access),
        cribroom_request(authTokens.access),
        shift_request(authTokens.access),
        neighborhood_request(authTokens.access),
        guardianType_request(authTokens.access),
        phoneFeature_request(authTokens.access)]);
      formFieldsLocal.Child.locality.options = Promesas[0].data;
      formData['Child_locality'] = Promesas[0].data[0].id;
      formFieldsLocal.Child.ident_type.options = Promesas[1].data;
      formFieldsLocal.Guardian.ident_type.options = Promesas[1].data;
      formData['Guardian_ident_type'] = Promesas[1].data[0].id;
      formData['Child_ident_type'] = Promesas[1].data[0].id;
      formFieldsLocal.Child.gender.options = Promesas[2].data;
      formData['Child_gender'] = Promesas[2].data[0].id;
      formFieldsLocal.Child.cribroom.options = Promesas[3].data;
      formData['Child_cribroom'] = Promesas[3].data[0].id;
      formFieldsLocal.Child.shift.options = Promesas[4].data;
      formData['Child_shift'] = Promesas[4].data[0].id;
      formFieldsLocal.Child.neighborhood.options = Promesas[5].data;
      formData['Child_neighborhood'] = Promesas[5].data[0].id;
      formFieldsLocal.Guardian.guardian_Type.options = Promesas[6].data;
      formData['Guardian_guardian_Type'] = Promesas[6].data[0].id;
      formFieldsLocal.Phone.phone_Feature.options = Promesas[7].data;
      formData['Phone_phone_Feature'] = Promesas[7].data[0].id;

      toastUpdateSuccess("Datos cargados", customId);
    } catch (error) {
      toastUpdateError("Error al cargar los Datos!", customId);
    }
  }

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
