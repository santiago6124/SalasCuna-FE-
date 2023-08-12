import React, { useEffect, useState } from "react";

import "../AddChildren/AddChildren.css";

import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";
import Form from "react-bootstrap/Form/";
import { Button } from "react-bootstrap";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';


export default function Payout() {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [selectedZona, setSelectedZone] = useState("");
  const [zone1Payouts, setZone1Payouts] = useState([]);
  const [zone2Payouts, setZone2Payouts] = useState([]);

  useEffect(() => {
    loadZones();
    loadZone1Payouts();
    loadZone2Payouts();
  }, []);
  const loadZone1Payouts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/payout/?zone=1");
      const jsonData = await response.json();
      setZone1Payouts(jsonData);
    } catch (error) {
      console.error("Error fetching Zone 1 payouts:", error);
    }
  };
  
  const loadZone2Payouts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/payout/?zone=2");
      const jsonData = await response.json();
      setZone2Payouts(jsonData);
    } catch (error) {
      console.error("Error fetching Zone 2 payouts:", error);
    }
  };

  const loadZones = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/zone/");
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
        "http://127.0.0.1:8000/api/payout/",
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
      <div>
  <h2>Zone 1 Payouts</h2>
  <DataGrid
    rows={zone1Payouts}
    columns={[
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'amount', headerName: 'Amount', width: 130 },
      { field: 'date', headerName: 'Date', width: 130 },
    ]}
    autoHeight
    pageSize={5}
  />
</div>
<div>
  <h2>Zone 2 Payouts</h2>
  <DataGrid
    rows={zone2Payouts}
    columns={[
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'amount', headerName: 'Amount', width: 130 },
      { field: 'date', headerName: 'Date', width: 130 },
    ]}
    autoHeight
    pageSize={5}
  />
</div>
    </div>
    
  );
}

