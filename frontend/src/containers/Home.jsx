import {React, useContext} from 'react';
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import Menu from './Menu';

const Home = () => {
    const {user} = useContext(AuthContext);
    return (
        <>
          <Menu
            user={user}
            logoutUser={logoutUser}
            link1Text="Custom Link 1"
            link1Path="/custom-link-1"
            link2Text="Custom Link 2"
            link2Path="/custom-link-2"
          />
                  <div className='container'>
            <div class='jumbotron mt-5'>
                <h1 class='display-4'>Bienvenido a SalasCuna</h1>
                <p class='lead'>Esta version del sistema permite registrar un usuario, ingresar con el usuario creado, añadir un chico a la base de datos y ver el padron.</p>
                <hr class='my-4'/>
            </div>
        </div>
        </>
      );
    };

export default Home;