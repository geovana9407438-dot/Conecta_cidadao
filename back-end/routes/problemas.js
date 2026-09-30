const express = require("express");

const verificarAutenticacao =
    require("../middleware/autenticacao");

const validarProblema =
    require("../security/validacaoProblema");

const router = express.Router();
const problemas = [];


// LISTAR PROBLEMAS
router.get(
    "/",
    verificarAutenticacao,
    (req, res) => {

        res.json({
            mensagem: "Rota de problemas protegida.",
            problemas
        });

    }
);


// CADASTRAR PROBLEMA
router.post(
    "/",
    verificarAutenticacao,
    validarProblema,
    (req, res) => {

        const problema = {
            id: problemas.length + 1,
            usuarioId: req.usuario.id,
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            area: req.body.area,
            local: req.body.local,
            status: "Recebido"
        };

        problemas.push(problema);

        res.status(201).json({
            mensagem: "Problema recebido com sucesso.",
            problema
        });

    }
);

module.exports = router;
