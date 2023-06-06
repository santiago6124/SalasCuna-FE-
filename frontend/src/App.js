import './App.css';

//import { Button } from 'react-bootstrap';

import { Menu } from './components/Menu/Menu';
import { AddChildren } from './components/AddChildren/AddChildren';
import { AddTutor } from './components/AddTutor/AddTutor';
import { AddResidence } from './components/AddResidence/AddResidence';
import { DeleteChildren } from './components/DeleteChildren/DeleteChildren';
import { EditRoom } from './components/EditRoom/EditRoom.jsx';
import { SelectRoom } from './components/SelectRoom/SelectRoom';
import { DeleteRoom } from './components/DeleteRoom/DeleteRoom.jsx';


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
