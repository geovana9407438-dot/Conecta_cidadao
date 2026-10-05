const express = require("express");

const {
    gerarToken
} = require("../security/token");

const {
    criptografarSenha,
    verificarSenha
} = require("../security/senha");

const validarCadastro =
    require("../security/validacao");

const router = express.Router();

// CADASTRO DE USUÁRIO
router.post(
    "/cadastro",
    validarCadastro,
    async (req, res) => {
        
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

// LOGIN DE USUÁRIO
router.post("/login", async (req, res) => {

    try {

        const {
            email,
            senha
        } = req.body;


        // Verificação dos campos
        if (!email || !senha) {

            return res.status(400).json({
                erro: "E-mail e senha são obrigatórios."
            });

        }


        /*
         * Temporariamente usamos um usuário
         * de exemplo.
         *
         * Depois o banco de dados fornecerá
         * o usuário e o hash armazenado.
         */

        const usuarioExemplo = {
            email: "usuario@conecta.com",
            senhaHash:
                await criptografarSenha("123456")
        };


        // Verificar a senha
        const senhaCorreta =
            await verificarSenha(
                senha,
                usuarioExemplo.senhaHash
            );


        if (!senhaCorreta) {

            return res.status(401).json({
                erro: "E-mail ou senha incorretos."
            });

        }


        const token = gerarToken({
    id: 1,
    email: usuarioExemplo.email
});

res.status(200).json({

    mensagem: "Login realizado com sucesso.",

    token: token,

    usuario: {
        id: 1,
        email: usuarioExemplo.email
    }

});

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao realizar login."
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