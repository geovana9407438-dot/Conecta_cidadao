const express = require("express");

const {
    criptografarSenha,
    verificarSenha
} = require("../security/senha");

const router = express.Router();


// CADASTRO DE USUÁRIO
router.post("/cadastro", async (req, res) => {

    try {

        const {
            nome,
            email,
            senha
        } = req.body;


        // Verificação dos campos
        if (!nome || !email || !senha) {

            return res.status(400).json({
                erro: "Nome, e-mail e senha são obrigatórios."
            });

        }


        // Verificação mínima da senha
        if (senha.length < 6) {

            return res.status(400).json({
                erro: "A senha deve ter pelo menos 6 caracteres."
            });

        }


        // Transformar a senha em hash
        const senhaHash =
            await criptografarSenha(senha);


        // Por enquanto, apenas simulamos o cadastro.
        // O banco de dados será conectado depois.
        const usuario = {
            nome: nome,
            email: email,
            senha: senhaHash
        };


        res.status(201).json({

            mensagem:
                "Usuário cadastrado com segurança.",

            usuario: {
                nome: usuario.nome,
                email: usuario.email
            }

        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar usuário."
        });

    }

});

const express = require("express");

const {
    criptografarSenha
} = require("../security/senha");

const router = express.Router();


// CADASTRO DE USUÁRIO
router.post("/cadastro", async (req, res) => {

    try {

        const {
            nome,
            email,
            senha
        } = req.body;


        // Verificação dos campos
        if (!nome || !email || !senha) {

            return res.status(400).json({
                erro: "Nome, e-mail e senha são obrigatórios."
            });

        }


        // Verificação mínima da senha
        if (senha.length < 6) {

            return res.status(400).json({
                erro: "A senha deve ter pelo menos 6 caracteres."
            });

        }


        // Transformar a senha em hash
        const senhaHash =
            await criptografarSenha(senha);


        // Por enquanto, apenas simulamos o cadastro.
        // O banco de dados será conectado depois.
        const usuario = {
            nome: nome,
            email: email,
            senha: senhaHash
        };


        res.status(201).json({

            mensagem:
                "Usuário cadastrado com segurança.",

            usuario: {
                nome: usuario.nome,
                email: usuario.email
            }

        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar usuário."
        });

    }

});


// ROTA DE TESTE DA ESTRUTURA
router.get("/", (req, res) => {

    res.json({
        mensagem: "Rota de usuários funcionando."
    });

});


module.exports = router;

// ROTA DE TESTE DA ESTRUTURA
router.get("/", (req, res) => {

    res.json({
        mensagem: "Rota de usuários funcionando."
    });

});


module.exports = router;