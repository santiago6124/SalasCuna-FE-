//Creation of the user dashboard
import Menu from "../Menu/Menu";
import "./UserDashboard.css";


export default function UserDashboard() {
  return (
    <body>
      <header className="header-home">
        <Menu />
      </header>
      <h1 className="titulo-home">Acciones De Usuario</h1>
      <div className="contenedor-linea-home">
        <hr className="linea-home"></hr>
      </div>
      <div className="contenedor-linea-home">
        <hr className="linea-home"></hr>
      </div>
    </body>
  );
}
