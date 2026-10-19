
/* CONECTA CIDADÃO - APLICATIVO */

// Levar o usuário até o formulário
function irParaProblema() {
    document.getElementById("problema")
        .scrollIntoView({ behavior: "smooth" });
}

// Configurar o formulário
const formulario = document.getElementById("formProblema");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const tipo = document.getElementById("tipo").value;
    const local = document.getElementById("local").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (!nome || !tipo || !local || !descricao) {
        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    // Demonstração local: ainda não envia ao servidor
    mensagem.textContent =
        "Formulário preenchido! Demonstração realizada com sucesso.";

    mensagem.style.color = "green";

    formulario.reset();
});
