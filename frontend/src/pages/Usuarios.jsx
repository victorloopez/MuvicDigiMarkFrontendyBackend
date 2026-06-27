import React, { useEffect, useState } from "react";
import "../styles/estilos.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const cargarUsuarios = () => {
    fetch("http://localhost:4000/api/usuarios")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          setUsuarios([]);
        }
      })
      .catch((err) => {
        console.error("Error al cargar usuarios:", err);
        setUsuarios([]);
      });
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleAgregar = (e) => {
    e.preventDefault();

    if (!nombre || !email) {
      alert("Por favor complete todos los campos");
      return;
    }

    fetch("http://localhost:4000/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Usuario registrado correctamente");

        setNombre("");
        setEmail("");
        cargarUsuarios();
      })
      .catch((err) => {
        console.error("Error al agregar:", err);
        alert("Error al registrar el usuario");
      });
  };

  const handleEditar = (id, nombreActual, emailActual) => {
    const nuevoNombre = prompt(
      "Modificar Nombre Completo:",
      nombreActual
    );
    const nuevoEmail = prompt(
      "Modificar Correo Electrónico:",
      emailActual
    );

    if (!nuevoNombre || !nuevoEmail) return;

    fetch(`http://localhost:4000/api/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nuevoNombre,
        email: nuevoEmail,
      }),
    })
      .then(() => {
        alert("Usuario actualizado correctamente");
        cargarUsuarios();
      })
      .catch((err) => {
        console.error("Error al editar:", err);
        alert("Error al actualizar el usuario");
      });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este usuario?")) {
      fetch(`http://localhost:4000/api/usuarios/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Usuario eliminado correctamente");
          cargarUsuarios();
        })
        .catch((err) => {
          console.error("Error al eliminar:", err);
          alert("Error al eliminar el usuario");
        });
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Módulo de Usuarios</h1>
      </div>

      {/* Formulario de Registro */}
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
            Nombre Completo
          </label>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            placeholder="Ej. Juan Pérez"
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
            Correo Electrónico
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            placeholder="juan@muvic.com"
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
          + Guardar Usuario
        </button>
      </form>

      {/* Tabla de Usuarios */}
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
            <th style={{ padding: "12px", width: "10%" }}>ID</th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                width: "35%",
              }}
            >
              Nombre
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                width: "35%",
              }}
            >
              Email
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
          {usuarios.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#666",
                }}
              >
                No hay usuarios registrados o el servidor backend está desconectado.
              </td>
            </tr>
          ) : (
            usuarios.map((u) => (
              <tr key={u.id} className="module-card">
                <td
                  className="module-cell"
                  style={{ textAlign: "center" }}
                >
                  {u.id}
                </td>

                <td
                  className="module-cell"
                  style={{ fontWeight: "bold" }}
                >
                  {u.nombre}
                </td>

                <td className="module-cell">
                  {u.email}
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
                        u.id,
                        u.nombre,
                        u.email
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
                    onClick={() => handleEliminar(u.id)}
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

export default Usuarios;