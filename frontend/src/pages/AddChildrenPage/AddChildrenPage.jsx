import React from 'react'
import Menu from '../../components/Menu/Menu.jsx'
import ChildrenManagement from "../../components/DropdownCribroomList/Children-management.jsx";
import "../../components/DropdownCribroomList/DropdownCribroomList.css"
import './AddChildrenPage.css';

export default function AñadirChicoPage() {
    return (
      <div className="App">
        <body>
          <header className='header-ac'>
            <Menu />
          </header>
          <div>
            <ChildrenManagement />
          </div>
        </body>
      </div>
    );
};

