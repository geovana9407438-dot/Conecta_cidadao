const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        mensagem: "Rota de problemas funcionando.",
        problemas: []
    });
});

router.post("/", (req, res) => {
    res.json({
        mensagem: "Problema recebido com sucesso."
    });
});

module.exports = router;