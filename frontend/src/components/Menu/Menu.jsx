import {React, useContext} from 'react';
import './Menu.css';
import logo from '../../media/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AuthContext from "../../context/AuthContext";

const Menu = () => {

  let {user, logoutUser} = useContext(AuthContext)

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo de" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            {user ? (
              <Button className="boton" variant="primary" onClick={logoutUser}>
                Log Out
              </Button>
            ) : (
              <Link to="/login">
                <Button className="boton" variant="primary">
                  Log In
                </Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
