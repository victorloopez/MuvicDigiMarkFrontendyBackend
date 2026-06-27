import React, { useEffect, useState } from "react";
import "../styles/estilos.css";

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const cargarProyectos = () => {
    fetch("http://localhost:4000/api/proyectos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProyectos(data);
        } else {
          setProyectos([]);
        }
      })
      .catch((err) => {
        console.error("Error al cargar proyectos:", err);
        alert("Error al cargar los proyectos");
        setProyectos([]);
      });
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  const handleAgregar = (e) => {
    e.preventDefault();

    if (!nombre || !descripcion) {
      return alert("Por favor complete todos los campos");
    }

    fetch("http://localhost:4000/api/proyectos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        descripcion,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en el servidor: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        alert("Proyecto registrado correctamente");
        setNombre("");
        setDescripcion("");
        cargarProyectos();
      })
      .catch((err) => {
        console.error("Error al agregar:", err);
        alert(`No se pudo registrar el proyecto. Motivo: ${err.message}`);
      });
  };

  const handleEditar = (id, nombreActual, descActual) => {
    const nuevoNombre = prompt(
      "Modificar Nombre del Proyecto:",
      nombreActual
    );

    const nuevaDesc = prompt(
      "Modificar Descripción:",
      descActual
    );

    if (!nuevoNombre || !nuevaDesc) return;

    fetch(`http://localhost:4000/api/proyectos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nuevoNombre,
        descripcion: nuevaDesc,
      }),
    })
      .then(() => {
        alert("Proyecto actualizado correctamente");
        cargarProyectos();
      })
      .catch((err) => {
        console.error("Error al editar:", err);
        alert("Error al actualizar el proyecto");
      });
  };

  const handleEliminar = (id) => {
    if (confirm("¿Está seguro de eliminar este proyecto?")) {
      fetch(`http://localhost:4000/api/proyectos/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Proyecto eliminado correctamente");
          cargarProyectos();
        })
        .catch((err) => {
          console.error("Error al eliminar:", err);
          alert("Error al eliminar el proyecto");
        });
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Módulo de Proyectos</h1>
      </div>

      <form
        onSubmit={handleAgregar}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          display: "flex",
          gap: "15px",
          alignItems: "flex-end",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ flex: 1 }}>
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Nombre del Proyecto
          </label>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Campaña Marcas Luxury"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Descripción / Estado
          </label>

          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ej. Fase de Diseño / Finalizado"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn-action"
          style={{
            backgroundColor: "#ff6b00",
            padding: "11px 25px",
          }}
        >
          + Guardar Proyecto
        </button>
      </form>

      <table
        className="modules-list"
        style={{ width: "100%" }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#0d233a",
              color: "#fff",
            }}
          >
            <th style={{ padding: "12px", width: "10%" }}>
              ID
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "left",
                width: "35%",
              }}
            >
              Proyecto
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "left",
                width: "35%",
              }}
            >
              Descripción / Estado
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "center",
                width: "20%",
              }}
            >
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {proyectos.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#666",
                }}
              >
                No hay proyectos registrados.
              </td>
            </tr>
          ) : (
            proyectos.map((p) => (
              <tr key={p.id} className="module-card">
                <td
                  className="module-cell"
                  style={{ textAlign: "center" }}
                >
                  {p.id}
                </td>

                <td
                  className="module-cell"
                  style={{ fontWeight: "bold" }}
                >
                  {p.nombre}
                </td>

                <td className="module-cell">
                  {p.descripcion}
                </td>

                <td
                  className="module-cell"
                  style={{ textAlign: "center" }}
                >
                  <button
                    className="btn-action"
                    style={{
                      backgroundColor: "#007bff",
                      marginRight: "10px",
                    }}
                    onClick={() =>
                      handleEditar(
                        p.id,
                        p.nombre,
                        p.descripcion
                      )
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="btn-action"
                    style={{
                      backgroundColor: "#dc3545",
                    }}
                    onClick={() => handleEliminar(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Proyectos;