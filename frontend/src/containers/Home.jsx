import {React, useContext} from 'react';
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const Home = () => {
    const {user} = useContext(AuthContext);

    return (
        <div className='container'>
            <div class='jumbotron mt-5'>
                <h1 class='display-4'>Bienvenido a Salas Cuna</h1>
                <p class='lead'>Esta version del sistema permite registrar un usuario, ingresar con el usuario creado, añadir un chico a la base de datos y ver el padron.</p>
                <hr class='my-4'/>
            </div>
        </div>
    )
};

export default Home;