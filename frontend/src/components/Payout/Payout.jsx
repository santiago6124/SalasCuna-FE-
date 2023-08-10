import React, { useEffect, useState } from "react";

import "../AddChildren/AddChildren.css";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function Payout() {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [selectedZona, setSelectedZone] = useState("");

  useEffect(() => {
    loadZones();
  }, []);

  const loadZones = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/ZoneViewSet/");
      let jsonData = await response.json();
      setZoneOptions(jsonData);
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedZone(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const payload = {
      amount: formData.get("amount"),
      date: formData.get("date"),
      zone: selectedZona, // Use the selectedZona state here
    };
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/PayoutViewSet/",
        payload
      );
  
      console.log(payload);
  
      if (response.status === 201) {
        console.log("Payout added successfully");
        // Perform any further actions, such as refreshing the UI
      } else {
        console.log("Failed to add payout");
      }
    } catch (error) {
      console.error("An error occurred while adding payout:", error);
    }
  };
  

  return (
    <div>
      <h1>Add Payout</h1>
      <form onSubmit={handleSubmit}>
        <label>Amount:</label>
        <input type="number" name="amount" required />
        <br />
        <label>Date:</label>
        <input type="date" name="date" required />
        <br />
        <Form.Label className="mb-1">Zona</Form.Label>
        <Form.Select
  name="zoneCR"
  as="select"
  value={selectedZona}
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
        <br />
        <button type="submit">Add Payout</button>
      </form>
    </div>
  );
}