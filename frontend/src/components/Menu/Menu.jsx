import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import '../Menu/Menu.css';
import logo from '../../media/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Menu = ({logout, isAuthenticated}) => {
  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
      logout();
      setRedirect(true);
  };

  const guestLinks = () => (
      <Fragment>
          <li className='nav-item'>
              <Link className='nav-link' to='/login'>Login</Link>
          </li>
          <li className='nav-item'>
              <Link className='nav-link' to='/signup'>Sign Up</Link>
          </li>
      </Fragment>
  );

  const authLinks = () => (
      <li className='nav-item'>
          <a className='nav-link' href='#!' onClick={logout_user}>Logout</a>
      </li>
  );


  return (
    <Navbar expand="lg" className='navbar'>
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={ logo } alt="logo de" className='logo'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link to='# ../pages/añadirChicoPage.jsx'>Añadir Chico</Nav.Link>
            <Nav.Link to='../pages/añadirChicoPage.jsx'>Añadir Chico</Nav.Link>
            <Nav.Link to='../pages/añadirSalaPage.jsx'>Añadir Sala</Nav.Link>
            <Nav.Link to='../pages/createUserPage.jsx'>Crear Usuario</Nav.Link>
            <Nav.Link to='../pages/darBajaChicoPage.jsx'>Bajar Chico</Nav.Link>
            <Nav.Link to='../pages/darBajaSalaPage.jsx'>Bajar Sala</Nav.Link>
            <Nav.Link to='../pages/editarSalaPage.jsx'>Editar Sala</Nav.Link>
            <Nav.Link to='../pages/loginPage.jsx'>Login</Nav.Link>
            <Nav.Link to='../pages/notaPagoPage.jsx'>Nota Pago</Nav.Link>
            <Nav.Link to='../pages/padronPage.jsx'>Padron</Nav.Link>
            <Nav.Link to='../pages/presupuestoPage.jsx'>Presupuesto</Nav.Link>
          </Nav>

          {isAuthenticated ? authLinks() : guestLinks()}

        </Navbar.Collapse>
      </Container>

      {redirect ? <Navigate to='/' /> : <Fragment></Fragment>}
      
    </Navbar>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Menu);