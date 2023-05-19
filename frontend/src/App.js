import './App.css';

import { Menu } from './components/menu';
import { AñadirChico } from './components/añadirChico';
import { RedirectSala } from './components/seleccionarSala';
import { EditarSala } from './components/editarSala';
import { EliminarSala } from './components/eliminarSala';

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
          <AñadirChico/>
          <RedirectSala />
          <EditarSala/>
          <EliminarSala/>
      </div>
      </body>
    </div>
  );
}

export default App;
