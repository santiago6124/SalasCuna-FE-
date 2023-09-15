import React from "react";
import "./DeleteChildren.css";

import { Button, Form } from "react-bootstrap";

export function DeleteChildren() {
  const [selectedChild, setSelectedChild] = useState("");

  useEffect(() => {
    setSelectedChild(props.id);
  }, []);

  async function handleDelete(event) {
    event.preventDefault();
    console.log(selectedCribroom);
    try {
      const payload = {
        is_active: "false",
      };

      console.log("making fetch");
      const response = await axios.patch(
        `/api/child/${selectedChild}/?delete`,
        payload
      );
      props.onHide();
    } catch (err) {
      alert("Error al eliminar la sala cuna", err);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <Modal.Title className="titulo-eliminar">
          Eliminar Sala Cuna
        </Modal.Title>
      </div>
      <div className="contenedor-linea-eliminar">
        <hr className="linea-eliminar"></hr>
      </div>
      <div className="par">
        <p>Esta seguro que desea Eliminar la Sala Cuna {selectedChild.name}?</p>
        <p>Esto hara que su estado pase a ser Inactivo,</p>
      </div>
      <div className="par">
        <Alert severity="warning">
          <p>Los chicos que esten en esta sala cuna tambien</p>
          <p>
            pasaran a estar en <strong>estado Inactivo</strong>
          </p>
        </Alert>
      </div>
      <Modal.Footer>
        <div className="button-wrapper">
          <div>
            <Button
              className="mt-3"
              boton
              variant="danger"
              onClick={handleDelete}
            >
              Deshabilitar
            </Button>
          </div>
          <Button
            className="mt-3"
            boton
            variant="primary"
            onClick={props.onHide}
          >
            Cancelar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
