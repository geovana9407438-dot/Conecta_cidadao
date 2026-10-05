const jwt = require("jsonwebtoken");

const SEGREDO = process.env.JWT_SECRET;

if (!SEGREDO) {
    throw new Error(
        "JWT_SECRET não foi configurado."
    );
}

function gerarToken(usuario) {

    return jwt.sign(
        {
            id: usuario.id,
            email: usuario.email
        },
        SEGREDO,
        {
            expiresIn: "1h"
        }
    );
}

function verificarToken(token) {

    return jwt.verify(
        token,
        SEGREDO
    );
}

module.exports = {
    gerarToken,
    verificarToken
};