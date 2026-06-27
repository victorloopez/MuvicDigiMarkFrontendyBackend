const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// RUTAS PARA CLIENTES
// ==========================================
app.get('/api/clientes', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results || []);
    });
});

app.post('/api/clientes', (req, res) => {
    const { nombre, email } = req.body;
    
    // Validamos que los datos sí lleguen al backend
    console.log("--> Backend recibió datos de cliente:", { nombre, email });

    db.query('INSERT INTO clientes (nombre, email) VALUES (?, ?)', [nombre, email], (err, result) => {
        if (err) {
            // Esto imprimirá el error exacto de MySQL en tu terminal
            console.error("❌ ERROR REAL EN MYSQL CLIENTES:", err.message);
            return res.status(500).json({ error: `Error en MySQL: ${err.message}` });
        }
        
        const insertId = result ? (result.insertId || result.id) : null;
        res.json({ id: insertId, nombre, email });
    });
});

app.put('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    db.query('UPDATE clientes SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cliente actualizado' });
    });
});

app.delete('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cliente eliminado' });
    });
});

// ==========================================
// RUTAS PARA PROYECTOS
// ==========================================
app.get('/api/proyectos', (req, res) => {
    db.query('SELECT * FROM proyectos', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results || []);
    });
});

app.post('/api/proyectos', (req, res) => {
    const { nombre, descripcion } = req.body;
    db.query('INSERT INTO proyectos (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const insertId = result ? (result.insertId || result.id) : null;
        res.json({ id: insertId, nombre, descripcion });
    });
});

app.put('/api/proyectos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    db.query('UPDATE proyectos SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Proyecto actualizado' });
    });
});

app.delete('/api/proyectos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM proyectos WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Proyecto eliminado' });
    });
});

// ==========================================
// RUTAS PARA USUARIOS
// ==========================================
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results || []);
    });
});

app.post('/api/usuarios', (req, res) => {
    const { nombre, email } = req.body;
    db.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const insertId = result ? (result.insertId || result.id) : null;
        res.json({ id: insertId, nombre, email });
    });
});

app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    db.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario actualizado' });
    });
});

app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario eliminado' });
    });
});

// ==========================================
// RUTAS PARA SERVICIOS
// ==========================================
app.get('/api/servicios', (req, res) => {
    db.query('SELECT * FROM servicios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results || []);
    });
});

app.post('/api/servicios', (req, res) => {
    const { nombre, precio } = req.body;
    db.query('INSERT INTO servicios (nombre, precio) VALUES (?, ?)', [nombre, precio], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const insertId = result ? (result.insertId || result.id) : null;
        res.json({ id: insertId, nombre, precio });
    });
});

app.put('/api/servicios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    db.query('UPDATE servicios SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Servicio actualizado' });
    });
});

app.delete('/api/servicios/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM servicios WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Servicio eliminado' });
    });
});

// Arrancar Servidor
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor de Muvic DigiMark corriendo en http://localhost:${PORT}`);
});