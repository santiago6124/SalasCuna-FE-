import React, { useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import "./ChangePassword.css";
import AuthContext from "../../context/AuthContext";

export function ChangePassword() {
  const {changePassword} = useContext(AuthContext);
  const {uid ,token} = useParams();
  const history = useNavigate();

  function handleSubmit(event){
    changePassword(event, uid, token);
  }

  return (
    <body className="body-pw">
      <>
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
