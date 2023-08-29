import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

import React, { useState, useEffect } from "react";

import {
  getAllShifts,
  getAllZones,
  getAllCribroomsWithoutDepth,
} from "../../api/salasCuna.api";

export function UpdateRoom(props) {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [selectedCribroom, setSelectedCribroom] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [cribroom, setCribroom] = useState([]);

  useEffect(() => {
    loadZones();
    loadShifts();
    setSelectedCribroom(props.id);
    loadSelectedCribroom(props.id); // Load selected cribroom data
  }, []);

  const loadZones = async () => {
    try {
      const response = await getAllZones();
      setZoneOptions(response.data);
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  };

  const loadShifts = async () => {
    try {
      const response = await getAllShifts();
      setShiftOptions(response.data);
    } catch (error) {
      console.error("Error fetching shift options:", error);
    }
  };

  async function loadSelectedCribroom(cribroomId) {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/cribroom/?no_depth&id=" + cribroomId,
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json(); // Extract JSON data
        const crib = data[0];
        setCribroom(crib);
      } else {
        console.error(
          "Error fetching selected cribroom data:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching selected cribroom data:", error);
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      name: formData.get("nameCR"),
      code: formData.get("codeCR"),
      max_capacity: formData.get("max_capacityCR"),
      street: formData.get("streetCR") ? formData.get("streetCR") : "", // if null, empty string in order to not broke xd
      house_number: formData.get("house_numberCR"),
      shift: formData.get("shiftCR"),
      zone: formData.get("zoneCR"),
    };
    if (selectedCribroom) {
      try {
        let response = await fetch(
          "http://127.0.0.1:8000/api/cribroom/" + selectedCribroom + "/",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          console.log("Cribroom Updated");
          props.onHide();
        } else {
          console.log("Failed to Update");
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  function handleShiftChange(event) {
    setSelectedShift(event.target.value);
  }

  function handleZoneChange(event) {
    setSelectedZone(event.target.value);
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="contenedor-form-wrapper">
        <Container fluid className="conteiner-form-room">
          <Form onSubmit={handleEdit} className="conteiner-form-edit">
            <h1 className="titulo">Agregar Pago</h1>
            <div className="contenedor-linea">
              <hr className="linea"></hr>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Monto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Agregar el monto del pago"
                name="amount"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Fecha</Form.Label>
              <Form.Control type="date" name="date" />
            </Form.Group>
            <div className="col-md-2">
              <Form.Label className="mb-1">Seleccionar Zona</Form.Label>
              <Form.Select as="select" name="role">
                <option value="" disabled>
                  Seleccionar Zona
                </option>
                {zoneOptions.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </Form.Select>
            </div>
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
