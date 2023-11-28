/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";

import "./UserForm.css";

import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

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

  const [formFieldsLocal, setFormFieldsLocal] = useState({
    User: formFields.User,
  });

  const [formData, setFormData] = useState({
    User_is_active: false
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

          newFormData[`User_${key}`] = value;
        });

      });
  
      setFormData(newFormData);
      console.log(newFormData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <h1 className="titulo">Añadir Sala Cuna</h1>

            <div className="container-linea">
              <hr className="linea" />
            </div>
 
            {renderformFieldsLocal(formFieldsLocal.User, 'User', formData, setFormData, handleInputChange)}

            <div className="container-boton-createuser mb-1 ">
              <Button as="input" type="submit" value="Cargar" size="lg" />
            </div>
          </Form>
        </div>
    </Modal>
  );
}
