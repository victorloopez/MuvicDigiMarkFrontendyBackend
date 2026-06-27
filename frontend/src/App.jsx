import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Usuarios from './pages/Usuarios';
import Clientes from './pages/Clientes';
import Servicios from './pages/Servicios';
import Proyectos from './pages/Proyectos';
import './styles/estilos.css';

function App() {
  return (
    <Router>
      {/* Contenedor maestro sin restricciones de ancho */}
      <div className="app-viewport-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/proyectos" element={<Proyectos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;