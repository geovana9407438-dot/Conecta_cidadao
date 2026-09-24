function validarCadastro(req, res, next) {

    const { nome, email, senha } = req.body;

    // Verifica se os campos foram preenchidos
    if (!nome || !email || !senha) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios."
        });
    }

    // Verifica o tamanho do nome
    if (nome.trim().length < 3) {
        return res.status(400).json({
            erro: "O nome deve ter pelo menos 3 caracteres."
        });
    }

    // Verifica o formato básico do e-mail
    if (!email.includes("@")) {
        return res.status(400).json({
            erro: "Informe um e-mail válido."
        });
    }

    // Verifica o tamanho mínimo da senha
    if (senha.length < 6) {
    return res.status(400).json({
        erro: "A senha deve ter pelo menos 6 caracteres."
    });
}

if (!/[A-Z]/.test(senha)) {
    return res.status(400).json({
        erro: "A senha deve conter pelo menos uma letra maiúscula."
    });
}

if (!/[0-9]/.test(senha)) {
    return res.status(400).json({
        erro: "A senha deve conter pelo menos um número."
    });
}

module.exports = validarCadastro;