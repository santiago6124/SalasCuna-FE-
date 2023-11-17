import React, { useContext } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Menu from '../components/Menu/Menu';
import backgroundImage from '../media/Sala-cuna_x4.png'; // Replace this with the path to your background image
 
const Home = (logoutUser) => {
    const { user } = useContext(AuthContext);

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Center the content both horizontally and vertically
    };

    const whiteBoxStyle = {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '600px',
        textAlign: 'center',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)', // Adding a shadow effect
    };

    return (
        <>
            <Menu
                user={user}
                logoutUser={logoutUser}
            />
            <div className='background-image'>
                <div style={containerStyle}>
                    <div className='jumbotron mt-5 contenedor-texto' >
                        <div style={whiteBoxStyle}>
                            <h1 className='display-4'>Bienvenido a Salas Cuna</h1>
                            <p className='lead'>Esta versión del sistema permite registrar un usuario, ingresar con el usuario creado, añadir un chico a la base de datos y ver el padrón.</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default Home;
