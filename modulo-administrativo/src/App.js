import './css/App.css';
import ButtonDownload from './componentes/ButtonDownload';
import Tabla2 from './componentes/Tabla2';
import NavBar from './componentes/NavBar';

function App() {

  return (
    <div className="App">
      <NavBar />
      <ButtonDownload />
      <hr />
      <Tabla2 />
    </div>
  );
}

export default App;
