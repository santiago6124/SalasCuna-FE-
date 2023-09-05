import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
  if (!isOpen) {
    return null; 
  }

  return (
    <div className="sidebar">
      
      <h1>HOLA</h1>
    </div>
  );
};

export default Sidebar;