const express = require("express");

const verificarAutenticacao =
    require("../middleware/autenticacao");

const router = express.Router();


// LISTAR PROBLEMAS
router.get("/", verificarAutenticacao, (req, res) => {

    res.json({
        mensagem: "Rota de problemas protegida.",
        problemas: []
    });

});


// CADASTRAR PROBLEMA
router.post("/", verificarAutenticacao, (req, res) => {

    res.json({
        mensagem: "Problema recebido com sucesso."
    });

});


module.exports = router;