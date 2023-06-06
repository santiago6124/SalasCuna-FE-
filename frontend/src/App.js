import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";



import './App.css';

//import { Button } from 'react-bootstrap';

import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      </Routes>
  );
}

export default App;
