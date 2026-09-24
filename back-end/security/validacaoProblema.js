function validarProblema(req, res, next) {

    const {
        titulo,
        descricao,
        area
    } = req.body;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!titulo || !descricao || !area) {

        return res.status(400).json({
            erro: "Título, descrição e área são obrigatórios."
        });

    }

    // Evita títulos muito curtos
    if (titulo.trim().length < 5) {

        return res.status(400).json({
            erro: "O título deve ter pelo menos 5 caracteres."
        });

    }

    // Evita descrições muito curtas
    if (descricao.trim().length < 10) {

        return res.status(400).json({
            erro: "A descrição deve ter pelo menos 10 caracteres."
        });

    }

    next();
}

module.exports = validarProblema;