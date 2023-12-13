import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";

import "./ChildForm.css";

import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import {
  generatePayload,
  renderformFieldsLocal,
  renderFormPoll,
  renderLabelsl,
} from "../formUtils/formUtils";

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

export function ChildForm(props) {
  const [currentStep, setCurrentStep] = useState(props.isGuardian ? 4 : 1);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const [formFieldsLocal, setFormFieldsLocal] = useState({
    Child: formFields.Child,
    Guardian: formFields.Guardian,
    Phone: formFields.Phone,
  });

  const [labelFormsLocal, setLabelFormLocal] = useState({
    Child: formFields.Child,
    Guardian: formFields.Guardian,
    Phone: formFields.Phone,
  });

  const [formData, setFormData] = useState({
    Child_is_active: true,
  });

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

  const formFieldsPoll = questions.map((question) => {
    const answersForQuestion = answers.filter(
      (answer) => answer.question === question.id
    );

    return {
      question,
      answers: answersForQuestion.map((answer) => ({
        ...answer,
        groupId: question.id,
      })),
      userAnswer: userAnswers[question.id] || null,
    };
  });

  const handlePollInputChange = (answerId, e) => {
    const inputValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    // Obtén la pregunta asociada a la respuesta actual
    const associatedQuestion = questions.find(
      (question) =>
        question.id ===
        answers.find((answer) => answer.id === answerId).question
    );

    // Verifica si la pregunta es de tipo "Single Choice"
    if (associatedQuestion.questionType === "Single Choice") {
      // Obtén el groupId de la respuesta actual
      const groupId = associatedQuestion.id;

      // Obtén todas las respuestas dentro del mismo grupo
      const answersInGroup = formFieldsPoll.find(
        (question) => question.question.id === groupId
      ).answers;

      // Actualiza el estado de las respuestas en el mismo grupo
      const updatedUserAnswers = { ...userAnswers };
      answersInGroup.forEach((answer) => {
        updatedUserAnswers[answer.id] =
          answer.id === answerId ? inputValue : false;
      });

      setUserAnswers(updatedUserAnswers);
    } else {
      // Si la pregunta no es de tipo "Single Choice", actualiza la respuesta directamente
      setUserAnswers({
        ...userAnswers,
        [answerId]: inputValue,
      });
    }
  };

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
    console.log("userAnswers: ", userAnswers);

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
        console.log(PhoneResponse);

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

        const childAnswerRequests = Object.entries(userAnswers)
          .filter(([answerKey, answerValue]) => answerValue !== false)
          .map(([answerKey, answerValue]) => {
            return childAnswer_request(authTokens.access, "post", 0, {
              child: ChildResponse.data.id,
              answer: answerKey,
              value:
                typeof answerValue !== "boolean"
                  ? answerValue
                  : answerValue === true
                  ? "true"
                  : "false",
            });
          });

        console.log(Object.entries(userAnswers));
        console.log(Object.entries(childAnswerRequests));

        try {
          const childAnswerResponses = await Promise.all(childAnswerRequests);
          console.log(childAnswerResponses);
        } catch (error) {
          console.error(error);
        }

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
      formFieldsLocal.Child.step_2.neighborhood.options =
        neighborhoodResponse.data;
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
      formFieldsLocal.Guardian.guardian_Type.options =
        guardianTypeResponse.data;
      formData["Guardian_guardian_Type"] = guardianTypeResponse.data[0].id;

      console.log("questionResponse: ", questionResponse);
      console.log("answerResponse: ", answerResponse);
      /// Agrega lógica para construir steps y forms dinámicamente

      setQuestions(questionResponse.data);
      setAnswers(answerResponse.data);

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

  // Encuentra el índice del objeto con parentQuestion !== null en formFieldsPoll
  const parentQuestionIndex = formFieldsPoll.findIndex(
    (objectQuestionAnswer) =>
      objectQuestionAnswer.question.parentQuestion !== null
  );

  // Si se encuentra el índice, extrae ese objeto y elimínalo de formFieldsPoll
  if (parentQuestionIndex !== -1) {
    const parentQuestionObject = formFieldsPoll[parentQuestionIndex];
    formFieldsPoll.splice(parentQuestionIndex, 1);

    // Encuentra el índice del objeto con question.id igual a parentQuestion y asigna el parentQuestionObject a ese índice
    const childQuestionIndex = formFieldsPoll.findIndex(
      (objectQuestionAnswer) =>
        objectQuestionAnswer.question.id ===
        parentQuestionObject.question.parentQuestion
    );

    if (childQuestionIndex !== -1) {
      formFieldsPoll[childQuestionIndex].childQuestion = parentQuestionObject;
    }
  }

  var stepsInteger = 6;
  stepsInteger += props.data ? -1 : formFieldsPoll.length;
  // Generar un array con los valores del rango de stepsInteger
  const stepsArray = Array.from(
    { length: stepsInteger },
    (_, index) => index + 1
  );

  // Crear los steps dinámicamente basados en el array generado
  const steps = stepsArray.map((stepNumber) => `Step ${stepNumber}`);

  useEffect(() => {
    setCurrentStep(props.isGuardian ? 4 : 1);
  }, [props.data]);

  return (
    <Modal
      {...props}
      show={props.show}
      size="sm"
      className="mb-5 mt-3 justify-content-center d-flex modal-container "
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <body className="body-ac">
        <div className="container-form-wrapper">
          <Form className="conteiner-form" onSubmit={handleSubmit}>
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
            {props.isGuardian && currentStep === 4 && (
              <>
                {isEditable ? (
                  // Render the content for step 4 when isGuardian is true and isEditable is true
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
                        onClick={() => setIsEditable(false)}
                        size="lg"
                        className="m-2 mt-3"
                      >
                        Cancelar Edición
                      </Button>
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        size="lg"
                        className="m-2 mt-3"
                      >
                        Cargar
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="titulo">Informacion de Tutor</h1>
                    <div className="contenedor-linea">
                      <hr className="linea" />
                    </div>
                    {renderLabelsl(
                      labelFormsLocal.Guardian,
                      "Guardian",
                      formData,
                      setLabelFormLocal,
                      handleInputChange
                    )}
                    <div className="justify-content-center d-flex">
                    <Button
                      type="button"
                      onClick={() => setIsEditable(true)}
                      size="lg"
                      className="m-2 mt-3"
                    >
                      Editar Información
                    </Button>
                    </div>
                  </>
                )}
              </>
            )}{" "}
            {!props.isGuardian && currentStep === 4 && (
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
                    type={currentStep === stepsInteger ? "submit" : "button"}
                    onClick={
                      currentStep === stepsInteger ? handleSubmit : nextStep
                    }
                    size="lg"
                    className="m-2 mt-3"
                  >
                    {currentStep === stepsInteger ? "Cargar" : "Siguiente"}
                  </Button>
                </div>
              </>
            )}
            <>
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
                      className="m-2 mt-3"
                    >
                      Atrás
                    </Button>
                    <Button
                      type={currentStep === stepsInteger ? "submit" : "button"}
                      onClick={
                        currentStep === stepsInteger ? handleSubmit : nextStep
                      }
                      size="lg"
                      className="m-2 mt-3"
                    >
                      {currentStep === stepsInteger ? "Cargar" : "Siguiente"}
                    </Button>
                  </div>
                </>
              )}
            </>
            {/* Renderizar los steps dinámicos */}
            {currentStep > 5 && !props.data && (
              <>
                <div key={currentStep}>
                  <h1 className="titulo">{`${
                    formFieldsPoll[currentStep - 6].question.description
                  }`}</h1>
                  <div className="contenedor-linea">
                    <hr className="linea" />
                  </div>
                  {formFieldsPoll[currentStep - 6].answers.map((answer) =>
                    renderFormPoll(answer, handlePollInputChange, userAnswers)
                  )}

                  {formFieldsPoll[currentStep - 6].childQuestion && (
                    <>
                      <h1 className="titulo">{`${
                        formFieldsPoll[currentStep - 6].childQuestion.question
                          .description
                      }`}</h1>
                      <div className="contenedor-linea">
                        <hr className="linea" />
                      </div>
                      {formFieldsPoll[
                        currentStep - 6
                      ].childQuestion.answers.map((answer) =>
                        renderFormPoll(
                          answer,
                          handlePollInputChange,
                          userAnswers
                        )
                      )}
                    </>
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
                      type={currentStep === stepsInteger ? "submit" : "button"}
                      onClick={
                        currentStep === stepsInteger ? handleSubmit : nextStep
                      }
                      size="lg"
                      className="m-2 mt-3"
                    >
                      {currentStep === stepsInteger ? "Cargar" : "Siguiente"}
                    </Button>
                  </div>
                </div>
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
