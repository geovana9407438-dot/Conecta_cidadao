function verificarAutenticacao(req, res, next) {

    const token =
        req.headers.authorization;


    // Verifica se existe autorização
    if (!token) {

        return res.status(401).json({
            erro: "Acesso não autorizado."
        });

    }


    // Verifica o formato do token
    if (!token.startsWith("Bearer ")) {

        return res.status(401).json({
            erro: "Formato de autenticação inválido."
        });

    }


    // Retira "Bearer " e pega somente o token
    const tokenRecebido =
        token.replace("Bearer ", "");


    if (!tokenRecebido) {

        return res.status(401).json({
            erro: "Token não informado."
        });

    }


    // Por enquanto, apenas permite continuar
    // quando existe um token no formato correto.
    req.token = tokenRecebido;

    next();
}


module.exports = verificarAutenticacao;