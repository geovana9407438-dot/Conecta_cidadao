const express = require("express");
const db = require("../database");
const verificarAutenticacao = require("../middleware/autenticacao");
const validarProblema = require("../security/validacaoProblema");

const router = express.Router();

// LISTAR PROBLEMAS DO BANCO
router.get("/", verificarAutenticacao, (req, res) => {
    const sql = `
        SELECT
            id,
            usuario_id AS usuarioId,
            titulo,
            descricao,
            area,
            local,
            status
        FROM problemas
        ORDER BY id DESC
    `;

    db.all(sql, [], (erro, problemas) => {
        if (erro) {
            console.error("Erro ao listar problemas:", erro.message);
            return res.status(500).json({
                erro: "Não foi possível listar os problemas."
            });
        }

        res.json({
            mensagem: "Problemas consultados com sucesso.",
            problemas
        });
    });
});

// ATUALIZAR STATUS NO BANCO
router.patch("/:id/status", verificarAutenticacao, (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body;

    const statusPermitidos = [
        "Recebido",
        "Em andamento",
        "Resolvido"
    ];

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            erro: "ID do problema inválido."
        });
    }

    if (!statusPermitidos.includes(status)) {
        return res.status(400).json({
            erro: "Status inválido."
        });
    }

    db.run(
        "UPDATE problemas SET status = ? WHERE id = ?",
        [status, id],
        function (erro) {
            if (erro) {
                console.error("Erro ao atualizar status:", erro.message);
                return res.status(500).json({
                    erro: "Não foi possível atualizar o status."
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Problema não encontrado."
                });
            }

            db.get(
                `SELECT id, usuario_id AS usuarioId, titulo,
                        descricao, area, local, status
                 FROM problemas WHERE id = ?`,
                [id],
                (erroBusca, problema) => {
                    if (erroBusca) {
                        console.error(erroBusca.message);
                        return res.status(500).json({
                            erro: "Status atualizado, mas não foi possível consultar o problema."
                        });
                    }

                    res.json({
                        mensagem: "Status atualizado com sucesso.",
                        problema
                    });
                }
            );
        }
    );
});

// CADASTRAR PROBLEMA NO BANCO
router.post(
    "/",
    verificarAutenticacao,
    validarProblema,
    (req, res) => {
        const { titulo, descricao, area, local } = req.body;
        const usuarioId = Number(req.usuario.id);

        if (!Number.isInteger(usuarioId) || usuarioId < 1) {
            return res.status(401).json({
                erro: "Usuário autenticado inválido."
            });
        }

        const sql = `
            INSERT INTO problemas
                (usuario_id, titulo, descricao, area, local, status)
            VALUES (?, ?, ?, ?, ?, 'Recebido')
        `;

        db.run(
            sql,
            [usuarioId, titulo, descricao, area, local],
            function (erro) {
                if (erro) {
                    console.error("Erro ao cadastrar problema:", erro.message);
                    return res.status(500).json({
                        erro: "Não foi possível salvar o problema."
                    });
                }

                db.get(
                    `SELECT id, usuario_id AS usuarioId, titulo,
                            descricao, area, local, status
                     FROM problemas WHERE id = ?`,
                    [this.lastID],
                    (erroBusca, problema) => {
                        if (erroBusca) {
                            console.error(erroBusca.message);
                            return res.status(500).json({
                                erro: "Problema salvo, mas não foi possível consultá-lo."
                            });
                        }

                        res.status(201).json({
                            mensagem: "Problema recebido com sucesso.",
                            problema
                        });
                    }
                );
            }
        );
    }
);

module.exports = router;

