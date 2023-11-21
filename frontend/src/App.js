import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import { PublicRoute } from "./utils/PublicRoute";

import Home from "./containers/Home";
import { ChangePassword } from "./components/ChangePassword/ChangePassword";
import { Login } from "./components/Login/Login";
import ActivateAccountPage from "./pages/ActivateAccountPage/ActivateAccountPage";
import GeneratePadron from "./components/GeneratePadron/GeneratePadron";
import TechnicalReportPage from "./pages/TechnicalReportPage";
import AddChildrenPage from "./pages/AddChildrenPage/AddChildrenPage";
import CreateRoomPage from "./pages/CreateRoomPage/CreateRoomPage";
import { FormAddChildren } from "./components/FormAddChildren/FormAddChildren";
import CribroomDashboard from "./components/CribroomDashboard/CribroomDashboard";
import UserList from "./components/UserList/UserList";
import Dashboard from "./pages/DashboardPage/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import { FilesToDb } from "../src/components/FilesToDb/FilesToDb";
import SingUpPage from "./pages/SingUpPage/SingUpPage";
import MontoPage from "./pages/MontoPage";

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
              path="/agregar-usuario"
              element={<PrivateRoute children={<SingUpPage />} />}
            />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<PrivateRoute children={<ChangePassword />} />}
            />
            <Route
              path="/password/reset"
              element={<PrivateRoute children={<ChangePassword />} />}
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
              path="/children-management"
              element={<PrivateRoute children={<AddChildrenPage />} />}
            />

            <Route
              path="/children-management/new"
              element={<PrivateRoute children={<FormAddChildren />} />}
            />

            <Route
              path="/crear-sala"
              element={<PrivateRoute children={<CreateRoomPage />} />}
            />
            <Route
              path="/maestro-montos"
              element={<PrivateRoute children={<MontoPage />} />}
            />
            <Route
              path="/informe-tecnico"
              element={<PrivateRoute children={<TechnicalReportPage />} />}
            />
            <Route
              path="/gestion-sala"
              element={<PrivateRoute children={<CribroomDashboard />} />}
            />
            <Route
              path="/listar-usuarios"
              element={<PrivateRoute children={<UserList />} />}
            />
            <Route
              path="/files-to-db"
              element={<PrivateRoute children={<FilesToDb />} />}
            />
            <Route path="/me" element={<ProfilePage />} />

            <Route
              path="home-page"
              element={<PrivateRoute children={<Dashboard />} />}
            />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
