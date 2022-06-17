
import Tabla from './components/Tabla';
import  CrearDispositivos  from './components/CrearDispositivos';
import EditarDispositivos from './components/EditarDispositivos';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () =>{
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Tabla/>}/>
        <Route path="/crear" element={<CrearDispositivos/>}/>
        <Route path="/editar/:id" element={<EditarDispositivos/>}/>
      </Routes>
    </Router>
  )
}


export default App;
