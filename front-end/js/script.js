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
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;

        const usuarioSalvo = localStorage.getItem("usuarioConecta");

        if (!usuarioSalvo) {
            alert("Nenhuma conta cadastrada.");
            return;
        }

        const usuario = JSON.parse(usuarioSalvo);

        if (email === usuario.email && senha === usuario.senha) {
            localStorage.setItem("usuarioLogado", "true");
            window.location.href = "index.html";
        } else {
            alert("E-mail ou senha incorretos.");
        }
    });
}

// CADASTRO DE PROBLEMA
const problemaForm = document.getElementById("problemaForm");

if (problemaForm) {
    problemaForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const area = document.getElementById("area").value;
        const tipo = document.getElementById("tipo").value;
        const local = document.getElementById("local").value.trim();
        const descricao = document.getElementById("descricao").value.trim();

        if (!area || !tipo || !local || !descricao) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        alert("Problema enviado com sucesso!");
        problemaForm.reset();
    });
}
