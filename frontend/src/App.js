import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Navbar from './components/Menu/Menu';

import Activate from "./containers/Activate";
import Home from "./containers/Home";
import Login from "./containers/Login";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Signup from "./containers/Signup";


function App() {
  return (
    <Router>
      <div className='App'>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/reset-password' component={ResetPassword} />
            <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
            <Route exact path='/activate/:uid/:token' component={Activate} />
          </Routes>
        </AuthProvider>
      </div>

    </Router>
  );
}

export default App;
