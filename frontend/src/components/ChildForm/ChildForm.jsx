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
  question_request,
  answer_request,
} from "../../api/salasCuna.api";

import { formFields } from "../../api/salasCuna.formFields";
import {
  toastLoading,
  toastUpdateError,
  toastUpdateSuccess,
} from "../../utils/toastMsgs";

export function ChildForm(props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const formFieldsDynamic = questions.map((question) => {
    const answersForQuestion = answers.filter((answer) => answer.question === question.id);
    
    return {
      question,
      answers: answersForQuestion,
      userAnswer: userAnswers[question.id] || null,
    };
  });

  const [formFieldsLocal, setFormFieldsLocal] = useState({
    Child: formFields.Child,
    Guardian: formFields.Guardian,
    Phone: formFields.Phone,
  });

  const [formData, setFormData] = useState({
    Child_is_active: true,
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
    }
  }, [props.data]);

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
        questionResponse,
        answerResponse,
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

      // Child_location FormFields
      formFieldsLocal.Child.step_2.locality.options = localityResponse.data;
      formData["Child_locality"] = localityResponse.data[0].id;
      formFieldsLocal.Child.step_2.neighborhood.options = neighborhoodResponse.data;
      formData["Child_neighborhood"] = neighborhoodResponse.data[0].id;

      //Child_CR FormFields
      formFieldsLocal.Child.step_3.cribroom.options = cribroomResponse.data;
      formData["Child_cribroom"] = cribroomResponse.data[0].id;
      formFieldsLocal.Child.step_3.shift.options = shiftResponse.data;
      formData["Child_shift"] = shiftResponse.data[0].id;

      //Phone FormFields
      formFieldsLocal.Phone.phone_Feature.options = phoneFeatureResponse.data;
      formData["Phone_phone_Feature"] = phoneFeatureResponse.data[0].id;

      //Guardian FormFields
      formFieldsLocal.Guardian.ident_type.options = idenTypeResponse.data;
      formData["Guardian_ident_type"] = idenTypeResponse.data[0].id;
      formFieldsLocal.Guardian.guardian_Type.options = guardianTypeResponse.data;
      formData["Guardian_guardian_Type"] = guardianTypeResponse.data[0].id;

      console.log('questionResponse: ',questionResponse);
      console.log('answerResponse: ',answerResponse);
      /// Agrega lógica para construir steps y forms dinámicamente

      setQuestions(questionResponse.data);
      setAnswers(answerResponse.data);

      toastUpdateSuccess("Datos cargados", customId);
    } catch (error) {
      toastUpdateError("Error al cargar los Datos!", customId);
      console.error(error);
    }
  }

  const handleSubmitDynamic = (formFieldsDynamic, userAnswers) => {
    // Implement logic to handle the submission of dynamic form data
    console.log("Dynamic Form Data:", formFieldsDynamic);
    console.log("User Answers:", userAnswers);
  
    // Add your logic to submit the data to the server or perform any other actions
  };
  

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Encuentra el índice del objeto con parentQuestion !== null en formFieldsDynamic
  const parentQuestionIndex = formFieldsDynamic.findIndex(
    (objectQuestionAnswer) => objectQuestionAnswer.question.parentQuestion !== null
  );

  // Si se encuentra el índice, extrae ese objeto y elimínalo de formFieldsDynamic
  if (parentQuestionIndex !== -1) {
    const parentQuestionObject = formFieldsDynamic[parentQuestionIndex];
    formFieldsDynamic.splice(parentQuestionIndex, 1);

    // Encuentra el índice del objeto con question.id igual a parentQuestion y asigna el parentQuestionObject a ese índice
    const childQuestionIndex = formFieldsDynamic.findIndex(
      (objectQuestionAnswer) => objectQuestionAnswer.question.id === parentQuestionObject.question.parentQuestion
    );

    if (childQuestionIndex !== -1) {
      formFieldsDynamic[childQuestionIndex].childQuestion = parentQuestionObject;
    }
  }

  console.log('formFieldsDynamic: ', formFieldsDynamic);
  console.log('formFieldsDynamic: ', formFieldsDynamic.length);
  console.log('stepsInteger: ', stepsInteger);

  const handleDynamicInputChange = (questionId, answerId) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerId,
    });
    console.log("Dynamic Form Data:", formFieldsDynamic);
    console.log("User Answers:", userAnswers);
  };

  var stepsInteger = 5;
  stepsInteger += formFieldsDynamic.length;
  // Generar un array con los valores del rango de stepsInteger
  const stepsArray = Array.from({ length: stepsInteger }, (_, index) => index + 1);

  // Crear los steps dinámicamente basados en el array generado
  const steps = stepsArray.map((stepNumber) => `Step ${stepNumber}`);

  // Función para renderizar un step dinámicamente
  function renderDynamicSteps(formFieldsDynamic, handleDynamicInputChange, prevStep, currentStep) {
    const formField = formFieldsDynamic[currentStep-6];
    console.log('formField: ' ,formField);

    if (formField.childQuestion){
      return (
        <div key={currentStep}>
        <h1 className="titulo">{`${formField.question.description}`}</h1>
        <div className="contenedor-linea">
          <hr className="linea" />
        </div>
        {formField.answers.map((answer) => (
          <div key={answer.id}>
            <label>
              <input
                type={answer.answerType === "Boolean" ? "checkbox" : "text"}
                value={answer.id}
                checked={formField.userAnswer === answer.id}
                onChange={() => handleDynamicInputChange(formField.question.id, answer.id)}
              />
              {answer.description}
            </label>
          </div>
        ))}
        <h1 className="titulo">{`${formField.childQuestion.question.description}`}</h1>
        <div className="contenedor-linea">
          <hr className="linea" />
        </div>
        {formField.childQuestion.answers.map((childAnswer) => (
          <div key={childAnswer.id}>
            <label>
              <input
                type={childAnswer.answerType === "Boolean" ? "checkbox" : "text"}
                value={childAnswer.id}
                checked={formField.userAnswer === childAnswer.id}
                onChange={() => handleDynamicInputChange(formField.question.id, childAnswer.id)}
              />
              {childAnswer.description}
            </label>
          </div>
        ))}
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
      </div>
      );
    } else {
      return (
      <div key={currentStep}>
        <h1 className="titulo">{`${formField.question.description}`}</h1>
        <div className="contenedor-linea">
          <hr className="linea" />
        </div>
        {formField.answers.map((answer) => (
          <div key={answer.id}>
            <label>
              <input
                type={answer.answerType === "Boolean" ? "checkbox" : "text"}
                value={answer.id}
                checked={formField.userAnswer === answer.id}
                onChange={() => handleDynamicInputChange(formField.question.id, answer.id)}
              />
              {answer.description}
            </label>
          </div>
        ))}
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
      </div>
      );
  }
  }
  

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
          <Form
            className="conteiner-form"
            onSubmit={(event) => {
              switch (currentStep) {
                case stepsInteger:
                  // Lógica para manejar el envío del formulario dinámico
                  handleSubmitDynamic(formFieldsDynamic, userAnswers);
                  return nextStep();

                  // break;
      
                default:
                  return "";
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
                    {
                      ...formFieldsLocal.Child.step_1,
                    },
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
                <h1 className="titulo">Añadir Direccion</h1>

                <div className="contenedor-linea">
                  <hr className="linea" />
                </div>
                {renderformFieldsLocal(
                  formFieldsLocal.Child.step_2,
                  "Child",
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
                <h1 className="titulo">Chico: Sala Cuna</h1>

                <div className="contenedor-linea">
                  <hr className="linea" />
                </div>
                {renderformFieldsLocal(
                  formFieldsLocal.Child.step_3,
                  "Child",
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
                    value="Siguiente"
                    size="lg"
                    className="m-2 mt-3"
                    onClick={nextStep}
                  />
                </div>
              </>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
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

            {/* Step 5 */}
            {currentStep === 5 && (
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
                    className="m-2 mt-1"
                  >
                    Atrás
                  </Button>
                  <Button
                    as="input"
                    type="submit"
                    value="Cargar"
                    onClick={nextStep}
                    size="lg"
                    className="m-2 mt-1"
                  />
                </div>
              </>
            )}


            {/* Renderizar los steps dinámicos */}
            {currentStep > 5 && (
              <>
                {renderDynamicSteps(formFieldsDynamic, handleDynamicInputChange, prevStep, currentStep)}
              </>
            )}


            
            <Stepper
              className="p-2"
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
