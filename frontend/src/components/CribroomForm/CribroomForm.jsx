/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";

import "./CribroomForm.css";

import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import { generatePayload, renderformFieldsLocal  } from "../formUtils/formUtils";

import {
  cribroom_request,
  locality_request,
  neighborhood_request,
  shift_request,
  coManagement_request,
  sectional_request,
} from "../../api/salasCuna.api";

import {
  formFields
} from "../../api/salasCuna.formFields";
import { toastLoading, toastUpdateError, toastUpdateSuccess } from "../../utils/toastMsgs";

export function CribroomForm(props) {
  const [isDireccionVisible, setIsDireccionVisible] = useState(false);
  const [isTutorVisible, setIsTutorVisible] = useState(false);

  const [formFieldsLocal, setFormFieldsLocal] = useState({
    Cribroom: formFields.Cribroom,
  });

  const [formData, setFormData] = useState({
    Cribroom_is_active: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  let { authTokens } = useContext(AuthContext);

  useEffect(() => {
    getAll()

    if (props.data) {
      const newFormData = { ...formData };
  
      Object.entries(props.data).forEach(([key, value]) => {
        console.log(key);
        console.log(value);
        Object.entries(formFieldsLocal).forEach(([formFieldsLocal_key]) => {
          console.log(formFieldsLocal_key);

          newFormData[`Cribroom_${key}`] = value;
        });

      });
  
      setFormData(newFormData);
      console.log(newFormData);
    }
  }, [props.data]);



  async function handleSubmit(event) {
    event.preventDefault();

    const payload = generatePayload(formData);
    console.log('payload: ', payload);
    console.log('formData: ', formData);

    try {
        if (props.data) {
            
            console.log(props.data);
            let CribroomResponse = await cribroom_request(authTokens.access, 'put', 0, payload.Cribroom, props.data.id);
            console.log(CribroomResponse);

            if (CribroomResponse.request.status === 200) {
                console.log("Child edited successfully");
                window.location.reload();
            } else {
                console.log("Failed to edit child");
            }
        } else {
            let CribroomResponse = await cribroom_request(authTokens.access, 'post', 0, payload.Cribroom);
            console.log(CribroomResponse);

            if (CribroomResponse.request.status === 201) {
                console.log("Child added successfully");
                window.location.reload();
            } else {
                console.log("Failed to edit child");
            }
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
      const [
        localityResponse,
        neighborhoodResponse,
        shiftResponse,
        coManagementResponse,
        sectionalResponse
      ] = await Promise.all([
        locality_request(authTokens.access),
        shift_request(authTokens.access),
        neighborhood_request(authTokens.access),
        coManagement_request(authTokens.access),
        sectional_request(authTokens.access),
      ]);
  
      formFieldsLocal.Cribroom.locality.options = localityResponse.data;
      formData['Cribroom_locality'] = localityResponse.data[0].id;

      formFieldsLocal.Cribroom.shift.options = shiftResponse.data;
      formData['Cribroom_shift'] = shiftResponse.data[0].id;

      formFieldsLocal.Cribroom.neighborhood.options = neighborhoodResponse.data;
      formData['Cribroom_neighborhood'] = neighborhoodResponse.data[0].id;

      formFieldsLocal.Cribroom.co_management.options = coManagementResponse.data;
      formData['Cribroom_co_management'] = coManagementResponse.data[0].id;

      formFieldsLocal.Cribroom.sectional.options = sectionalResponse.data;
      formData['Cribroom_sectional'] = sectionalResponse.data[0].id;
  
      toastUpdateSuccess("Datos cargados", customId);
    } catch (error) {
      toastUpdateError("Error al cargar los Datos!", customId);
      console.error(error);
    }
  }
  

  return (
    <Modal
      {...props}
      size="md"
      className="mb-3 mt-3"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <div className="container-form-wrapper">
          <Form className="container-form" onSubmit={handleSubmit}>
            <h1 className="titulo">Añadir Sala Cuna</h1>

            <div className="container-linea">
              <hr className="linea" />
            </div>

            {renderformFieldsLocal(formFieldsLocal.Cribroom, 'Cribroom', formData, setFormData, handleInputChange)}

            <div className="container-boton-createuser mb-1 ">
              <Button as="input" type="submit" value="Cargar" size="lg" />
            </div>
          </Form>
        </div>
    </Modal>
  );
}