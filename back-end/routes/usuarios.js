const express = require("express");
const db = require("../database");

const { gerarToken } = require("../security/token");
const {
    criptografarSenha,
    verificarSenha
} = require("../security/senha");

const validarCadastro = require("../security/validacao");

const router = express.Router();

// CADASTRAR USUÁRIO
router.post("/cadastro", validarCadastro, async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (
            typeof nome !== "string" ||
            typeof email !== "string" ||
            typeof senha !== "string" ||
            !nome.trim() ||
            !email.trim() ||
            senha.length < 6
        ) {
            return res.status(400).json({
                erro: "Informe nome, e-mail e senha com pelo menos 6 caracteres."
            });
        }

        const nomeLimpo = nome.trim();
        const emailLimpo = email.trim().toLowerCase();
        const senhaCriptografada = await criptografarSenha(senha);

        db.run(
            `INSERT INTO usuarios (nome, email, senha)
             VALUES (?, ?, ?)`,
            [nomeLimpo, emailLimpo, senhaCriptografada],
            function (erro) {
                if (erro) {
                    if (erro.message.includes("UNIQUE constraint failed")) {
                        return res.status(409).json({
                            erro: "Este e-mail já está cadastrado."
                        });
                    }

                    console.error("Erro ao cadastrar usuário:", erro.message);
                    return res.status(500).json({
                        erro: "Não foi possível cadastrar o usuário."
                    });
                }

                return res.status(201).json({
                    mensagem: "Usuário cadastrado com sucesso!",
                    usuario: {
                        id: this.lastID,
                        nome: nomeLimpo,
                        email: emailLimpo
                    }
                });
            }
        );
    } catch (erro) {
        console.error("Erro ao criptografar senha:", erro.message);
        return res.status(500).json({
            erro: "Ocorreu um erro ao cadastrar o usuário."
        });
    }
});

// FAZER LOGIN
router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (
        typeof email !== "string" ||
        typeof senha !== "string" ||
        !email.trim() ||
        !senha
    ) {
        return res.status(400).json({
            erro: "Informe o e-mail e a senha."
        });
    }

    const emailLimpo = email.trim().toLowerCase();

    db.get(
        "SELECT id, nome, email, senha FROM usuarios WHERE email = ?",
        [emailLimpo],
        async (erro, usuario) => {
            if (erro) {
                console.error("Erro ao consultar usuário:", erro.message);
                return res.status(500).json({
                    erro: "Não foi possível realizar o login."
                });
            }

            if (!usuario) {
                return res.status(401).json({
                    erro: "E-mail ou senha incorretos."
                });
            }

            try {
                const senhaCorreta = await verificarSenha(
                    senha,
                    usuario.senha
                );

                if (!senhaCorreta) {
                    return res.status(401).json({
                        erro: "E-mail ou senha incorretos."
                    });
                }

                const token = gerarToken({
                    id: usuario.id,
                    email: usuario.email
                });

                return res.json({
                    mensagem: "Login realizado com sucesso!",
                    token,
                    usuario: {
                        id: usuario.id,
                        nome: usuario.nome,
                        email: usuario.email
                    }
                });
            } catch (erroSenha) {
                console.error("Erro ao verificar senha:", erroSenha.message);
                return res.status(500).json({
                    erro: "Ocorreu um erro ao realizar o login."
                });
            }
        }
    );
});

// TESTAR ROTA DE USUÁRIOS
router.get("/", (req, res) => {
    res.json({
        mensagem: "Rota de usuários funcionando."
    });
});

module.exports = router;
