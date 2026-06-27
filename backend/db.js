const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '1234',      
    database: 'muvic'  
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('✅ Conectado exitosamente a la base de datos MySQL.');
});

module.exports = connection;