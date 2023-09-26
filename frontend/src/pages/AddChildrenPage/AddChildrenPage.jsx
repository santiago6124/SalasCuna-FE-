import React from 'react'
import Menu from '../../components/Menu/Menu.jsx'
import ChildrenManagement from "../../components/ChildrenDashboard/Children-management.jsx";
import "../../components/ChildrenDashboard/ChildrenManagement.css"

export default function AñadirChicoPage() {
    return (
      <div className="App">
        <header>
          <Menu className="mb-7"/>
        </header>
        <body className='mt-3'>
          <div>
            <ChildrenManagement />
          </div>
        </body>
      </div>
    );
};

