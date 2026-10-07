// ==========================================
// CONECTA - JAVASCRIPT
// ==========================================

// CADASTRO DE USUÁRIO
const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {
    cadastroForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não são iguais.");
            return;
        }

        if (senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        // Protótipo temporário. Será substituído pelo Back-End.
        localStorage.setItem("usuarioConecta", JSON.stringify(usuario));

        alert("Conta criada com sucesso!");
        window.location.href = "login.html";
    });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;

        if (!email || !senha) {
            alert("Preencha o e-mail e a senha.");
            return;
        }

        try {
            const resposta = await fetch(
                "http://localhost:3000/api/usuarios/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        senha: senha
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro || "Erro ao realizar login.");
                return;
            }

            // Salva o token JWT recebido do Back-End
            localStorage.setItem("tokenConecta", dados.token);

            // Marca que o usuário está logado
            localStorage.setItem("usuarioLogado", "true");

            alert("Login realizado com sucesso!");

            window.location.href = "index.html";

        } catch (erro) {

            console.error(erro);

            alert(
                "Não foi possível conectar ao servidor."
            );
        }
    });
}

// CADASTRO DE PROBLEMA
const problemaForm = document.getElementById("problemaForm");

if (problemaForm) {
    problemaForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const area = document.getElementById("area").value;
        const tipo = document.getElementById("tipo").value;
        const local = document.getElementById("local").value.trim();
        const descricao = document.getElementById("descricao").value.trim();

        // Verifica se os campos obrigatórios foram preenchidos
        if (!area || !tipo || !local || !descricao) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        // Pega o token salvo durante o login
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Você precisa fazer login para cadastrar um problema.");
            window.location.href = "login.html";
            return;
        }

        // Monta os dados que o Back-End espera
        const dadosProblema = {
            titulo: tipo,
            descricao: descricao,
            area: area,
            local: local
};

try {
    const resposta = await fetch(
        "/api/problemas",
        {
            method: "POST",

            headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(dadosProblema)
        }
    );

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro || "Erro ao cadastrar problema.");
                return;
            }

            alert("Problema enviado com sucesso!");

            problemaForm.reset();

        } catch (erro) {

            console.error(erro);

            alert(
                "Não foi possível conectar ao servidor."
            );
        }
    });
}