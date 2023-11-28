/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useContext } from "react";
import "./TechnicalReport.css";
import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import Button from "@mui/material/Button";
import InputGroup from "react-bootstrap/InputGroup/";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import DownloadPDF from "./DownloadPDF/DownloadPDF";
import { handlePermissions, cribroom_request, zone_request, technicalReport_request } from "../../api/salasCuna.api";

import { deletingData } from '../../utils/toastMsgs';

import AuthContext from "../../context/AuthContext"; // Import AuthContext
import { ToastContainer } from "react-toastify";

import EditIcon from "@mui/icons-material/Edit";
import TechnicalReportHeadersModal from "../TechnicalReportHeadersModal/TechnicalReportHeadersModal";

export default function TechnicalReport() {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [cribrooms, setCribrooms] = useState([]);
  const [startDate, setStartDate] = useState(""); // New state for start date
  const [endDate, setEndDate] = useState(""); // New state for end date
  const [selectedCribrooms, setSelectedCribrooms] = useState([]); // New state for selected crib rooms
  const [modalCreateShow, setModalCreateShow] = useState(false);
  const[TechnicalReportTableListCreateView, getTechnicalReportTableListCreateView] = useState("")

  const { authTokens } = useContext(AuthContext); // Get JWT token from context

  // Define headers outside of the function
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + authTokens.access,
    "Accept": "application/json",
  };

  function handleCheckboxChange(event, row) {
    const updatedSelectedCribrooms = event.target.checked
      ? [...selectedCribrooms, row] // Add to selected crib rooms
      : selectedCribrooms.filter((crib) => crib.id !== row.id); // Remove from selected crib rooms
    setSelectedCribrooms(updatedSelectedCribrooms);
  }

  const iframeRef = useRef();
  function handlePdfClick() {
    // Iterate through each selected cribroom and send a GET request
    selectedCribrooms.forEach((cribroom) => {

      technicalReport_request(authTokens.access, 'get', cribroom.id, startDate, endDate)
        .then((response) => {
          if (!response.data) {
            throw new Error("Network response was not ok");
          }

          const data = response.data;

          if (data && data.pays) {
            console.log(
              "API Response for Cribroom",
              cribroom.id,
              data,
              data.pays
            );
            DownloadPDF(
              formData.ministro,
              formData.resolucion,
              formData.remitanse,
              cribroom.entity,
              cribroom.name,
              cribroom.code,
              cribroom.street,
              cribroom.house_number,
              cribroom.locality.locality,
              cribroom.department,
              data.pays.totalSumStr,
              data.pays.totalSumInitMonth,
              data.pays.totalSumInitYear,
              data.pays.totalSumEndMonth,
              data.pays.totalSumEndYear,
              data.maxCapacityStr,
              cribroom.max_capacity,
              data.pays.firstSubTotalSumEndMonth,
              data.pays.SecSubTotalSumInitMonth,
              data.pays.totalSumFloat,
              data.pays.firstSubTotalSumFloat,
              data.pays.SecSubTotalSumFloat
            );
          } else {
            console.error("Data or 'pays' property is undefined:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          deletingData();
        });
    });
    setSelectedCribrooms([]);
  }

  function handleCreateClick() {
    setModalCreateShow(true);
  }

  const [formFields, setFormFields] = useState({
    encabezados: [
    {
      name: "encabezado",
      label: "Encabezado Principal",
      type: "text",
      placeholder: "Modificar encabezado",
      // defaultValue: user ? user.first_name : "",
      required: true,
    },
    {
      name: "ministro",
      label: "Ministro",
      type: "text",
      placeholder: "Modificar ministro",
      // defaultValue: user ? user.last_name : "",
      required: true,
    },
    {
      name: "resolucion",
      label: "Resolucion",
      type: "text",
      placeholder: "Modificar resolucion",
      // defaultValue: user ? user.last_name : "",
      required: true,
    },
    {
      name: "remitanse",
      label: "Remitanse",
      type: "text",
      placeholder: "Modificar enunciado remitanse",
      // defaultValue: user ? user.last_name : "",
      required: true,
    },
  ]});

  const [formData, setFormData] = useState({});  /// mas adelante get request para obtener cribroom basado en los props id
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    loadZones();
    loadTechnicalReportTable();
  }, []);

  useEffect(() => {
    if (selectedZone) {
      loadCribrooms(selectedZone);
    } else {
      defaultCribrooms();
    }
  }, [selectedZone]);

  async function defaultCribrooms() {
    try {
      const response = await cribroom_request(authTokens.access); // Pass JWT token
      const jsonData = response.data;
      setCribrooms(jsonData);
    } catch (error) {
      console.error("Error fetching cribrooms:", error);
      handlePermissions(error.response.status);
    }
  }

  async function loadCribrooms(zoneId) {
    try {
      const response = await cribroom_request(authTokens.access, 'get', 0, {}, undefined, `&locality__department__zone__id=${zoneId}`);
      const data = response.data;
      if (data.length === 0) {
        alert("No hay Salas Cunas en la zona seleccionada");
      }
      setCribrooms(data);
    } catch (error) {
      console.error("Error fetching cribrooms:", error);
    }
  }

  async function loadZones() {
    try {
      const response = await zone_request(authTokens.access); // Pass JWT token
      const jsonData = response.data;
      setZoneOptions(jsonData);
    } catch (error) {
      console.error("Error fetching zone options:", error);
    }
  }

  async function loadTechnicalReportTable() {
    try {
      const response = await getTechnicalReportTableListCreateView(authTokens.access); // Pass JWT token
      const jsonData = response.data[0];
      setFormData(jsonData);
      console.log('formData: ', formData);
    } catch (error) {
      console.error("Error fetching zone options:", error);
    }
  }

  function handleSelectChange(event) {
    setSelectedZone(event.target.value);
  }

  const columns = [
    { field: "code", headerName: "Código", width: 150 },
    { field: "name", headerName: "Nombre Sala", width: 160 },
    { field: "cuit", headerName: "CUIT", width: 170 },
    { field: "entidad", headerName: "Entidad", width: 170 },
    { field: "cantidad_ninos", headerName: "Cantidad de Niños", width: 150 },
    {
      field: "select",
      headerName: "Seleccionar",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedCribrooms.some((crib) => crib.id === params.row.id)}
          onChange={(e) => handleCheckboxChange(e, params.row)}
        />
      ),
    },
  ];

  return (
    <>
      <body>

        {modalCreateShow && (
              <TechnicalReportHeadersModal
                formFields={formFields}
                handleInputChange={handleInputChange}
                formData={formData}
                show={modalCreateShow}
                onHide={() => {
                  setModalCreateShow(false);
                  /* window.location.reload(); */
                }}
              />
        )}

        <ToastContainer />
        <h1 className="titulo-cb">Informe Tecnico</h1>
        <div className="contenedor-linea-report">
          <hr className="linea-report"></hr>
        </div>
        <Row>
          <Col className="col-md-2 mb-3 ">
            <Form.Label className="mb-1">Seleccionar Zona</Form.Label>
            <Form.Select
              className="mb-1"
              name="zoneCR"
              as="select"
              value={selectedZone}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Seleccionar Zona
              </option>
              {zoneOptions.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col className="add-payout-button">
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleCreateClick()}
            >
              Modificar Encabezados
            </Button>
            </Col>
          <Col>
            <div className="add-payout-button-tr mb-3 mt-3">
              <iframe
                ref={iframeRef}
                style={{ display: "none" }}
                title="PDFFrame"
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handlePdfClick}
              >
                Generar PDF
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="col-md-3 mb-1">
            {/* Start Date Selector */}
            <InputGroup className="mb-3 col-md-3">
              <InputGroup.Text>Fecha de Inicio</InputGroup.Text>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col className="col-md-3 mb-1">
            {/* End Date Selector */}
            <InputGroup className="mb-3 col-md-3">
              <InputGroup.Text>Fecha de Fin</InputGroup.Text>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
 
        <div className="DataGrid-Wrapper-report">
          <DataGrid
            className="custom-data-grid"
            style={{ borderRadius: "15px", margin: "20px" }}
            rows={cribrooms}
            columns={columns}
            columnBuffer={2}
            columnThreshold={2}
          />
        </div>
      </body>
    </>
  );
}
