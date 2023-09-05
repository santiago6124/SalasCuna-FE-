import {React, useContext} from 'react';
import './Menu.css';
import logo from '../../media/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import AuthContext from "../../context/AuthContext";

export default function Menu({openSidebar}) {

  let {user, logoutUser} = useContext(AuthContext)

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
          <span  className="circle-icon" onClick={openSidebar}> 
            <FontAwesomeIcon icon={faBars} size='xl' className='bar' /> 
          </span>
        <Navbar.Brand >
          <img src={logo} alt="logo de" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className='boton'> 
            {user ? (
              <Button variant="primary" onClick={logoutUser}>
                Log Out
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="primary">
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


