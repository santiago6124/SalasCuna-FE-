import './App.css';

import { Button } from 'react-bootstrap';

import { Menu } from './components/menu';
import { AñadirChico } from './components/añadirChico';
import { AñadirTutor } from './components/añadirTutor';
import { AñadirDomicilio } from './components/añadirDomicilio';


function App() {
  return (
    <div className="App">
      <header>
        <div>
          <Menu />
        </div>
      </header>
      <body className='body'>
        <div>
           
        </div>
      </body>
    </div>
  );
}

export default App;
