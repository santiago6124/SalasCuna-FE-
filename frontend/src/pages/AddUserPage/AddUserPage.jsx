import React from 'react'

import "./AddUserPage.css";
import AddUser from "../../components/AddUser/AddUser.jsx";
import Menu from '../../components/Menu/Menu.jsx'

function AddUserPage() {
  return (
    <div className="App">
      <body>
        <header className="header-su">
          <Menu />
        </header>
        <div>
          <AddUser />
        </div>
      </body>
    </div>
  );
}

export default SingUpPage