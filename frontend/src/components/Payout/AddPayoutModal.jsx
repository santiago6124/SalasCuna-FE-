import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react"; // Import useContext
import axios from "axios";
import AuthContext from "../../context/AuthContext"; // Import your AuthContext

import {
  getAllZones,
} from "../../api/salasCuna.api";

export function AddPayout(props) {
  const [zone, setZone] = useState("");
  const { authTokens } = useContext(AuthContext); // Get the authTokens from your context
  const [zoneOptions, setZoneOptions] = useState([]);

  const [formFields, setFormFields] = useState({
    payout: [
      {
        name: "amount",
        label: "Editar el monto del pago",
        type: "text",
        required: true,
      },
      {
        name: "date",
        label: "Fecha",
        type: "date",
        required: true,
      },
      {
        name: "zone",
        label: "Zona",
        type: "select",
        options: zoneOptions, // You need to define zoneOptions props.zones
        required: true,
      },
    ],
  });
  const [formData, setFormData] = useState({});  /// mas adelante get request para obtener cribroom basado en los props id

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    loadZones();
  }, [props]);

  async function loadZones() {
    try {
      const response = await getAllZones(props.tokens);
      console.log('response: ', response);
      setZoneOptions(response.data);
      formFields['payout'][2]['options'] = response.data;
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  }

  
  const renderFormFields = (fields) => {

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

  async function handleAdd(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const payload = {
        amount: formData.get("amount"),
        date: formData.get("date"),
        zone: formData.get("zone"),
      };

      let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + authTokens.access,
        "Accept": "application/json"
      };

      let response = await axios.post(`/api/payout/`, payload, { headers }); // Include headers in the request

      if (response.request.status === 201) {
        props.onHide();
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="contenedor-form-wrapper">
        <Container fluid className="conteiner-form-room">
          <Form onSubmit={handleAdd} className="conteiner-form-edit">
            <h1 className="titulo">Agregar Pago</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>
            
            {renderFormFields(formFields.payout)}
            
            <div className="contenedor-boton-qr ">
              <Button
                className="boton-edit mt-3"
                boton
                variant="primary"
                type="submit"
              >
                Agregar Pago
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Modal>
  );
}
