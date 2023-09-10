import React, { useState } from 'react';
import './menuTest.css';
import Menu from '../../components/Menu/Menu';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function MenuTest() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="App">
      <Menu openSidebar={openSidebar} />
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      {/* Resto de tu contenido */}
    </div>
  );
}

