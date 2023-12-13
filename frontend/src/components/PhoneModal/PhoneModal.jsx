import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";

import Form from "react-bootstrap/Form/";
import { Modal } from "react-bootstrap";

import { generatePayload, renderformFieldsLocal } from "../formUtils/formUtils";

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
  question_request,
  answer_request,
  childAnswer_request,
} from "../../api/salasCuna.api";

import { formFields } from "../../api/salasCuna.formFields";
import {
  toastLoading,
  toastUpdateError,
  toastUpdateSuccess,
} from "../../utils/toastMsgs";

export function PhoneModal(props) {
  const [formFieldsLocal, setFormFieldsLocal] = useState({
    Child: formFields.Child,
    Guardian: formFields.Guardian,
    Phone: formFields.Phone,
  });

  let { authTokens } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    Child_is_active: true,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  // function to edit the child data
  async function handleSubmit(event) {
    event.preventDefault();

    const payload = generatePayload(formData);
    console.log("payload: ", payload);
    console.log("formData: ", formData);

    try {
      if (props.data) {
        let GuardianResponse = await guardian_request(
          authTokens.access,
          "put",
          0,
          payload.Guardian,
          props.data.guardian.id
        );
        console.log(GuardianResponse);

        payload.Child["guardian"] = GuardianResponse.data.id;
        let PhoneResponse = await phone_request(
          authTokens.access,
          "put",
          0,
          payload.Phone,
          props.data.id
        );

        payload.Child["guardian"] = GuardianResponse.data.id;
        let ChildResponse = await child_request(
          authTokens.access,
          "put",
          0,
          payload.Child,
          props.data.id
        );
        console.log(ChildResponse);

        if (ChildResponse.request.status === 200) {
          console.log("Child edited successfully");
          window.location.reload();
        } else {
          console.log("Failed to edit child");
        }
      } else {
        let GuardianResponse = await guardian_request(
          authTokens.access,
          "post",
          0,
          payload.Guardian
        );
        console.log(GuardianResponse);

        payload.Phone["guardian"] = GuardianResponse.data.id;
        let PhoneResponse = await phone_request(
          authTokens.access,
          "post",
          0,
          payload.Phone
        );
        console.log(PhoneResponse);

        payload.Child["guardian"] = GuardianResponse.data.id;
        let ChildResponse = await child_request(
          authTokens.access,
          "post",
          0,
          payload.Child
        );
        console.log(ChildResponse);

        if (ChildResponse.request.status === 201) {
          console.log("Child edited successfully");
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

  // function to get all the fields
  async function getAll() {
    try {
      toastLoading("Cargando los Datos", customId);
      const [
        idenTypeResponse,
        genderResponse,
        guardianTypeResponse,
        phoneFeatureResponse,
      ] = await Promise.all([
        locality_request(authTokens.access),
        idenType_request(authTokens.access),
        gender_request(authTokens.access),
        cribroom_request(authTokens.access),
        shift_request(authTokens.access),
        neighborhood_request(authTokens.access),
        guardianType_request(authTokens.access),
        phoneFeature_request(authTokens.access),
        question_request(authTokens.access),
        answer_request(authTokens.access),
      ]);
      // Child FormFields

      formFieldsLocal.Child.step_1.ident_type.options = idenTypeResponse.data;
      formData["Child_ident_type"] = idenTypeResponse.data[0].id;
      formFieldsLocal.Child.step_1.gender.options = genderResponse.data;
      formData["Child_gender"] = genderResponse.data[0].id;

      //Phone FormFields
      formFieldsLocal.Phone.phone_Feature.options = phoneFeatureResponse.data;
      formData["Phone_phone_Feature"] = phoneFeatureResponse.data[0].id;

      //Guardian FormFields
      formFieldsLocal.Guardian.ident_type.options = idenTypeResponse.data;
      formData["Guardian_ident_type"] = idenTypeResponse.data[0].id;
      formFieldsLocal.Guardian.guardian_Type.options =
        guardianTypeResponse.data;
      formData["Guardian_guardian_Type"] = guardianTypeResponse.data[0].id;

      toastUpdateSuccess("Datos cargados", customId);
    } catch (error) {
      toastUpdateError("Error al cargar los Datos!", customId);
      console.error(error);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Modal
      {...props}
      size="sm"
      className="mb-5 mt-3 justify-content-center d-flex modal-container "
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <body className="body-ac">
        <div className="container-form-wrapper">
          <Form className="conteiner-form" onSubmit={handleSubmit}>
            <>
              <h1 className="titulo">Telefono/s</h1>
              <div className="contenedor-linea">
                <hr className="linea" />
              </div>
              {renderformFieldsLocal(
                formFieldsLocal.Phone,
                "Phone",
                formData,
                setFormData,
                handleInputChange
              )}
            </>
          </Form>
        </div>
      </body>
    </Modal>
  );
}
