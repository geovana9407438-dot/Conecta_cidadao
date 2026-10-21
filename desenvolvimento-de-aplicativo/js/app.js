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

// MODO ESCURO DO APLICATIVO

const botaoTema = document.getElementById("alternarTema");

if (botaoTema) {
    botaoTema.addEventListener("click", function () {
        document.body.classList.toggle("modo-escuro");

        if (document.body.classList.contains("modo-escuro")) {
            botaoTema.textContent = "☀️";
        } else {
            botaoTema.textContent = "🌙";
        }
    });
}


/* JOVEM DECIDE - VOTAÇÃO DEMONSTRATIVA */

const formVotacao = document.getElementById("formVotacao");
const resultadoVotacao = document.getElementById("resultadoVotacao");

if (formVotacao && resultadoVotacao) {
    formVotacao.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const opcao = formVotacao.querySelector(
            'input[name="melhoria"]:checked'
        );

        if (opcao) {
            resultadoVotacao.textContent =
                "🎉 Seu voto em " + opcao.value +
                " foi registrado nesta demonstração!";

            formVotacao.reset();
        }
    });
}


/* CONECTABOT - ASSISTENTE VIRTUAL */

const mensagensChat = document.getElementById("mensagensChat");
const botoesChat = document.querySelectorAll(
    ".chat-opcoes button"
);

const respostasBot = {
    cadastrar: "Para cadastrar um problema, clique em '+ Cadastrar problema', preencha o formulário e envie sua solicitação. Nesta versão, o cadastro é demonstrativo.",

    acompanhar: "O acompanhamento das solicitações estará disponível quando o aplicativo for integrado ao sistema da equipe.",

    missoes: "As Missões do Bem incentivam os jovens a participar de ações positivas na comunidade. Os pontos e medalhas ainda são demonstrativos!",

    votacao: "Na seção Jovem Decide, você pode escolher qual melhoria considera mais importante. A votação ainda é demonstrativa."
};

if (mensagensChat) {
    botoesChat.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const pergunta = botao.textContent.trim();
            const tipo = botao.dataset.pergunta;

            const mensagemUsuario = document.createElement("p");
            mensagemUsuario.className = "mensagem-usuario";
            mensagemUsuario.textContent = pergunta;

            mensagensChat.appendChild(mensagemUsuario);

            const mensagemBot = document.createElement("p");
            mensagemBot.className = "mensagem-bot";
            mensagemBot.textContent =
                "🤖 " + (respostasBot[tipo] ||
                "Desculpe, ainda não tenho essa resposta.");

            mensagensChat.appendChild(mensagemBot);

            mensagensChat.scrollTop =
                mensagensChat.scrollHeight;
        });
    });
}
