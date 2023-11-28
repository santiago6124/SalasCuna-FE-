import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Row } from "react-bootstrap";

import Cookies from "js-cookie";
import axios from "axios";

import "./CribroomDashboard.css";

// Utility function to compare two objects and return the differences
const getObjectDifferences = (obj1, obj2, excludedFields) => {
  const differences = {};

  for (const key in obj1) {
    if (excludedFields.includes(key)) {
      continue; // Skip excluded fields
    }

    if (obj1[key] !== obj2[key]) {
      differences[key] = {
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
  }

  return differences;
};

const renderChangedFields = (objectDifferences) => {
  return Object.keys(objectDifferences).map((key) => (
    <Row key={key} className="ms-1">
      <Typography variant="h9" component="h9" className="ms-1">
        {getFieldTitle(key)}: {objectDifferences[key].oldValue}
      </Typography>
    </Row>
  ));
};

const getFieldTitle = (fieldName) => {
  // You can customize this function based on your field naming conventions
  switch (fieldName) {
    case "first_name":
      return "Nombre";
    case "last_name":
      return "Apellido";
    case "history_date":
      return "Fecha";
    case "dni":
      return "DNI";
    case "birthdate":
      return "Nacimiento";
    case "house_number":
      return "Numero de casa";
    case "registration_date":
      return "Registro";
    case "disenroll_date":
      return "Fecha de baja";
    case "locality":
      return "localidad";
    case "cribroom":
      return "Sala Cuna";
    case "shift":
      return "Turno";
    // Cribroom Field Names

    case "name":
      return "Nombre";
    case "entity":
      return "Entidad";
    case "CUIT":
      return "CUIT";
    case "code":
      return "Código";
    case "max_capacity":
      return "Capacidad Máxima";
    case "is_active":
      return "Activo";
    case "street":
      return "Calle";
    case "house_number":
      return "Número de Casa";
    case "locality":
      return "Localidad";
    case "department":
      return "Departamento";
    case "neighborhood":
      return "Barrio";
    case "shift":
      return "Turno";
    case "zone":
      return "Zona";
    case "user":
      return "Usuario";
    default:
      return fieldName;
  }
};

export default function HistoryTimeline(props) {
  const { id, tokens, type, itemType } = props;
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    loadHistory(id, type);
  }, [id, type]);

async function loadHistory(itemId, itemType) {
  if (itemType === "child") {
    try {
      console.log("itemType is:", itemType);
      const response = await axios.get(
        `/api/${itemType}/?depth=1&id=${itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: "JWT " + tokens,
          },
        }
      );
      let data = response.data;
      setHistoryData(data[0]?.history || []);
      console.log("working with object: ", { data });
    } catch (error) {
      console.error(`Error fetching ${itemType} history data:`, error);
    }
  } else if (itemType === "cribroom") {
    try {
      console.log("itemType is:", itemType);
      const response = await axios.get(
        `/api/${itemType}/?depth=0&id=${itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: "JWT " + tokens,
          },
        }
      );
      let data = response.data;
      setHistoryData(data[0]?.history || []);
      console.log("working with object: ", { data });
    } catch (error) {
      console.error(`Error fetching ${itemType} history data:`, error);
    }
  }
}



  const getHistoryTypeString = (type) => {
    switch (type) {
      case "+":
        return "Creado";
      case "-":
        return "Eliminado";
      case "~":
        return "Editado";
      default:
        return "Razon desconocida";
    }
  };

  const historyItems = historyData.map((event, index) => {
    // Define an array of fields to exclude from differences based on itemType
    const commonExcludedFields = ["history_id", "history_type", "history_user"];

    const excludedFields = [...commonExcludedFields];

    // Add itemType-specific fields to excludedFields

    const objectDifferences = getObjectDifferences(
      event,
      index > 0 ? historyData[index - 1] : {},
      excludedFields
    );

    const historyTypeString = getHistoryTypeString(event.history_type);

    return (
      console.log(event),
      (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot />
            {index < historyData.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Paper className="p-1 h-80 w-100 card-text">
              {historyTypeString.toLowerCase() === "creado" && (
                <>
                  {itemType === "child" && (
                    <Row className="ms-1">
                      <Typography variant="h8" component="h8" className="ms-1">
                        Nombre: {event.first_name}
                      </Typography>
                    </Row>
                  )}
                  {itemType === "cribroom" && (
                    <Row className="ms-1">
                      <Typography variant="h8" component="h8" className="ms-1">
                        Nombre: {event.name}
                      </Typography>
                    </Row>
                  )}

                  <Row className="ms-1">
                    <Typography variant="h8" component="h8" className="ms-1">
                      Fecha: {event.history_date}
                    </Typography>
                  </Row>
                  <Row className="ms-1">
                    <Typography variant="h8" component="h8" className="ms-1">
                      Tipo: {getHistoryTypeString(event.history_type)}
                    </Typography>
                  </Row>
                </>
              )}
              {historyTypeString.toLowerCase() !== "creado" && (
                <>
                  {renderChangedFields(objectDifferences)}
                  <Row className="ms-1">
                    <Typography variant="h8" component="h8" className="ms-1">
                      Tipo: {getHistoryTypeString(event.history_type)}
                    </Typography>
                  </Row>
                </>
              )}
            </Paper>
          </TimelineContent>
        </TimelineItem>
      )
    );
  });

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
      className="p-1 mt-3 mb-3"
      centered
    >
      <Scrollbars style={{ height: 600 }}>
        <h2 className="titulo-cb mt-3">Historial de: {id}</h2>
        <div className="contenedor-linea-cb">
          <hr className="linea-cb"></hr>
        </div>
        <Timeline position="alternate">{historyItems}</Timeline>
      </Scrollbars>
    </Modal>
  );
}
