import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import { PublicRoute } from "./utils/PublicRoute";

import Activate from "./containers/Activate";
import Home from "./containers/Home";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Signup from "./components/SignUp/SignUp";
import { Login } from "./components/Login/Login";
import ActivateAccountPage from "./pages/ActivateAccountPage/ActivateAccountPage";
import GeneratePadron from "./components/GeneratePadron/GeneratePadron";
import TechnicalReport from "./components/TechnicalReport/TechnicalReport";
import AddChildrenPage from "./pages/AddChildrenPage/AddChildrenPage";
import CreateRoomPage from "./pages/CreateRoomPage/CreateRoomPage";
import { SelectRoom } from "./components/SelectRoom/SelectRoom";
import { FormAddChildren } from "./components/FormAddChildren/FormAddChildren";
import Payout from "./components/Payout/Payout";
import CribroomDashboard from "./components/CribroomDashboard/CribroomDashboard";
import { FaExpeditedssl } from "react-icons/fa";
import { FormEditChildren } from "../src/components/FormEditChildren/FormEditChildren";
import PayoutTest from "./components/Payout/PayoutTest";
import { Public } from "@mui/icons-material";

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
              element={<PrivateRoute children={<ResetPassword />} />}
            />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<PrivateRoute children={<ResetPasswordConfirm />} />}
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
              element={<PrivateRoute children={<AddChildrenPage />} />}
            />

            <Route
              path="/children-management"
              element={<PrivateRoute children={<AddChildrenPage />} />}
            />

            <Route
              path="/children-management/new"
              element={<PrivateRoute children={<FormAddChildren />} />}
            />

            <Route
              path="/children-management/edit"
              element={<PrivateRoute children={<FormEditChildren />} />}
            />

            <Route
              path="/crear-sala"
              element={<PrivateRoute children={<CreateRoomPage />} />}
            />
            <Route
              path="/editar-sala"
              element={<PrivateRoute children={<SelectRoom />} />}
            />
            <Route
              path="/maestro-montos"
              element={<PrivateRoute children={<PayoutTest />} />}
            />
            <Route
              path="/informe-tecnico"
              element={<PrivateRoute children={<TechnicalReport />} />}
            />
            <Route
              path="/gestion-sala"
              element={<PrivateRoute children={<CribroomDashboard />} />}
            />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
