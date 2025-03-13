import { BrowserRouter, Router, Link, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AgregarTurno from "./pages/agregarTurno";
import Estadisticas from "./pages/estadisticas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agregar-turno" element={<AgregarTurno />} />
        <Route path="/estadisticas" element={<Estadisticas />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
