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
import Signup from "./components/SignUp/SignUp";
import { Login } from "./components/LogIn/Login";
import ActivateAccountPage from "./pages/ActivateAccountPage/ActivateAccountPage";
import GeneratePadron from "./components/GeneratePadron/GeneratePadron";
import AddChildrenPage from "./pages/AddChildrenPage/AddChildrenPage";
import CreateRoomPage from "./pages/CreateRoomPage/CreateRoomPage"
import { FaExpeditedssl } from "react-icons/fa";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/login"
              element={<PublicRoute children={<Login />} />}
            />
            <Route
              path="/signup"
              element={<PublicRoute children={<Signup />} />}
            />
            <Route
              path="/reset-password"
              element={<PublicRoute children={<ResetPassword />} />}
            />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<PublicRoute children={<ResetPasswordConfirm />} />}
            />
            <Route
              path="/activate/:uid/:token"
              element={<ActivateAccountPage />}
            />

            <Route
              path="/generate-padron"
              element={<PrivateRoute children={<GeneratePadron />} />}
            />

            <Route
              path="/añadir-chico"
              element={<PublicRoute children={<AddChildrenPage />} />}
            />
            <Route
              path="/crear-sala"
              element={<PublicRoute children={<CreateRoomPage />} />}
            />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
