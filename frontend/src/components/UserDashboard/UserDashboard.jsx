import Menu from "../Menu/Menu";
import "./UserDashboard.css";

import Slider from "react-styled-carousel";
import { Button } from "react-bootstrap";

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
      <h1 className="titulo-home">Home Page</h1>
      <div className="contenedor-linea-home">
        <hr className="linea-home"></hr>
      </div>
      <h1 className="subtitulo">Acciones Rapidas</h1>
      <div className="container-slider">
        <Slider
          className="container-slider"
          responsive={responsive}
          autoSlide={false}
          infiniteLoop={true}
          padding="15px"
        >
          <Button className="boton mt-1" boton variant="primary" type="submit">
            Accion Rapida
          </Button>
          <Button className="boton mt-1" boton variant="primary" type="submit">
            Accion Rapida
          </Button>
          <Button className="boton mt-1" boton variant="primary" type="submit">
            Accion Rapida
          </Button>
          <Button className="boton mt-1" boton variant="primary" type="submit">
            Accion Rapida
          </Button>
          <Button className="boton mt-1" boton variant="primary" type="submit">
            Accion Rapida
          </Button>
          <Button className="boton mt-1" boton variant="primary" type="submit">
            Accion Rapida
          </Button>
        </Slider>
      </div>
      <div className="contenedor-linea-home">
        <hr className="linea-home"></hr>
      </div>
    </body>
  );
}
