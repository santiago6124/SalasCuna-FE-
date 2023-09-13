import React, { useContext, useState } from 'react';
import './Menu.css';
import logo from '../../media/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


import AuthContext from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar/Sidebar'; // Importa Sidebar
import Profile from '../Profile/Profile';

export default function Menu() {
  let { user, logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // Estado para la barra lateral

  const [showPopover, setShowPopover] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null);

  const togglePopover = (event) => {
    setShowPopover(!showPopover);
    setPopoverTarget(event.target);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <span
          className={`circle-icon-bar ${isOpen ? 'clicked' : ''}`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} size="xl" className="bar" />
        </span>
        <Navbar.Brand>
          <img src={logo} alt="logo de" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="boton">
            {user ? (
              <span
                className='circle-icon-user'
                
              >
                <Profile/>
              </span>
            ) : (
              <Link to="/login">
                <Button variant="primary">Log In</Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Sidebar isOpen={isOpen} /> {/* Pasa el estado isOpen a Sidebar */}
      
    </Navbar>
  );
}
