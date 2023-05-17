import './App.css';

import { Menu } from './components/menu';
import { AñadirChico } from './components/añadirChico';
import { AñadirTutor } from './components/añadirTutor';

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
      </div>
      </body>
    </div>
  );
}

export default App;
