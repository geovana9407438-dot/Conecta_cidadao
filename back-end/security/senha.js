const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

// Criptografa a senha antes de armazená-la
async function criptografarSenha(senha) {

    const senhaHash = await bcrypt.hash(
        senha,
        SALT_ROUNDS
    );

    return senhaHash;
}


// Verifica se a senha informada
// corresponde ao hash armazenado
async function verificarSenha(
    senha,
    senhaHash
) {

    return await bcrypt.compare(
        senha,
        senhaHash
    );
}


module.exports = {
    criptografarSenha,
    verificarSenha
};