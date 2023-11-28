/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";

import "./PayoutForm.css";

import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import { generatePayload, renderformFieldsLocal  } from "../formUtils/formUtils";

import {
  payout_request,
  zone_request,
} from "../../api/salasCuna.api";

import {
  formFields
} from "../../api/salasCuna.formFields";
import { toastLoading, toastUpdateError, toastUpdateSuccess } from "../../utils/toastMsgs";

export function PayoutForm(props) {

  const [formFieldsLocal, setFormFieldsLocal] = useState({
    Payout: formFields.Payout,
  });

  const [formData, setFormData] = useState({
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  let { authTokens } = useContext(AuthContext);

  useEffect(() => {
    getAll()

    console.log(props);

    if (props.data) {
      const newFormData = { ...formData };
  
      Object.entries(props.data).forEach(([key, value]) => {
        console.log(key);
        console.log(value);
        Object.entries(formFieldsLocal).forEach(([formFieldsLocal_key]) => {
          console.log(formFieldsLocal_key);

          newFormData[`Payout_${key}`] = value;
        });

      });
  
      setFormData(newFormData);
      console.log(newFormData);
    }
  }, [props.data]);


    
  async function getAll() {
    try {
      toastLoading("Cargando los Datos", customId);
      const [
        zoneResponse,
      ] = await Promise.all([
        zone_request(authTokens.access),
      ]);
  
      formFieldsLocal.Payout.zone.options = zoneResponse.data;
      formData['Payout_zone'] = zoneResponse.data[0].id;

      toastUpdateSuccess("Datos cargados", customId);
    } catch (error) {
      toastUpdateError("Error al cargar los Datos!", customId);
      console.error(error);
    }
  }


  async function handleSubmit(event) {
    event.preventDefault();

    const payload = generatePayload(formData);
    console.log('payload: ', payload);
    console.log('formData: ', formData);

    try {
        if (props.data) {
            
            console.log(props.data);
            let PayoutResponse = await payout_request(authTokens.access, 'put', 0, payload.Payout, props.data.id);
            console.log(PayoutResponse);

            if (PayoutResponse.request.status === 200) {
                console.log("Child edited successfully");
                window.location.reload();
            } else {
                console.log("Failed to edit child");
            }
        } else {
            let PayoutResponse = await payout_request(authTokens.access, 'post', 0, payload.Payout);
            console.log(PayoutResponse);

            if (PayoutResponse.request.status === 201) {
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

  return (
    <Modal
      {...props}
      size="sm"
      className="mb-3 mt-3"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

        <div className="contenedor-form-wrapper-cb">
          <Form className="conteiner-form-cb" onSubmit={handleSubmit}>
            <h1 className="titulo-cb">Añadir Sala Cuna</h1>

            <div className="contenedor-linea-cb">
              <hr className="linea-cb" />
            </div>

            {renderformFieldsLocal(formFieldsLocal.Payout, 'Payout', formData, setFormData, handleInputChange)}

            <div className="contenedor-boton-createuser mb-1 ">
              <Button as="input" type="submit" value="Cargar" size="lg" />
            </div>
          </Form>
        </div>

    </Modal>
  );
}
