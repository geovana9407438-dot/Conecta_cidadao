// ==========================================
// CONECTA - JAVASCRIPT
// ==========================================


const API_URL = "https://super-duper-parakeet-6v4gx4g9qwq6f5vgp-3000.app.github.dev";

// CADASTRO DE USUÁRIO
const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {
    cadastroForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        if (!nome || !email || !senha || !confirmarSenha) {
            alert("Preencha todos os campos.");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não são iguais.");
            return;
        }

        if (senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        try {
            const resposta = await fetch(`${API_URL}/api/usuarios/cadastro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, email, senha })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro || dados.mensagem || "Não foi possível realizar o cadastro.");
                return;
            }

            alert(dados.mensagem || "Cadastro realizado com sucesso!");
            cadastroForm.reset();
            window.location.href = "login.html";

        } catch (erro) {
            console.error("Erro no cadastro:", erro);
            alert("Não foi possível conectar ao servidor. Verifique se o Back-End está funcionando.");
        }
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


/* ===== MODO CLARO E ESCURO ===== */

const botaoTema = document.getElementById("alternarTema");

function aplicarTema(tema) {
    document.body.classList.toggle("modo-escuro", tema === "escuro");

    if (botaoTema) {
        botaoTema.textContent =
            tema === "escuro" ? "☀️ Modo claro" : "🌙 Modo escuro";
    }
}

const temaSalvo = localStorage.getItem("temaConecta") || "claro";
aplicarTema(temaSalvo);

if (botaoTema) {
    botaoTema.addEventListener("click", function () {
        const novoTema = document.body.classList.contains("modo-escuro")
            ? "claro"
            : "escuro";

        localStorage.setItem("temaConecta", novoTema);
        aplicarTema(novoTema);
    });
}
