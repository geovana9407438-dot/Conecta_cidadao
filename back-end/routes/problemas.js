const express = require("express");

const verificarAutenticacao =
    require("../middleware/autenticacao");

const validarProblema =
    require("../security/validacaoProblema");
    
const router = express.Router();


// LISTAR PROBLEMAS
router.post(
    "/",
    verificarAutenticacao,
    validarProblema,
    (req, res) => {

        res.json({
            mensagem: "Problema recebido com sucesso."
        });

    }
);

// CADASTRAR PROBLEMA
router.post("/", verificarAutenticacao, (req, res) => {

    res.json({
        mensagem: "Problema recebido com sucesso."
    });

});


module.exports = router;