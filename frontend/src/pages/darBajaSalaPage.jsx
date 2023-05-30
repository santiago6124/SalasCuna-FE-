import "./App.css";


import { Menu } from "./components/menu";
import { EliminarSala } from "./components/eliminarSala";

function App() {
  return (
    <div className="App">
      <header>
        <div>
          <Menu />
        </div>
      </header>
      <body className="body">
        <div></div>
        <div>
          <EliminarSala />
        </div>
      </body>
    </div>
  );
}

export default App;
