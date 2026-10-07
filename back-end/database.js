const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const caminhoBanco = path.join(__dirname, "conecta.db");

const db = new sqlite3.Database(caminhoBanco, (erro) => {
    if (erro) {
        console.error("Erro ao conectar ao banco:", erro.message);
    } else {
        console.log("Banco de dados conectado com sucesso.");
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS problemas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER NOT NULL,
            titulo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            area TEXT NOT NULL,
            local TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Recebido',
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        )
    `);
});

module.exports = db;
