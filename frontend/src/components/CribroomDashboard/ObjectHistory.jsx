import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Cookies from "js-cookie";
import axios from "axios";

import "./CribroomDashboard.css";

// ... (other imports)

export default function HistoryTimeline(props) {
  const [selectedCribroom, setSelectedCribroom] = useState("");
  const [cribroom, setCribroom] = useState([]);

  useEffect(() => {
    setSelectedCribroom(props.id);
    loadSelectedCribroom(props.id);
  }, [props]);

  async function loadSelectedCribroom(cribroomId) {
    try {
      const response = await axios.get(
        `/api/cribroom/?no_depth&id=${cribroomId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: "JWT " + props.tokens,
          },
        }
      );
      let data = await response.data; // Extract JSON data
      setCribroom(data[0]);
      console.log("working with object: ", { cribroom });
    } catch (error) {
      console.error("Error fetching selected cribroom data:", error);
    }
  }

  // Check if cribroom.history is defined before mapping
  const historyItems = cribroom.history && cribroom.history.map((event, index) => (
    <TimelineItem key={index}>
      <TimelineSeparator>
        <TimelineDot />
        {index < cribroom.history.length - 1 && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>Nombre: {event.name}</TimelineContent>
    </TimelineItem>
  ));

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <h2 className="titulo-cb mt-3">Historial de: {cribroom.name}</h2>
      <div className="contenedor-linea-cb">
        <hr className="linea-cb"></hr>
      </div>
      <Timeline position="alternate">{historyItems}</Timeline>
    </Modal>
  );
}

