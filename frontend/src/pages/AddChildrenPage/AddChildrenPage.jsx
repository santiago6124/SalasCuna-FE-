import React from 'react'
import Menu from '../../components/Menu/Menu.jsx'
import ChildrenManagement from "../../components/ChildrenDashboard/Children-management.jsx";
import "../../components/ChildrenDashboard/ChildrenManagement.css"

export default function AñadirChicoPage() {
    return (
      <div className="App">
        <header style={{ marginTop: 90 }}>
          <Menu />
        </header>
        <body className='mt-3'>
          <div className='mt-5'>
            <ChildrenManagement />
          </div>
        </body>
      </div>
    );
};

