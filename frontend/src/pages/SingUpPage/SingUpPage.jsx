import React from 'react'

import SingUp from '../../components/SignUp/SignUp.jsx'
import Menu from '../../components/Menu/Menu.jsx'

function SingUpPage() {
    return (
        <div className="App">
          <body>
            <header>
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