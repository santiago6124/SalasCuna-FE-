import "./GeneratePadron.css";


import Table from "react-bootstrap/Table/";

import React, { useEffect, useState } from "react";

const GeneratePadron = () => {
  const [child, setChild] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/child/");
        const jsonData = await response.json();
        setChild(jsonData);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  // Render the data in a table
  return (
      <div className="container-note mt-5">
      <div className="container-titulo-note ">
        <h1>Generar Padron</h1>
      </div>
      <div className="contenedor-linea-note">
        <hr className="linea-note"></hr>
      </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Apellido</th>
          <th>Nombre</th>
          <th>N° DNI</th>
          <th> Fecha de Nacimiento</th>
          <th>Edad</th>
          <th>Sexo</th>
        </tr>
      </thead>
      <tbody>
        {child.map((child) => (
          <tr key={child.id}>
            <td>{child.last_name}</td>
            <td>{child.first_name}</td>
            <td>{child.dni}</td>
            <td>{child.birthdate}</td>
            <td>{child.age}</td>
            <td>{child.sex}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default GeneratePadron;
