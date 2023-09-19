import React from 'react'

import './SingUpPage.css'
import SingUp from '../../components/SignUp/SignUp.jsx'
import Menu from '../../components/Menu/Menu.jsx'

function SingUpPage() {
    return (
        <div className="App">
          <body>
            <header className='header-su'>
              <Menu />
            </header>
            <div>
              <SingUp />
            </div>
          </body>
        </div>
      );
}

export default SingUpPage