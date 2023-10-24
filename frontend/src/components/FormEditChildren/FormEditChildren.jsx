import React, { useEffect, useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./FormEditChildren.css"
import {
  getAllCribrooms,
  getAllGenders,
  getAllGuardianTypes,
  getAllLocalities,
  getAllNeighborhood,
  getAllPhoneFeatures,
  getAllShifts,
  getAllChildren,
} from "../../api/salasCuna.api";
import { Modal } from "react-bootstrap";

export default function EditChildren(props) {
  const [childGenders, setChildGender] = useState([]);
  const [guardianGenders, setGuardianGender] = useState([]);
  const [salas, setCribroom] = useState([]);
  const [shifts, setShift] = useState([]);
  const [localities, setLocality] = useState([]);
  const [neighborhoods, setNeighborhood] = useState([]);
  const [childStates, setChildState] = useState([]);
  const [guardianTypes, setGuardianType] = useState([]);
  const [phoneFeatures, setPhoneFeature] = useState([]);

  const [isDireccionVisible, setIsDireccionVisible] = useState(false);
  const [isTutorVisible, setIsTutorVisible] = useState(false);

  const [formFields, setFormFields] = useState({
    child: [
      { name: "nombreChild", label: "Nombre", type: "text", required: true },
      { name: "apellidoChild", label: "Apellido", type: "text", required: true },
      { name: "dniChild", label: "DNI", type: "number", required: true },
      { name: "fechaNacimientoChild", label: "Fecha De Nacimiento", type: "date", required: true },
      { name: "generoChild",label: "Genero",type: "select",options: childGenders, required: true,}, // Add options dynamically
      { name: "salacuna", label: "Sala Cuna", type: "select", options: salas, required: true }, // Add options dynamically
      { name: "turno", label: "Turno", type: "select", options: shifts, required: false }, // Add options dynamically
      { name: "fechaBaja", label: "Fecha de baja", type: "date", required: false },
      { name: "fechaAlta", label: "Fecha de alta", type: "date", required: true },
    ],
    guardian: [
      { name: "nombreGuardian", label: "Nombre", type: "text", required: true },
      { name: "apellidoGuardian", label: "Apellido", type: "text", required: true },
      { name: "dniGuardian", label: "DNI", type: "number", required: true },
      { name: "generoGuardian", label: "Genero", type: "select", options: guardianGenders, required: true }, // Add options dynamically
      { name: "phoneFeature", label: "Caracterisitca Telefonica", type: "select", options: phoneFeatures, required: true }, // Add options dynamically
      { name: "telefono", label: "Telefono", type: "number", required: true },
      { name: "guardianType", label: "Madre/padre o Tutor?", type: "select", options: guardianTypes, required: true }, // Add options dynamically
    ],
    address: [
      { name: "calle", label: "Calle", type: "text", required: true },
      { name: "numero_casa", label: "Numero", type: "number", required: false },
      { name: "neighborhood", label: "Barrio", type: "select", options: neighborhoods, required: true }, // Add options dynamically
      { name: "locality", label: "Localidad", type: "select", options: localities, required: true }, // Add options dynamically
    ],
  });
  const [formData, setFormData] = useState({
    nombreChild: "Facundo",
    apellidoChild: "Oliva Marchetto",
    dniChild: 460327608,
    fechaNacimientoChild: "2004-10-29",
    fechaBaja: "2004-10-29",
    fechaAlta: "2006-10-29",
    nombreGuardian: "Lucas",
    apellidoGuardian: "Oliva",
    dniGuardian: 241191000,
    telefono: 3534441111,
    calle: 'la calle de mi casa',
    numero_casa: 37,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleDireccion = () => {
    setIsDireccionVisible(!isDireccionVisible);
  };

  const toggleTutor = () => {
    setIsTutorVisible(!isTutorVisible);
  };
  
  const [selectedChild, setSelectedChild] = useState("");


  useEffect(() => {
    getAllChildren(props.tokens);
    GenderList();
    CribroomList();
    ShiftList();
    LocalityList();
    NeighborhoodList();
    GuardianTypeList();
    PhoneFeatureList();
    setSelectedChild(props.id);
  }, []);

  async function GenderList() {
    try {
      const response = await getAllGenders(props.tokens);
      setChildGender(response.data);
      setGuardianGender(response.data);

      formFields['child'][4]['options'] = response.data;
      formFields['guardian'][3]['options'] = response.data;

    } catch (error) {
      console.error("Error fetching generos:", error);
    }
  }

  async function CribroomList() {
    try {
      const response = await getAllCribrooms(props.tokens);
      setCribroom(response.data);

      formFields['child'][5]['options'] = response.data;
    } catch (error) {
      console.log("Error fetching Salas Cunas:", error);
    }
  }

  async function ShiftList() {
    try {
      const response = await getAllShifts(props.tokens);
      setShift(response.data);

      formFields['child'][6]['options'] = response.data;
    } catch (error) {
      console.log("Error fetching Turnos:", error);
    }
  }

  async function LocalityList() {
    try {
      const response = await getAllLocalities(props.tokens);
      setLocality(response.data);
      
      console.log('LocalityList response: ', response);
      formFields['address'][3]['options'] = response.data;
    } catch (error) {
      console.error("Error fetching localidad:", error);
    }
  }

  async function NeighborhoodList() {
    try {
      const response = await getAllNeighborhood(props.tokens);
      setNeighborhood(response.data);

      formFields['address'][2]['options'] = response.data;
    } catch (error) {
      console.error("Error fetching barrio:", error);
    }
  }

  const navigate = useNavigate();

  async function GuardianTypeList() {
    try {
      const response = await getAllGuardianTypes(props.tokens);
      setGuardianType(response.data);
      formFields['guardian'][6]['options'] = response.data;
    } catch (error) {
      console.error("Error fetching estados:", error);
    }
  }

  async function PhoneFeatureList() {
    try {
      const response = await getAllPhoneFeatures(props.tokens);
      setPhoneFeature(response.data);
      formFields['guardian'][4]['options'] = response.data;
    } catch (error) {
      console.error("Error fetching estados:", error);
    }
  }

  function handleNewClick() {
    navigate("/children-management");
  }

  const location = useLocation();
  const childId = location?.state?.childId;

  const renderFormFields = (fields) => {
    console.log('fields', fields);
    return fields.map((field) => (
      <Form.Group className="mb-3" key={field.name}>
        <Form.Label className="mb-1">{field.label}</Form.Label>
        {field.type === "select" ? (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className="form-control"
            required={field.required}
          >
            {field.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option[Object.keys(option)[1]]} {/* Adjust this based on your option structure */}
              </option>
            ))}
          </select>
        ) : (
          <Form.Control
            type={field.type}
            placeholder={`Ingrese ${field.label.toLowerCase()}`}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            required={field.required}
          />
        )}
      </Form.Group>
    ));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let res = await axios.get(`/api/child/${selectedChild}/?no_depth`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + props.tokens
      }
    })
    let guardian_id = res.data.guardian
    const payload = {
      first_name: formData.get("nombreChild"),
      last_name: formData.get("apellidoChild"),
      dni: formData.get("dniChild"),
      age: formData.get("edadChild"),
      birthdate: formData.get("fechaNacimientoChild"),
      house_number: formData.get("numero_casa"),
      registration_date: formData.get("fechaAlta"),
      disenroll_date: formData.get("fechaBaja") ? formData.get("fechaBaja") : null,
      locality: formData.get("locality"),
      street: formData.get("calle"),
      gender: formData.get("generoChild"),
      cribroom: formData.get("salacuna"),
      shift: formData.get("turno"),
      neighborhood: formData.get("neightborhood"),
      guardian_first_name: formData.get("nombreGuardian"),
      guardian_last_name: formData.get("apellidoGuardian"),
      guardian_dni: formData.get("dniGuardian"),
      guardian_phone_number: formData.get("telefono"),
      guardian_phone_Feature: formData.get("phoneFeature"),
      guardian_guardian_Type_id: formData.get("guardianType"),
      guardian_gender_id: formData.get("generoGuardian"),
      guardian: guardian_id,
    };

    try {
      console.log(selectedChild + " id");
      let response = await axios.patch(
        `/api/child/${selectedChild}/?no_depth`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
            "Authorization": "JWT " + props.tokens
          },
        }
      );
      if (response.request.status === 200) {
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

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Form className="conteiner-form-ec" onSubmit={handleSubmit}>
        <Button
          as="input"
          type="submit"
          value="Back"
          size="m"
          onClick={handleNewClick}
        />

        <h1 className="titulo">Editar Niños/as</h1>

        <div className="contenedor-linea">
          <hr className="linea" />
        </div>
        
        {renderFormFields(formFields.child)}

        <div className="toggle-button" onClick={() => toggleTutor()}>
          {isTutorVisible ? "Ocultar Añadir tutor" : "Mostrar Añadir tutor"}
        </div>

        {isTutorVisible && renderFormFields(formFields.guardian)}

        <div className="toggle-button" onClick={() => toggleDireccion()}>
          {isDireccionVisible ? "Ocultar Direccion" : "Mostrar Direccion"}
        </div>

        {isDireccionVisible && renderFormFields(formFields.address)}


        <div className="contenedor-boton mb-1 ">
          <Button as="input" type="submit" value="Cargar" size="lg" />
        </div>
      </Form>
    </Modal>
  );
}
