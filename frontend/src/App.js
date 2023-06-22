import './App.css';
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
//import { Button } from 'react-bootstrap';

import { Menu } from './components/Menu/Menu';
import { AddChildren } from './components/AddChildren/AddChildren';
import { AddTutor } from './components/AddTutor/AddTutor';
import { AddResidence } from './components/AddResidence/AddResidence';
import { DeleteChildren } from './components/DeleteChildren/DeleteChildren';
import { EditRoom } from './components/EditRoom/EditRoom.jsx';
import { SelectRoom } from './components/SelectRoom/SelectRoom';
import { DeleteRoom } from './components/DeleteRoom/DeleteRoom.jsx';
import { PaymentNote } from './components/PaymentNote/PaymentNote';
import { TechnicalReport } from './components/ TechnicalReport/TechnicalReport';
import Login from "./components/Login/Login";
import {AuthProvider} from "./context/AuthContext";
import {CreateUser} from "./components/CreateUser/CreateUser"
import { DeleteUser } from './components/DeleteUser/DeleteUser';
  

function App() {
  return (
    <>
    <div className='App'>
        <header>
          <Menu/>
        </header>
      <body className='body'>
      <Router>
          <div className="App">
              <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/deleteUser' element={<DeleteUser/>}/>
              </Routes>
          </div>
      </Router>
      </body>

    </div>
    </>



  );
}

export default App;