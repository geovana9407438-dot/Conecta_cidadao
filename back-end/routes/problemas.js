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


// ATUALIZAR STATUS DO PROBLEMA
router.patch(
    "/:id/status",
    verificarAutenticacao,
    (req, res) => {

        const problema = problemas.find(
            p => p.id === Number(req.params.id)
        );

        if (!problema) {
            return res.status(404).json({
                erro: "Problema não encontrado."
            });
        }

        const { status } = req.body;

        const statusPermitidos = [
            "Recebido",
            "Em andamento",
            "Resolvido"
        ];

        if (!statusPermitidos.includes(status)) {
            return res.status(400).json({
                erro: "Status inválido."
            });
        }

        problema.status = status;

        res.json({
            mensagem: "Status atualizado com sucesso.",
            problema
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
