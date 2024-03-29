import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Account from "../../components/Account/Account";
import Menu from "../../components/Menu/Menu";
// import profileImage from "../../media/Profile.jpg";
import profileImage from "../../media/TS.png";
import "../../components/Account/Account.css";
import Modal from "react-bootstrap/Modal";
import Alert from "@mui/material/Alert";
import { ToastContainer } from "react-toastify";
import { updateData, warningData } from "../../utils/toastMsgs";

import axios from "axios";
import Cookies from "js-cookie";
import AuthContext from "../../context/AuthContext";
import EditAccount from "../../components/Account/EditAccount";

import './ProfilePage.css';

export default function ProfilePage() {
  let { user, authTokens } = useContext(AuthContext);

  const [showAccount, setShowAccount] = useState(true);
  const [showPasswordRequest, setShowPasswordResquest] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => setShowPasswordResquest(false);

  const [EditAccountIsVisible, setEditAccountIsVisible] = useState(false);

  const [userData, setUserData] = useState("");

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserData(data);
      })
      .finally(console.log(userData));
  }, []);

  function manageAccount() {
    setShowPassword(false);
    setEditAccountIsVisible(false)
    setShowAccount(true);
  }

  function toggleEditAccount() {
    setEditAccountIsVisible(true);
    setShowAccount(false)
  }

  function managePasswordRequest() {
    if (!showPassword) {
      setShowPasswordResquest(true);
    }
  }

  async function getUser() {
    try {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "JWT " + authTokens.access,
        Accept: "application/json",
      };
      const response = await axios.get(`/auth/users/${user.user_id}/`, {
        headers: headers,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  async function resetPasswordRequest() {
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
      Authorization: "JWT " + authTokens.access,
    };
    const payload = {
      email: userData.email, 
    };
    try {
      let response = await axios.post("/auth/users/reset_password/", payload, {
        headers: headers,
      });
      if (response.request.status === 204) {
        updateData("Se envió una solucitud a su correo electronico")
      }
    } catch (error) { 
      warningData("Ocurrio un error durante la solicitud")
    }
  }

  return (
    <div className="App">
      <header style={{ marginTop: 100 }}>
        <div>
          <Menu />
        </div>
      </header>
      <body>
        <ToastContainer />
        <div className="div-container">
          <Row>
            <Col md={3}>
              <div className="MainDiv">
                <div className="image-container justify-content-center d-flex">
                  <img
                    src={profileImage}
                    alt="Perfil"
                    className="circle-image"
                  />
                </div>
                <div className="mt-2 justify-content-center d-flex">
                  <h3>Hola {userData.first_name}!</h3>
                </div>
                <div className="contenedor-linea-sm">
                  <hr className="linea-sm"></hr>
                </div>
                <Col className="mt-1 mb-2 columna-btn">
                  <Button
                    variant="prueba"
                    className={`prueba ${showAccount ? "active" : ""}`}
                    onClick={() => manageAccount()}
                    style={{ borderLeft: "5px solid #ef7e0e", marginBottom: "10px" }}
                  >
                    Información
                  </Button>


                  <Button
                    variant="prueba"
                    className={`prueba ${EditAccountIsVisible ? "active" : ""}`}
                    onClick={() => toggleEditAccount()}
                    style={{ borderLeft: "5px solid #ef7e0e", marginBottom: "10px" }}
                  >
                    Editar Información
                  </Button>

                  <Button
                    variant="pwbutton"
                    className="pwbutton"
                    onClick={() => managePasswordRequest()}
                    style={{ borderLeft: "5px solid #ef7e0e", marginBottom: "10px" }}
                  >
                    Cambiar contraseña
                  </Button>
                </Col>
              </div>
            </Col>
            <Col className="col-account">
              {showAccount && <Account />}
              {showPasswordRequest && (
                <Modal
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={showPasswordRequest}
                  onHide={handleClose}
                  keyboard={false}
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Row className="ps-4 w-100 align-items-*-center mt-4 mb-2">
                    <Modal.Title className="text-center">
                      Solicitar cambio de contraseña
                    </Modal.Title>
                  </Row>
                  <Row className="contenedor-linea-alert ps-4 w-100">
                    <hr className="linea-alert"></hr>
                  </Row>
                  <Modal.Body>
                    <Row className="p-2 justify-content-center">
                      <Alert severity="info">
                        Desea solicitar un cambio de contraseña?
                      </Alert>
                    </Row>
                    <Row className="ms-2 mt-3 ">
                      <Col className="p-2 ml-100">
                        <Button
                          variant="primary"
                          className="ms-3 "
                          onClick={() => resetPasswordRequest().then(handleClose())}
                        >
                          Si
                        </Button>
                        <Button
                          variant="danger"
                          className="ms-3 "
                          onClick={() => handleClose()}
                        >
                          No
                        </Button>
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>
              )}
              {EditAccountIsVisible && <EditAccount />}
            </Col>
          </Row>
        </div>
      </body>
    </div>
  );
}