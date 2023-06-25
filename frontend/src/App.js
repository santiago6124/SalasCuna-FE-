import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import Navbar from "./components/Menu/Menu";
import PrivateRoute from "./utils/PrivateRoute";

import Activate from "./containers/Activate";
import Home from "./containers/Home";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Signup from "./components/CreateUser/CreateUser";
import LoginPage from "./components/Login/login";

function App() {
  return (
    <>
      <div>
        <Router>
          <div className="App">
            <Navbar />
            <AuthProvider>
                <Routes>
                  <Route path="/" element ={<Home/>} />
                  <Route path="/login" element={<LoginPage/>} />
                  <Route path="/signup" element={<Signup/>} />
                  <Route path="/reset-password" component={ResetPassword} />
                  <Route
                    path="/password/reset/confirm/:uid/:token"
                    component={ResetPasswordConfirm}
                  />
                  <Route path="/activate/:uid/:token" component={Activate} />
                </Routes>
              </AuthProvider>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
