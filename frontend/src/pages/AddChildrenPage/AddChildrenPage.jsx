import React from 'react'
import Menu from '../../components/Menu/Menu.jsx'
import ChildrenManagement from "../../components/ChildrenDashboard/Children-management.jsx";
import "../../components/ChildrenDashboard/ChildrenManagement.css"

export default function AñadirChicoPage() {
    return (
      <div className="App">
        <body>
          <header>
            <Menu />
          </header>
          <div>
            <ChildrenManagement />
          </div>
        </body>
      </div>
    );
};

