import {React, useContext} from 'react';
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
      <div className="container">
        <div class="jumbotron mt-5">
          <h1 class="display-4">Welcome to Auth System!</h1>
          <p class="lead">
            This is an incredible authentication system with production level
            features!
          </p>
          <hr class="my-4" />
          <p>Click the Log In button</p>
          <Link class="btn btn-primary btn-lg" to="/Padron" role="button">
            Padron
          </Link>
          <Link class="btn btn-primary btn-lg" to="/login" role="button">
            Login
          </Link>
        </div>
      </div>
    );    
};

export default Home;