import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";

import "./ChildForm.css";

import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

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
} from "../../api/salasCuna.api";

import { formFields } from "../../api/salasCuna.formFields";
import {
  toastLoading,
  toastUpdateError,
  toastUpdateSuccess,
} from "../../utils/toastMsgs";

export function ChildForm(props) {
  const [currentStep, setCurrentStep] = useState(1);

  const [formFieldsLocal, setFormFieldsLocal] = useState({
    Child: formFields.Child,
    Guardian: formFields.Guardian,
    Phone: formFields.Phone,
  });

  const [formData, setFormData] = useState({
    Child_is_active: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  let { authTokens } = useContext(AuthContext);

  useEffect(() => {
    getAll();

    if (props.data) {
      const newFormData = { ...formData };

      Object.entries(props.data).forEach(([key, value]) => {
        console.log(key);
        console.log(value);
        Object.entries(formFieldsLocal).forEach(([formFieldsLocal_key]) => {
          console.log(formFieldsLocal_key);

          if (`${formFieldsLocal_key}`.toLowerCase() === key) {
            Object.entries(value).forEach(([key_2, value_2]) => {
              newFormData[`${formFieldsLocal_key}_${key_2}`] = value_2;
            });
          } else {
            newFormData[`Child_${key}`] = value;
          }
        });
      });

      setFormData(newFormData);
      console.log(newFormData);
    }
  }, [props.data]);

  const handleTutorSubmit = async (event) => {};

  const handleDireccionSubmit = async (event) => {
    // Handle direccion form submission logic here
    // You can reuse the existing logic or modify it as needed
  };

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

  async function getAll() {
    try {
      toastLoading("Cargando los Datos", customId);
      const [
        localityResponse,
        idenTypeResponse,
        genderResponse,
        cribroomResponse,
        shiftResponse,
        neighborhoodResponse,
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
      ]);

      formFieldsLocal.Child.locality.options = localityResponse.data;
      formData["Child_locality"] = localityResponse.data[0].id;
      formFieldsLocal.Child.ident_type.options = idenTypeResponse.data;
      formFieldsLocal.Guardian.ident_type.options = idenTypeResponse.data;
      formData["Guardian_ident_type"] = idenTypeResponse.data[0].id;
      formData["Child_ident_type"] = idenTypeResponse.data[0].id;
      formFieldsLocal.Child.gender.options = genderResponse.data;
      formData["Child_gender"] = genderResponse.data[0].id;
      formFieldsLocal.Child.cribroom.options = cribroomResponse.data;
      formData["Child_cribroom"] = cribroomResponse.data[0].id;
      formFieldsLocal.Child.shift.options = shiftResponse.data;
      formData["Child_shift"] = shiftResponse.data[0].id;
      formFieldsLocal.Child.neighborhood.options = neighborhoodResponse.data;
      formData["Child_neighborhood"] = neighborhoodResponse.data[0].id;
      formFieldsLocal.Guardian.guardian_Type.options =
        guardianTypeResponse.data;
      formData["Guardian_guardian_Type"] = guardianTypeResponse.data[0].id;
      formFieldsLocal.Phone.phone_Feature.options = phoneFeatureResponse.data;
      formData["Phone_phone_Feature"] = phoneFeatureResponse.data[0].id;

      toastUpdateSuccess("Datos cargados", customId);
    } catch (error) {
      toastUpdateError("Error al cargar los Datos!", customId);
      console.error(error);
    }
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = ["Step 1", "Step 2", "Step 3"];
  return (
    <Modal
      {...props}
      size="sm"
      className="mb-3 mt-3 justify-content-center d-flex modal-container "
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <body className="body-ac">
        <div className="container-form-wrapper">
          <Form
            className="conteiner-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (currentStep === 1) {
                nextStep();
              } else if (currentStep === 2) {
                handleTutorSubmit(event);
              } else if (currentStep === 3) {
                handleDireccionSubmit(event);
              }
            }}
          >
            {/* Step 1 */}
            <>
              {currentStep === 1 && (
                <>
                  <h1 className="titulo">Añadir Niños/as</h1>

                  <div className="contenedor-linea">
                    <hr className="linea" />
                  </div>
                  {renderformFieldsLocal(
                    formFieldsLocal.Child,
                    "Child",
                    formData,
                    setFormData,
                    handleInputChange
                  )}
                  <div className="contenedor-boton mb-1">
                    <Button
                      type="button"
                      onClick={nextStep}
                      size="lg"
                      className="m-2 mt-3"
                    >
                      Siguiente
                    </Button>
                  </div>
                </>
              )}
            </>

            {/* Step 2 */}
            {currentStep === 2 && (
              <>
                <h1 className="titulo">Añadir Padre/Madre</h1>

                <div className="contenedor-linea">
                  <hr className="linea" />
                </div>
                {renderformFieldsLocal(
                  formFieldsLocal.Guardian,
                  "Guardian",
                  formData,
                  setFormData,
                  handleInputChange
                )}
                <div className="contenedor-boton mb-1">
                  <Button
                    type="button"
                    onClick={prevStep}
                    size="lg"
                    className="m-2 mt-3"
                  >
                    Atrás
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    size="lg"
                    className="m-2 mt-3"
                  >
                    Siguiente
                  </Button>
                </div>
              </>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <>
                <h1 className="titulo">Añadir Telefono/s</h1>

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
                <div className="contenedor-boton mb-1">
                  <Button
                    type="button"
                    onClick={prevStep}
                    size="lg"
                    className="m-2 mt-3"
                  >
                    Atrás
                  </Button>
                  <Button
                    as="input"
                    type="submit"
                    value="Cargar"
                    size="lg"
                    className="m-2 mt-3"
                  />
                </div>
              </>
            )}
            <Stepper
              className="mb-3 p-2"
              activeStep={currentStep - 1}
              alternativeLabel
            >
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Form>
        </div>
      </body>
    </Modal>
  );
}
