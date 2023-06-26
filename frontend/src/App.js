import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import Navbar from "./components/Menu/Menu";
import PrivateRoute from "./utils/PrivateRoute";
import { PublicRoute } from "./utils/PublicRoute";

import Activate from "./containers/Activate";
import Home from "./containers/Home";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Signup from "./components/CreateUser/CreateUser";
import LoginPage from "./components/Login/login";
import ActivateAccountPage from "./pages/ActivateAccountPage/ActivateAccountPage";


function App() {
  return (
        <Router>
          <div className="App">
            <AuthProvider>
            <Navbar/>
                <Routes>
                  <Route exact path="/" element ={<PublicRoute children={<Home/>}/>} />
                  <Route path="/login" element={<PublicRoute children={<LoginPage/>}/>}/>
                  <Route path="/signup" element={<Signup/>} />
                  <Route path="/reset-password" element={<PublicRoute children={<ResetPassword/>}/>} />
                  <Route path="/password/reset/confirm/:uid/:token" element={<PublicRoute children={<ResetPasswordConfirm/>}/>}/>
                  <Route path="/activate/:uid/:token" element={<ActivateAccountPage/>}/>
                
                  <Route path="/xd" element={<PrivateRoute children={Activate}/>}/>
                </Routes>
              </AuthProvider>
          </div>
        </Router>
  );
}

export default App;