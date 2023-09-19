import React from "react";
import "./Sidebar.css";

import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

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
      <div className="sidebar-container">
        <button className="config-button" onClick={() => Redirects("/home-page")}>
          <FontAwesomeIcon icon={faHouse} size="lg" style={{ color: "#0FAAE1", marginRight: '6px' }} />
          <span className="config-text">Home</span>
        </button>

        <button className="config-button" onClick={() => Redirects("/agregar-usuario")}>
          <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#0FAAE1", marginRight: '6px' }} />
          <span className="config-text">Agregar Usuario</span>
        </button>

        <button className="config-button" onClick={() => Redirects("/children-management")}>
          <FontAwesomeIcon icon={faBaby}  size="lg" style={{ color: "#0FAAE1", marginRight: '6px' }} />
          <span className="config-text">Agregar Chico</span>
        </button>

        <button className="config-button" onClick={() => Redirects("/gestion-sala")}>
          <FontAwesomeIcon icon={faPeopleRoof} size="lg" style={{ color: "#0FAAE1", marginRight: '6px' }} />
          <span className="config-text">Gestion de Salas</span>
        </button>

        <button className="config-button" onClick={() => Redirects("/informe-tecnico")}>
          <FontAwesomeIcon icon={faNewspaper} size="lg" style={{ color: "#0FAAE1", marginRight: '6px' }} />
          <span className="config-text">Informe tecnico</span>
        </button>

        <button className="config-button" onClick={() => Redirects("/generate-padron")}>
          <FontAwesomeIcon icon={faFileCirclePlus} size="lg" style={{ color: "#0FAAE1", marginRight: '6px' }} />
          <span className="config-text">Generar Padron</span>
        </button>

        <button className="config-button" onClick={() => Redirects("/listar-usuarios")}>
          <FontAwesomeIcon icon={faAddressBook} size="lg" style={{ color: "#0FAAE1", marginRight: '6px' }} />
          <span className="config-text">Lista de Usuarios</span>
        </button>

        <button className="config-button" onClick={() => Redirects("/maestro-montos")}>
          <FontAwesomeIcon icon={faChartLine}  size="lg" style={{ color: "#0FAAE1", marginRight: '6px' }} />
          <span className="config-text">Maestro Monto</span>
        </button>



      </div>
      
    </div>
  );
};

export default Sidebar;
