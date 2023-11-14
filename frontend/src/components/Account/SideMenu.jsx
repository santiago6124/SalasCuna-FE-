import "./Account.css";
import profileImage from '../../media/Profile.jpg';
import { Button } from "react-bootstrap";

export default function SideMenu() {
    return(
        <div className="MainDiv">
            <div className="image-container">
                <img src={profileImage} alt="Perfil" className="circle-image" />
            </div>
            <div className="contenedor-linea-sm">
                <hr className="linea-sm"></hr>
            </div>
            <Button className="prueba">A VER</Button>
        </div>   
    );
}