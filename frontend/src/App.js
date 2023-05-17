import './App.css';

import { Menu } from './components/menu';
import { AñadirChico } from './components/añadirChico';

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
      </div>
      </body>
    </div>
  );
}

export default App;
