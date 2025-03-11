import { BrowserRouter, Router, Link, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AgregarTurno from "./components/agregarTurno";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agregar-turno" element={<AgregarTurno />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
