import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Activate from "./containers/Activate";
import Home from "./containers/Home";
import Login from "./containers/Login";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Signup from "./containers/Signup";
import Google from './containers/Google';
import store from "./store";

import Layout from "./hocs/Layout";

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/google' component={Google} />
        <Route exact path='/reset-password' component={ResetPassword} />
        <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
        <Route exact path='/activate/:uid/:token' component={Activate} />
        </Routes>
      </Layout>
    </Router>
  </Provider>
);

export default App;
