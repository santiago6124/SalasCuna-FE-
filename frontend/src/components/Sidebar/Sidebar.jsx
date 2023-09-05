import React from 'react';
import './Sidebar.css';
import { faHourglass1 } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={closeSidebar}>Cerrar Sidebar</button>
      {<h1>Texto</h1>}
    </div>
  );
};

export default Sidebar;
