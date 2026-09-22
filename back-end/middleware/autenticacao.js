function verificarAutenticacao(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            erro: "Acesso não autorizado."
        });
    }

    next();
}

module.exports = verificarAutenticacao;