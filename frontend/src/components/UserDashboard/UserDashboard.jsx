import Menu from "../Menu/Menu";
import "./UserDashboard.css";

import Slider from "react-styled-carousel";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

export default function UserDashboard() {
  const responsive = [
    { breakPoint: 1280, cardsToShow: 4 },
    { breakPoint: 760, cardsToShow: 2 },
  ];
  return (
    <body>
      <header className="header-home">
        <Menu />
      </header>
      <h1 className="titulo-home">Pagina de Administrador/a</h1>
      <div className="contenedor-linea-home">
        <hr className="linea-home"></hr>
      </div>
      <h3 className="subtitulo">Acciones Rapidas</h3>
      <div className="container-slider">
        <Slider
          className="container-slider"
          responsive={responsive}
          autoSlide={false}
          infiniteLoop={true}
          padding="15px"
        >
          <Link to={"/gestion-sala"}>
            <Button
              className="boton mt-1"
              boton
              variant="primary"
              type="submit"
            >
              Gestionar Las Salas
            </Button>
          </Link>
          <Link to={"/maestro-montos"}>
            <Button
              className="boton mt-1"
              boton
              variant="primary"
              type="submit"
            >
              Maestro Montos
            </Button>
          </Link>

          <Link to={"/generate-padron"}>
            <Button
              className="boton mt-1"
              boton
              variant="primary"
              type="submit"
            >
              Generar Padron
            </Button>
          </Link>
          <Link to={"/children-management"}>
            <Button
              className="boton mt-1"
              boton
              variant="primary"
              type="submit"
            >
              Gestionar Chicos
            </Button>
          </Link>
          <Link>
            <Button
              className="boton mt-1"
              boton
              variant="primary"
              type="submit"
            >
              Accion Rapida
            </Button>
          </Link>
          <Link to={"/informe-tecnico"}>
            <Button
              className="boton mt-1"
              boton
              variant="primary"
              type="submit"
            >
              Informe Tecnico
            </Button>
          </Link>
          <Link to={"/listar-usuarios"}>
            <Button
              className="boton mt-1"
              boton
              variant="primary"
              type="submit"
            >
              Usuarios
            </Button>
          </Link>
        </Slider>
      </div>
      <div className="contenedor-linea-home">
        <hr className="linea-home"></hr>
      </div>
    </body>
  );
}
