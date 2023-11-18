import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Row } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";

import "./CribroomDashboard.css";

export default function HistoryTimeline(props) {
  const { id, tokens, type, itemType } = props;
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    loadHistory(id, type);
  }, [id, type]);

  async function loadHistory(itemId, itemType) {
    try {
      console.log("itemType is:", itemType);
      const response = await axios.get(
        `/api/${itemType}/?no_depth&id=${itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: "JWT " + tokens,
          },
        }
      );
      let data = await response.data; // Extract JSON data
      setHistoryData(data[0]?.history || []); // Set history data or an empty array if not available
      console.log("working with object: ", { data });
    } catch (error) {
      console.error(`Error fetching ${itemType} history data:`, error);
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

  const historyItems = historyData.map(
    (event, index, itemType, data) => (
      console.log(event),
      (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot />
            {index < historyData.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Paper className="p-1 h-80 w-100 card-text">
              <Row className="ms-1 ">
                <Typography variant="h8" component="h8" className=" ms-1 ">
                  Nombre:{" "}
                  {
                    (itemType = "child"
                      ? event.first_name
                      : (itemType = "cribroom"))
                  }
                </Typography>
              </Row>
              <Row className="ms-1">
                <Typography
                  variant="h8"
                  component="h8"
                  className="justify-content-left ms-1"
                >
                  Fecha: {event.history_date}
                </Typography>
              </Row>
              <Row className="ms-1">
                <Typography variant="h8" component="h8" className=" ms-1 ">
                  Tipo: {getHistoryTypeString(event.history_type)}
                </Typography>
              </Row>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      )
    )
  );

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <h2 className="titulo-cb mt-3">Historial de: {id}</h2>
      <div className="contenedor-linea-cb">
        <hr className="linea-cb"></hr>
      </div>
      <Timeline position="alternate">{historyItems}</Timeline>
    </Modal>
  );
}
