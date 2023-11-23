import React, { useContext } from 'react';
import './Profile.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
 
import profileImage from '../../media/TS.png';

import AuthContext from '../../context/AuthContext';


function Profile ()  {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <OverlayTrigger
          trigger="click"
          key={'bottom'}
          placement={'bottom'}
          overlay={
            <Popover id={`popover-positioned-${'bottom'}`} style={{ width: '250px', height: '400px' }}>
              <Popover.Body>
                <div className='center-content'>
                  <img src={profileImage} alt="Perfil" className="circle-image" />
                  <h3>Messi</h3>
                  <hr style={{ borderColor: '#A6A6A6', width: '90%',borderWidth: '2px'}} />

                  <div className="config-section">
                    <div className="config-item">
                      <div className="config-content">
                        <button className="config-button" onClick={() => logoutUser()}>
                          <FontAwesomeIcon icon={faRightFromBracket} size="lg" style={{ color: "#F1862E", marginRight: '8px' }} />
                          <span className="config-text">Cerrar Sesion</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
             </Popover.Body>
            </Popover>
          }
        >
          <FontAwesomeIcon icon={faCircleUser} style={{ color: "#F1862E", width:'40', height:'40', marginTop:'2px'}} />

      </OverlayTrigger>
  );
}

export default Profile;
