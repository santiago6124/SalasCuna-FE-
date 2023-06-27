import React, {useContext} from 'react';
import AuthContext from '../../context/AuthContext';

import './Menu.css';
import logo from '../../media/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Menu = () => {
    let {user, logoutUser} = useContext(AuthContext);
    return (
        <Navbar expand="lg" className='navbar'>
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src={logo} alt="logo de" className='logo'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        
                        <Link to='/añadir-chico'>
                            <Nav className='titulo'>Añadir Chico</Nav>
                        </Link>
                        <Link to='/generate-padron'>
                            <Nav className='titulo'>Generar Padron</Nav>
                        </Link>
                        
                        {user ? (
                                <Link to='/'>
                                    <Button className="boton" boton variant="primary" onClick={logoutUser}>Log Out</Button>
                                </Link>
                            ) : (
                                <Link to='/login'>
                                    <Button className="boton" boton variant="primary">Log In</Button>
                                </Link>
                            )
                        }

                    </Nav>

                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}

export default Menu;