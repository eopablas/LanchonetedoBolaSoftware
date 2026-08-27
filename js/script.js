const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (nome === "" || email === "" || senha === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Validação de Nome e Sobrenome
    const nomeCompleto = nome.split(/\s+/);

    if (nomeCompleto.length < 2) {
        alert("Digite seu nome e sobrenome!");
        return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
        alert("Digite um e-mail válido!");
        return;
    }

    const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha);

    if (!senhaValida) {
        alert("A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial!");
        return;
    }

    localStorage.setItem("nomeUsuario", nome);
    localStorage.setItem("emailUsuario", email);

    alert("Login realizado com sucesso!");

    sessionStorage.setItem("logado", "true");

    window.location.href = "pages/home.html";
});
