import React from 'react'

import '../Menu/Menu.css';
import logo from '../../media/logo.png';

import '../../styles/styles.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export function Menu() {
  return (
    <Navbar expand="lg" className='navbar'>
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={ logo } alt="" className='logo'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href='# ../pages/añadirChicoPage.jsx'>Añadir Chico</Nav.Link>
            <Nav.Link href='../pages/añadirChicoPage.jsx'>Añadir Chico</Nav.Link>
            <Nav.Link href='../pages/añadirSalaPage.jsx'>Añadir Sala</Nav.Link>
            <Nav.Link href='../pages/createUserPage.jsx'>Crear Usuario</Nav.Link>
            <Nav.Link href='../pages/darBajaChicoPage.jsx'>Bajar Chico</Nav.Link>
            <Nav.Link href='../pages/darBajaSalaPage.jsx'>Bajar Sala</Nav.Link>
            <Nav.Link href='../pages/editarSalaPage.jsx'>Editar Sala</Nav.Link>
            <Nav.Link href='../pages/loginPage.jsx'>Login</Nav.Link>
            <Nav.Link href='../pages/notaPagoPage.jsx'>Nota Pago</Nav.Link>
            <Nav.Link href='../pages/padronPage.jsx'>Padron</Nav.Link>
            <Nav.Link href='../pages/presupuestoPage.jsx'>Presupuesto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}