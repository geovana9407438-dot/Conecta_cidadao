const {
    verificarToken
} = require("../security/token");

function verificarAutenticacao(req, res, next) {

    const autorizacao =
        req.headers.authorization;

    if (!autorizacao) {

        return res.status(401).json({
            erro: "Acesso não autorizado."
        });

    }

    if (!autorizacao.startsWith("Bearer ")) {

        return res.status(401).json({
            erro: "Formato de autenticação inválido."
        });

    }

    const token =
        autorizacao.split(" ")[1];

    try {

        const usuario =
            verificarToken(token);

        req.usuario = usuario;

        next();

    } catch (erro) {

        return res.status(401).json({
            erro: "Token inválido ou expirado."
        });

    }
}

module.exports = verificarAutenticacao;