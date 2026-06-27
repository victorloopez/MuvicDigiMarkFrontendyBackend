import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/estilos.css";

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="main-wrapper">
      {/* Sección Hero / Presentación de la Empresa */}
      <header className="hero-section">
        <div className="hero-content">
          {/* Se eliminó la línea de Panel de Administración */}
          <h2 style={{ fontSize: "3rem", margin: "0 0 15px 0", fontWeight: "700", color: "#ffffff" }}>
            Muvic DigiMark
          </h2>
          <p className="company-description">
            Soluciones integrales en marketing digital y desarrollo de software a la medida. 
            Gestiona de forma centralizada tus equipos, marcas aliadas, catálogo de servicios y proyectos activos.
          </p>
        </div>
      </header>

      {/* Contenedor de Módulos en Tarjetas */}
      <main className="dashboard-container">
        <h3 className="section-title">Módulos del Sistema</h3>
        
        <div className="modules-grid">
          {/* Tarjeta Usuarios */}
          <div className="module-card-large" onClick={() => navigate("/usuarios")}>
            <div className="module-icon-large">👥</div>
            <h4>Usuarios</h4>
            <p>Control, asignación y auditoría de cuentas corporativas del equipo técnico.</p>
          </div>

          {/* Tarjeta Clientes */}
          <div className="module-card-large" onClick={() => navigate("/clientes")}>
            <div className="module-icon-large">💼</div>
            <h4>Clientes</h4>
            <p>Base de datos centralizada de marcas aliadas y contactos comerciales directos.</p>
          </div>

          {/* Tarjeta Servicios */}
          <div className="module-card-large" onClick={() => navigate("/servicios")}>
            <div className="module-icon-large">⚡</div>
            <h4>Servicios</h4>
            <p>Catálogo general, tarifas base y personalización de soluciones digitales.</p>
          </div>

          {/* Tarjeta Proyectos */}
          <div className="module-card-large" onClick={() => navigate("/proyectos")}>
            <div className="module-icon-large">📁</div>
            <h4>Proyectos</h4>
            <p>Monitoreo en tiempo real, cronogramas y estados de entrega de proyectos.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Inicio;