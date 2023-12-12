import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import "./ChangePassword.css";
import AuthContext from "../../context/AuthContext";
import { updateData, warningData } from "../../utils/toastMsgs";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export function ChangePassword() {
  const { uid, token } = useParams();
  let { authTokens } = useContext(AuthContext);
  const history = useNavigate();

  let changePassword = async (e, uid, token) => {
    try {
      e.preventDefault();
      const headers = {
        "Content-Type": "application/json",
      };
      const formData = new FormData(e.target);
      const payload = {
        uid: uid,
        token: token,
        new_password: formData.get("password"),
        re_new_password: formData.get("re_password")
      }
      let response = await axios.post("/auth/users/reset_password_confirm/", payload, { headers: headers })
      console.log(response)
      if (await response.request.status === 204) {
        updateData("La contraseña se actualizo con exito. Puede cerrar esta ventana")
      } else {
        warningData("Ocurrio un error")
      }

    } catch (error) {
      alert("Ocurrio un error", error)
    }
  };

  async function handleSubmit(event) {
    changePassword(event, uid, token);
  }

  return (
    <body className="body-pw">
      <>
        <ToastContainer />
        <Container className="p-1 mt-5 justify-content-center d-flex w-50 ">
          <Form onSubmit={handleSubmit}>
            <h1 className="titulo-changepw m-2 mt-4 mb-4 justify-content-center ">
              Cambiar Contraseña
            </h1>

            <div className="linea-conteiner-changepw m-2 justify-content-center d-flex w-100">
              <h1 className="linea-changepw"></h1>
            </div>
            <Form.Group>
              <Form.Label className="mb-2">
                Ingresar Nueva Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Ingrese la Nueva Contraseña"
                className="mb-3"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-2">Repetir Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="re_password"
                placeholder="Repetir La Nueva Contraseña"
                className="mb-3"
              ></Form.Control>
            </Form.Group>
            <div className="contenedor-boton-changepw justify-content-center d-flex mt-3 mb-3">
              <Button
                className="mt-3 justify-content-center d-flex"
                boton
                variant="primary"
                type="submit"
              >
                Cambiar Contraseña
              </Button>
            </div>
          </Form>
        </Container>
      </>
    </body>
  );
}
