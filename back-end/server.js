const http = require("http");
const express = require("express");

const app = express();
const PORTA = 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const usuariosRoutes = require("./routes/usuarios");
const problemasRoutes = require("./routes/problemas");

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/problemas", problemasRoutes);

app.get("/", (req, res) => {
    res.json({
        mensagem: "API do Conecta Cidadão funcionando!"
    });
});

app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada."
    });
});

app.listen(PORTA, () => {
    console.log(`Servidor Conecta iniciado na porta ${PORTA}`);
});