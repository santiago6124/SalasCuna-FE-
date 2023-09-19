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
  const [ChildGenders, setChildGender] = useState([]);
  const [guardianGenders, setGuardianGender] = useState([]);
  const [salas, setCribroom] = useState([]);
  const [shifts, setShift] = useState([]);
  const [localities, setLocality] = useState([]);
  const [neighborhoods, setNeighborhood] = useState([]);
  const [childStates, setChildState] = useState([]);
  const [guardianTypes, setGuardianType] = useState([]);
  const [phoneFeatures, setPhoneFeature] = useState([]);
  const [selectedGeneroChild, setSelectedGeneroChild] = useState("");
  const [selectedGeneroGuardian, setSelectedGeneroGuardian] = useState("");
  const [selectedSalaCuna, setSelectedSalacuna] = useState("");
  const [selectedTurno, setSelectedTurno] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedChildState, setSelectedChildState] = useState("");
  const [selectedPhoneFeature, setSelectedPhoneFeature] = useState("");
  const [selectedGuardianType, setSelectedGuardianType] = useState("");
  const [selectedChild, setSelectedChild] = useState("");

  function handleGeneroChildChange(event) {
    setSelectedGeneroChild(event.target.value);
  }
  function handleGeneroGuardianChange(event) {
    setSelectedGeneroGuardian(event.target.value);
  }
  function handleSalaCunaChange(event) {
    setSelectedSalacuna(event.target.value);
  }
  function handleTurnoChange(event) {
    setSelectedTurno(event.target.value);
  }
  function handleLocalityChange(event) {
    setSelectedLocality(event.target.value);
  }
  function handleNeighborhoodChange(event) {
    setSelectedNeighborhood(event.target.value);
  }
  function handlePhoneFeatureChange(event) {
    setSelectedPhoneFeature(event.target.value);
  }
  function handleGuardianTypeChange(event) {
    setSelectedGuardianType(event.target.value);
  }

  useEffect(() => {
    getAllChildren();
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
      const response = await getAllGenders();
      setChildGender(response.data);
      setGuardianGender(response.data);
    } catch (error) {
      console.error("Error fetching generos:", error);
    }
  }

  async function CribroomList() {
    try {
      const response = await getAllCribrooms();
      setCribroom(response.data);
    } catch (error) {
      console.log("Error fetching Salas Cunas:", error);
    }
  }

  async function ShiftList() {
    try {
      const response = await getAllShifts();
      setShift(response.data);
    } catch (error) {
      console.log("Error fetching Turnos:", error);
    }
  }

  async function LocalityList() {
    try {
      const response = await getAllLocalities();
      setLocality(response.data);
    } catch (error) {
      console.error("Error fetching localidad:", error);
    }
  }

  async function NeighborhoodList() {
    try {
      const response = await getAllNeighborhood();
      setNeighborhood(response.data);
    } catch (error) {
      console.error("Error fetching barrio:", error);
    }
  }

  const navigate = useNavigate();

  async function GuardianTypeList() {
    try {
      const response = await getAllGuardianTypes();
      setGuardianType(response.data);
    } catch (error) {
      console.error("Error fetching estados:", error);
    }
  }

  async function PhoneFeatureList() {
    try {
      const response = await getAllPhoneFeatures();
      setPhoneFeature(response.data);
    } catch (error) {
      console.error("Error fetching estados:", error);
    }
  }

  function handleNewClick() {
    navigate("/children-management");
  }

  const location = useLocation();
  const childId = location?.state?.childId;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let res = await axios.get(`/api/child/${selectedChild}/?no_depth`)
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
      neightborhood: formData.get("neightborhood"),
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
          },
        }
      );
      if (response.request.status === 201) {
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

        <Form.Group className="mb-3">
          <Form.Label className="mb-1">Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese un nombre"
            defaultValue={selectedChild.first_name}
            name="nombreChild"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="mb-1">Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese un apellido"
            name="apellidoChild"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="mb-1">DNI</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese un DNI"
            name="dniChild"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="mb-1">Fecha De Nacimiento</Form.Label>
          <Form.Control
            type="date"
            placeholder=""
            name="fechaNacimientoChild"
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <div>
              <Form.Label className="mb-1">Genero</Form.Label>
              <select
                id="gender"
                name="generoChild"
                value={selectedGeneroChild}
                onChange={handleGeneroChildChange}
                className="form-control"
                required
              >
                <option value="">Generos</option>
                {ChildGenders.map((gender) => (
                  <option key={gender.id} value={gender.id}>
                    {gender.gender}
                  </option>
                ))}
              </select>
            </div>
          </Col>
          {/*           <Col>
            <div>
              <Form.Label className="mb-1">Estado</Form.Label>
              <select
                id="child_state"
                name="estado"
                value={selectedChildState}
                onChange={handleChildStateChange}
                className="form-control"
                required
              >
                <option value="">Estado</option>
                {childStates.map((child_state) => (
                  <option key={child_state.id} value={child_state.id}>
                    {child_state.name}
                  </option>
                ))}
              </select>
            </div>
          </Col> */}
        </Row>

        <Row className="mb-3">
          <Col>
            <div>
              <Form.Label className="mb-1">Sala Cuna</Form.Label>
              <select
                id="cribroom"
                name="salacuna"
                value={selectedSalaCuna}
                onChange={handleSalaCunaChange}
                className="form-control"
                required
              >
                <option value="">Sala Cuna</option>
                {salas.map((cribroom) => (
                  <option key={cribroom.id} value={cribroom.id}>
                    {cribroom.name}
                  </option>
                ))}
              </select>
            </div>
          </Col>
        </Row>

        <div className="mb-3">
          <Form.Label className="mb-1">Turno</Form.Label>
          <select
            id="shift"
            name="turno"
            value={selectedTurno}
            onChange={handleTurnoChange}
            className="form-control"
          >
            <option value="">Turnos</option>
            {shifts.map((shift) => (
              <option key={shift.id} value={shift.id}>
                {shift.name}
              </option>
            ))}
          </select>
        </div>

        <Row className="mb-5">
          <Col>
            <Form.Label className="mb-1">Fecha de baja</Form.Label>
            <Form.Control
              type="date"
              placeholder=""
              name="fechaBaja"
              defaultValue={null}
            />
          </Col>
          <Col>
            <Form.Label className="mb-1">Fecha de alta</Form.Label>
            <Form.Control
              type="date"
              placeholder=""
              name="fechaAlta"
              required
            />
          </Col>
        </Row>

        <h1 className="titulo">Añadir Tutor/a</h1>

        <div className="contenedor-linea">
          <hr className="linea"></hr>
        </div>

        <Form.Group className="mb-3">
          <Form.Label className="mb-1">Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese un nombre"
            name="nombreGuardian"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="mb-1">Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese un apellido"
            name="apellidoGuardian"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="mb-1">DNI</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese un DNI"
            name="dniGuardian"
            required
          />
        </Form.Group>

        <div className="mb-3">
          <Form.Label className="mb-1">Genero</Form.Label>
          <select
            id="gender"
            name="generoGuardian"
            value={selectedGeneroGuardian}
            onChange={handleGeneroGuardianChange}
            className="form-control"
            required
          >
            <option value="">Generos</option>
            {guardianGenders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.gender}
              </option>
            ))}
          </select>
        </div>

        <Row className="mb-4">
          <Col>
            <Form.Label className="mb-1">Caracterisitca Telefonica</Form.Label>

            <select
              id="phoneFeature"
              name="phoneFeature"
              value={selectedPhoneFeature}
              onChange={handlePhoneFeatureChange}
              className="form-control"
              required
            >
              <option value="">Phone Features</option>
              {phoneFeatures.map((phoneFeature) => (
                <option key={phoneFeature.id} value={phoneFeature.id}>
                  {phoneFeature.feature}
                </option>
              ))}
            </select>
          </Col>
          <Col>
            <Form.Label className="mb-1">Telefono</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese un telefono"
              name="telefono"
              required
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Label className="mb-1">Madre/padre o Tutor?</Form.Label>

            <select
              id="guardianType"
              name="guardianType"
              value={selectedGuardianType}
              onChange={handleGuardianTypeChange}
              className="form-control"
              required
            >
              <option value="">Madre/padre o Tutor?</option>
              {guardianTypes.map((guardianType) => (
                <option key={guardianType.id} value={guardianType.id}>
                  {guardianType.type}
                </option>
              ))}
            </select>
          </Col>
        </Row>

        <h1 className="titulo">Añadir Domicilio</h1>

        <div className="contenedor-linea">
          <hr className="linea"></hr>
        </div>
        <Row className="mb-3">
          <Col>
            <Form.Label className="mb-1">Calle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese una calle"
              id="calle"
              name="calle"
              required
            />
          </Col>
          <Col>
            <Form.Label className="mb-1">Numero</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese un numero"
              name="numero_casa"
            />
          </Col>
        </Row>

        <div className="mb-3">
          <Form.Label className="mb-1">Barrio</Form.Label>
          <select
            id="neighborhood"
            name="neighborhood"
            value={selectedNeighborhood}
            onChange={handleNeighborhoodChange}
            className="form-control"
            required
          >
            <option value="">Localidad</option>
            {neighborhoods.map((neighborhood) => (
              <option key={neighborhood.id} value={neighborhood.id}>
                {neighborhood.neighborhood}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <Form.Label className="mb-1">Localidad</Form.Label>
          <select
            id="locality"
            name="locality"
            value={selectedLocality}
            onChange={handleLocalityChange}
            className="form-control"
            required
          >
            <option value="">Localidad</option>
            {localities.map((locality) => (
              <option key={locality.id} value={locality.id}>
                {locality.locality}
              </option>
            ))}
          </select>
        </div>

        <div className="contenedor-boton mb-1 ">
          <Button as="input" type="submit" value="Cargar" size="lg" />
        </div>
      </Form>
    </Modal>
  );
}
