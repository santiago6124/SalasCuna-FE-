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
          <AñadirChico />
          <AñadirTutor />
          <AñadirDomicilio />
          <div className='contenedor-boton mb-5'>
            <Button as="input" type="submit" value="Submit" size='lg' />
          </div>
      </div>
      </body>
    </div>
  );
}

export default App;
