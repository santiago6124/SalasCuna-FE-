import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";

import "./UserForm.css";

import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import CheckboxList from './CheckboxList';

import { generatePayload, renderformFieldsLocal  } from "../formUtils/formUtils";

import {
  user_request,
  department_request,
  getAllGroup,
  cribroom_request,
  cribroomUser_request,
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
    CribroomUser: [],
  });
  
  // Add the following state variables
  const [filteredCribroomOptions, setFilteredCribroomOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cribroomOptions, setCribroomOptions] = useState([]);
  const [previousCribroomUser, setPreviousCribroomUser] = useState([]);

  const [formData, setFormData] = useState({
    User_is_active: false
  });

  // Replace the renderformFieldsLocal function with the following
  const renderFormField = (field, type) => {
    if (type === 'CribroomUser') {
      return (
        <CheckboxList
          options={filteredCribroomOptions}
          selectedOptions={formData[type] || []}
          onChange={(selectedOptions) => handleInputChange({ target: { name: type, value: selectedOptions } })}
          onSearch={(searchTerm) => handleSearchCribroom(searchTerm)}
          totalPages={totalPages}
          currentPage={currentPage}
          onNextPage={() => handleNextPage()}
          onPrevPage={() => handlePrevPage()}
        />
      );
    }
    return renderformFieldsLocal(field, type, formData, setFormData, handleInputChange);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    console.log('name', name);
    console.log('value', value);
    console.log('formData', formData);

    if (name === 'User_groups') {
      setShowStep2(value === '2'); // Mostrar el Step 2 si el valor es 2
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
      // const newFormData = { ...formData };
  
      Object.entries(props.data).forEach(([key, value]) => {
        console.log(key);
        console.log(value);
        Object.entries(formFieldsLocal).forEach(([formFieldsLocal_key]) => {
          console.log(formFieldsLocal_key);

          formData[`User_${key}`] = value;
        });

      });
  
      // setFormData(newFormData);
      console.log(formData);
    }
  }, [props.data]);



  async function handleSubmit(event) {
    event.preventDefault();

    const payload = generatePayload(formData);
    payload.User.groups = [payload.User.groups];

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
                console.log("User created successfully");

                if (showStep2){
                  const cribroomUserResponse = await Promise.all(
                    formData.CribroomUser.map(async (cribroom) => {
                      return cribroomUser_request(authTokens.access, 'post', 0, { 'user': UserResponse.data.id, 'cribroom': cribroom });
                    })
                  );
                  
                  console.log(cribroomUserResponse);

                  if (cribroomUserResponse[cribroomUserResponse.length-1].status === 201){
                    console.log("CribroomUser created successfully");

                    // window.location.reload();
                  }
                }
                else {
                  // window.location.reload();
                }
  
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
        groupsResponse,
        cribroomRespone,
      ] = await Promise.all([
        department_request(authTokens.access),
        getAllGroup(authTokens.access),
        cribroom_request(authTokens.access),
      ]);
  
      formFieldsLocal.User.department.options = departmentResponse.data;
      formFieldsLocal.User.groups.options = groupsResponse.data;

      setCribroomOptions(cribroomRespone.data);

      if (props.data) {

        let cribroomUserByUserId = await cribroomUser_request(authTokens.access, 'get', 0, {}, undefined, `&user=${props.data.id}`);
        setPreviousCribroomUser(cribroomUserByUserId.data);
        
        formData.CribroomUser = [];

        cribroomUserByUserId.data.forEach(function(yObj) {
            // Busca el objeto correspondiente en x
            var foundObj = cribroomRespone.data.find(function(xObj) {
                return xObj.id === yObj.cribroom;
            });
        
            // Si se encuentra, mueve el objeto al primer lugar y agrega la nueva key 'checked'
            if (foundObj) {
                // Elimina el objeto de su posición original
                cribroomRespone.data.splice(cribroomRespone.data.indexOf(foundObj), 1);
                
                // Agrega la nueva key 'checked'
                formData.CribroomUser.push(foundObj.id);
        
                // Agrega el objeto al primer lugar del array cribroomRespone.data
                cribroomRespone.data.unshift(foundObj);
            }
        });
        setCribroomOptions(cribroomRespone.data);

        console.log(cribroomUserByUserId.data);
        console.log(cribroomRespone.data);

        formData['User_department'] = props.data.department;
        formData['User_groups'] = props.data.groups;
        console.log(formData);
      }
      else {
        formData['User_department'] = departmentResponse.data[0].id;
        formData['User_groups'] = groupsResponse.data[0].id;
      }

      setShowStep2(formData['User_groups'] === 2);
      toastUpdateSuccess("Datos cargados", customId);
    } catch (error) {
      toastUpdateError("Error al cargar los Datos!", customId);
      console.error(error);
    }
  }
  
  var stepsInteger = 2;
  
  const [showStep2, setShowStep2] = useState(formData.User_groups === 2);

  const [cribroomsPerPage, setCribroomsPerPage] = useState([]);

// ...

const handleSearchCribroom = (searchTerm) => {
  const filteredOptions = cribroomOptions.filter(
    (option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()) || option.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const cribroomsOnCurrentPage = filteredOptions.slice(startIndex, endIndex);

  setFilteredCribroomOptions(cribroomsOnCurrentPage);
  setTotalPages(Math.ceil(filteredOptions.length / PAGE_SIZE));
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
};

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const PAGE_SIZE = 5; // Set the number of items per page

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
                    type={showStep2 ? 'button': 'submit' }
                    onClick={showStep2 ? nextStep : handleSubmit}
                    size="lg"
                    className="m-2 mt-3"
                  >
                    {showStep2 ? 'Siguiente' : 'Cargar'}
                  </Button>
                  </div>
                </>
              )}
            </>

            {/* Step 2 */}
            <>
            {showStep2 && currentStep === 2 && (
                <>
                  <h1 className="titulo">Asignar Salas a Trabajador Social</h1>
                  <div className="container-linea">
                    <hr className="linea" />
                  </div>
                  {renderFormField(formFieldsLocal.CribroomUser, 'CribroomUser')}
                  <div className="container-boton-createuser mb-1">
                    <Button type="button" onClick={prevStep} size="lg" className="m-2 mt-3">
                      Atrás
                    </Button>
                    <Button type={'submit'} onClick={handleSubmit} size="lg" className="m-2 mt-3">
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
