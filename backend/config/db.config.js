const { createPool } = require('mysql2');

const db = createPool({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chimera_coding_challenge'
})

module.exports = db;