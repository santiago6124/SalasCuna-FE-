import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";

import "./UserForm.css";

import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";


import { generatePayload, renderformFieldsLocal  } from "../formUtils/formUtils";

import {
  user_request,
  department_request,
  getAllGroup,
} from "../../api/salasCuna.api";

import {
  formFields
} from "../../api/salasCuna.formFields";
import { toastLoading, toastUpdateError, toastUpdateSuccess } from "../../utils/toastMsgs";

export function UserForm(props) {
  const [isDireccionVisible, setIsDireccionVisible] = useState(false);
  const [isTutorVisible, setIsTutorVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formFieldsLocal, setFormFieldsLocal] = useState({
    User: formFields.User,
  });

  const [formData, setFormData] = useState({
    User_is_active: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'User_group' && value == 2) {
      console.log('sumar un step y actualizar renderizacion de steps');
    } else if (name === 'User_group' && value !== 2) {
      console.log('igualar step a 1 y actualizar renderizacion de steps');
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
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

          newFormData[`User_${key}`] = value;
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
            let UserResponse = await user_request(authTokens.access, 'put', 0, payload.User, props.data.id);
            console.log(UserResponse);

            if (UserResponse.request.status === 200) {
                console.log("Child edited successfully");
                window.location.reload();
            } else {
                console.log("Failed to edit child");
            }
        } else {
            let UserResponse = await user_request(authTokens.access, 'post', 0, payload.User);
            console.log(UserResponse);

            if (UserResponse.request.status === 201) {
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
        departmentResponse,
        groupResponse,
      ] = await Promise.all([
        department_request(authTokens.access),
        getAllGroup(authTokens.access),
      ]);
  
      formFieldsLocal.User.department.options = departmentResponse.data;
      formData['User_department'] = departmentResponse.data[0].id;

      formFieldsLocal.User.group.options = groupResponse.data;
      formData['User_group'] = groupResponse.data[0].id; 

      toastUpdateSuccess("Datos cargados", customId);
    } catch (error) {
      toastUpdateError("Error al cargar los Datos!", customId);
      console.error(error);
    }
  }
  
  var stepsInteger = 2;
  var showStep2 = true;

  return (
    <Modal
      {...props}
      size="sm"
      className=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <div className="container-form-wrapper">
          <Form className="container-form-signup" onSubmit={handleSubmit}>
            {/* Step 1 */}
            <>
              {currentStep === 1 && (
                <>
                  <h1 className="titulo">Añadir Sala Cuna</h1>

                  <div className="container-linea">
                    <hr className="linea" />
                  </div>

                  {renderformFieldsLocal(formFieldsLocal.User, 'User', formData, setFormData, handleInputChange)}

                  <div className="container-boton-createuser mb-1 ">
                  <Button
                    type={currentStep === stepsInteger ? 'submit' : 'button'}
                    onClick={currentStep === stepsInteger ? handleSubmit : nextStep}
                    size="lg"
                    className="m-2 mt-3"
                  >
                    {currentStep === stepsInteger ? 'Cargar' : 'Siguiente'}
                  </Button>
                  </div>
                </>
              )}
            </>

            {/* Step 1 */}
            <>
              {currentStep === 2 && (
                <>
                  <h1 className="titulo">Asignar Salas a Trabajador Social</h1>

                  <div className="container-linea">
                    <hr className="linea" />
                  </div>

                  {renderformFieldsLocal(formFieldsLocal.User, 'User', formData, setFormData, handleInputChange)}

                  <div className="container-boton-createuser mb-1 ">
                  <Button
                    type="button"
                    onClick={prevStep}
                    size="lg"
                    className="m-2 mt-3"
                  >
                    Atrás
                  </Button>
                  <Button
                    type={'submit'}
                    onClick={handleSubmit}
                    size="lg"
                    className="m-2 mt-3"
                  >
                    {'Cargar'}
                  </Button>
                  </div>
                </>
              )}
            </>

            <Stepper
              className="p-2"
              activeStep={currentStep - 1}
              alternativeLabel
            >
              {/* {steps.map((label, index) => ( */}
              <Step key={1}>
                <StepLabel>{'Usuario'}</StepLabel>
              </Step>
              <>
              {showStep2 && (
                <>
                <Step key={2}>
                  <StepLabel>{'Salas Asig.'}</StepLabel>
                </Step>
                </>
              )}
              </>
              {/* ))} */}
            </Stepper>

          </Form>
        </div>
    </Modal>
  );
}
