const btnPesquisa = document.getElementById("btnPesquisa");
const pesquisaContainer = document.querySelector(".pesquisa-container");
const campoPesquisa = document.getElementById("campoPesquisa");
const btnSair = document.getElementById("btnSair");
const filtroBotoes = document.querySelectorAll(".filtro-btn");
const itensCardapio = document.querySelectorAll(".item-cardapio");
const cardapioVazio = document.getElementById("cardapioVazio");
const btnEnviarContato = document.getElementById("btnEnviarContato");


btnPesquisa.addEventListener("click", function (event) {

    event.stopPropagation();

    pesquisaContainer.classList.toggle("aberta");

    if (pesquisaContainer.classList.contains("aberta")) {
        campoPesquisa.focus();
    }
});

document.addEventListener("click", function (event) {

    if (!pesquisaContainer.contains(event.target)) {
        pesquisaContainer.classList.remove("aberta");
    }

});

btnSair.addEventListener("click", function () {

    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("emailUsuario");

    window.location.href = "../index.html";
});

filtroBotoes.forEach(function (botao) {
    botao.addEventListener("click", function () {

        filtroBotoes.forEach(function (b) {
            b.classList.remove("ativo");
        });
        botao.classList.add("ativo");

        const categoria = botao.dataset.filtro;
        let visiveis = 0;

        itensCardapio.forEach(function (item) {
            const pertence = categoria === "todos" || item.dataset.categoria === categoria;
            item.classList.toggle("escondido", !pertence);
            if (pertence) visiveis++;
        });

        cardapioVazio.style.display = visiveis === 0 ? "block" : "none";
    });
});

if (btnEnviarContato) {
    btnEnviarContato.addEventListener("click", function () {

        const nome = document.getElementById("nomeContato").value.trim();
        const email = document.getElementById("emailContato").value.trim();
        const mensagem = document.getElementById("mensagemContato").value.trim();

        if (!nome || !email || !mensagem) {
            alert("Por favor, preencha nome, e-mail e mensagem antes de enviar.");
            return;
        }

        alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");

        document.getElementById("nomeContato").value = "";
        document.getElementById("emailContato").value = "";
        document.getElementById("assuntoContato").value = "";
        document.getElementById("mensagemContato").value = "";
    });
}