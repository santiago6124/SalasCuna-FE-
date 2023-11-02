import "./Account.css";
import profileImage from '../../media/Profile.jpg';

export default function SideMenu() {
    return(
        <div>
            <img src={profileImage} alt="Perfil" className="circle-image" />
            <div className="contenedor-linea-sm">
                <hr className="linea-sm"></hr>
            </div>
        </div>
        
    );
}