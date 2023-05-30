import './App.css';

import { Button } from 'react-bootstrap';

import { Menu } from './components/menu';
import { AñadirChico } from './components/añadirChico';
<<<<<<< HEAD
import { AñadirTutor } from './components/añadirTutor';
import { AñadirDomicilio } from './components/añadirDomicilio';

=======
import { RedirectSala } from './components/seleccionarSala';
import { EditarSala } from './components/editarSala';
import { EliminarSala } from './components/eliminarSala';
>>>>>>> GestionSala

function App() {
  return (
    <div className="App">
      <header>
        <div>
          <Menu />
        </div>
      </header>
      <body className='body'>
<<<<<<< HEAD
        <div>
            <AñadirChico />
            <AñadirTutor />
            <AñadirDomicilio />
            <div className='contenedor-boton mb-5'>
              <Button as="input" type="submit" value="Cargar" size='lg' />
            </div>
        </div>
=======
      <div>
          <AñadirChico/>
          <RedirectSala />
          <EditarSala/>
          <EliminarSala/>
      </div>
>>>>>>> GestionSala
      </body>
    </div>
  );
}

export default App;
