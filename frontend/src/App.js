import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Navbar from './components/Menu/Menu';
import PrivateRoute from "./utils/PrivateRoute";


import Activate from "./containers/Activate";
import Home from "./containers/Home";
import Login from "./containers/Login";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Signup from "./containers/Signup";
import LoginPage from "./components/login";


function App() {
  return (
    <Router>
      <div className='App'>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='/' exact element={Home} />
            <Route path='/login' exact element={<LoginPage/>} />
            <Route path='/signup' component={Signup} />
            <Route path='/reset-password' component={ResetPassword} />
            <Route path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
            <Route path='/activate/:uid/:token' component={Activate} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
