import './App.css';

//import { Button } from 'react-bootstrap';

import { Menu } from './components/Menu/Menu';
import { AddChildren } from './components/AddChildren/AddChildren';
import { AddTutor } from './components/AddTutor/AddTutor';
import { AddResidence } from './components/AddResidence/AddResidence';
import { DeleteChildren } from './components/DeleteChildren/DeleteChildren';



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
            <DeleteChildren />
        </div>
      </body>
    </div>
  );
}

export default App;
