import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/estilos.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Muvic DigiMark</div>
      <ul className="navbar-links">
        <li><Link to="/inicio">Inicio</Link></li>
        <li><Link to="/usuarios">Usuarios</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        <li><Link to="/proyectos">Proyectos</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;