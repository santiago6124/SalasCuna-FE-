import React from "react";
import "./Sidebar.css";

import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const Redirects = (ruta) => {
    navigate(ruta);
  };

  return (
    <div className="sidebar">
      <Button
        className="sidebar-button"
        type="submit"
        size="m"
        onClick={() => Redirects("/home")}
      >
        {" "}
        Home{" "}
      </Button>
      <Button
        className="sidebar-button"
        type="submit"
        size="m"
        onClick={() => Redirects("/login")}
      >
        {" "}
        Iniciar Sesión{" "}
      </Button>
      <Button
        className="sidebar-button"
        type="submit"
        size="m"
        onClick={() => Redirects("/users/new")}
      >
        {" "}
        Agregar Usuario{" "}
      </Button>
      <Button
        className="sidebar-button"
        type="submit"
        size="m"
        onClick={() => Redirects("/children-management")}
      >
        Cargar Chico
      </Button>
      <Button
        className="sidebar-button"
        type="submit"
        size="m"
        onClick={() => Redirects("/cribrooms")}
      >
        Gestionar Salas
      </Button>
      <Button
        className="sidebar-button"
        type="submit"
        size="m"
        onClick={() => Redirects("/technical-report")}
      >
        Informe Tecnico
      </Button>
      <Button
        className="sidebar-button"
        type="submit"
        size="m"
        onClick={() => Redirects("/generate-padron")}
      >
        Generar Padron
      </Button>
      <Button
        className="sidebar-button"
        type="submit"
        size="m"
        onClick={() => Redirects("/users")}
      >
        Listar Usuarios
      </Button>
    </div>
  );
};

export default Sidebar;
