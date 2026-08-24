const btnPesquisa = document.getElementById("btnPesquisa");
const pesquisaContainer = document.querySelector(".pesquisa-container");
const campoPesquisa = document.getElementById("campoPesquisa");

const btnSair = document.getElementById("btnSair");

const filtroBotoes = document.querySelectorAll(".filtro-btn");
const itensCardapio = document.querySelectorAll(".item-cardapio");
const cardapioVazio = document.getElementById("cardapioVazio");

const btnEnviarContato = document.getElementById("btnEnviarContato");

const btnPerfil = document.getElementById("btnPerfil");
const popupPerfilFundo = document.getElementById("popupPerfilFundo");
const btnFecharPerfil = document.getElementById("btnFecharPerfil");
const btnSairPopup = document.getElementById("btnSairPopup");


let categoriaAtual = "todos";


if (btnPesquisa && pesquisaContainer && campoPesquisa) {

    btnPesquisa.addEventListener("click", function (event) {

        event.stopPropagation();

        pesquisaContainer.classList.toggle("aberta");

        if (pesquisaContainer.classList.contains("aberta")) {

            campoPesquisa.focus();

        } else {

            campoPesquisa.value = "";

            aplicarFiltros();

        }

    });


    pesquisaContainer.addEventListener("click", function (event) {

        event.stopPropagation();

    });


    document.addEventListener("click", function (event) {

        if (!pesquisaContainer.contains(event.target)) {

            pesquisaContainer.classList.remove("aberta");

        }

    });

    campoPesquisa.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            aplicarFiltros();

        }

    });

}

function aplicarFiltros() {

    const termo = campoPesquisa
        ? campoPesquisa.value.toLowerCase().trim()
        : "";

    let encontrados = 0;


    itensCardapio.forEach(function (item) {

        // Categoria do produto
        const categoriaItem = item.dataset.categoria;


        // Nome do produto
        const elementoNome = item.querySelector("h3");

        const nome = elementoNome
            ? elementoNome.textContent.toLowerCase()
            : "";


        const elementoDescricao = item.querySelector("p");

        const descricao = elementoDescricao
            ? elementoDescricao.textContent.toLowerCase()
            : "";


        const pertenceCategoria =
            categoriaAtual === "todos" ||
            categoriaItem === categoriaAtual;


        const correspondePesquisa =
            termo === "" ||
            nome.includes(termo) ||
            descricao.includes(termo);


        const deveMostrar =
            pertenceCategoria && correspondePesquisa;


        item.classList.toggle(
            "escondido",
            !deveMostrar
        );


        if (deveMostrar) {

            encontrados++;

        }

    });


    if (cardapioVazio) {

        cardapioVazio.style.display =
            encontrados === 0
                ? "block"
                : "none";

    }

}



filtroBotoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        filtroBotoes.forEach(function (b) {

            b.classList.remove("ativo");

        });


        botao.classList.add("ativo");


        categoriaAtual = botao.dataset.filtro;


        aplicarFiltros();

    });

});



if (btnSair) {

    btnSair.addEventListener("click", function () {

        localStorage.removeItem("nomeUsuario");
        localStorage.removeItem("emailUsuario");

        window.location.href = "../index.html";

    });

}



if (btnEnviarContato) {

    btnEnviarContato.addEventListener("click", function () {

        const nome = document
            .getElementById("nomeContato")
            .value
            .trim();

        const email = document
            .getElementById("emailContato")
            .value
            .trim();

        const mensagem = document
            .getElementById("mensagemContato")
            .value
            .trim();


        if (!nome || !email || !mensagem) {

            alert(
                "Por favor, preencha nome, e-mail e mensagem antes de enviar."
            );

            return;

        }


        alert(
            "Mensagem enviada com sucesso! Em breve entraremos em contato."
        );


        document.getElementById("nomeContato").value = "";
        document.getElementById("emailContato").value = "";
        document.getElementById("assuntoContato").value = "";
        document.getElementById("mensagemContato").value = "";

    });

}



function carregarDadosPerfil() {

    const nomeUsuario =
        localStorage.getItem("nomeUsuario");

    const emailUsuario =
        localStorage.getItem("emailUsuario");


    const popupNome =
        document.getElementById("popupPerfilNome");

    const popupEmail =
        document.getElementById("popupPerfilEmail");


    if (popupNome) {

        popupNome.textContent =
            nomeUsuario || "Usuário";

    }


    if (popupEmail) {

        popupEmail.textContent =
            emailUsuario || "email@exemplo.com";

    }

}



if (btnPerfil && popupPerfilFundo) {

    btnPerfil.addEventListener("click", function (event) {

        event.preventDefault();

        carregarDadosPerfil();

        popupPerfilFundo.classList.add("aberto");

    });


    if (btnFecharPerfil) {

        btnFecharPerfil.addEventListener("click", function () {

            popupPerfilFundo.classList.remove("aberto");

        });

    }


    popupPerfilFundo.addEventListener("click", function (event) {

        if (event.target === popupPerfilFundo) {

            popupPerfilFundo.classList.remove("aberto");

        }

    });


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            popupPerfilFundo.classList.remove("aberto");

        }

    });


    if (btnSairPopup) {

        btnSairPopup.addEventListener("click", function () {

            localStorage.removeItem("nomeUsuario");
            localStorage.removeItem("emailUsuario");

            window.location.href = "../index.html";

        });

    }

}


const carrinho = document.getElementById("carrinho");

const carrinhoLateral =
    document.getElementById("carrinhoLateral");

const carrinhoFundo =
    document.getElementById("carrinhoFundo");

const btnFecharCarrinho =
    document.getElementById("btnFecharCarrinho");

const carrinhoConteudo =
    document.getElementById("carrinhoConteudo");

const carrinhoVazio =
    document.getElementById("carrinhoVazio");

const carrinhoTotal =
    document.getElementById("carrinhoTotal");

const quantidadeCarrinho =
    document.getElementById("quantidadeCarrinho");

const btnFinalizarPedido =
    document.getElementById("btnFinalizarPedido");


let produtosCarrinho = [];


function abrirCarrinho() {

    if (!carrinhoLateral || !carrinhoFundo) {
        return;
    }

    carrinhoLateral.classList.add("aberto");

    carrinhoFundo.classList.add("aberto");

    document.body.style.overflow = "hidden";
}



function fecharCarrinho() {

    if (!carrinhoLateral || !carrinhoFundo) {
        return;
    }

    carrinhoLateral.classList.remove("aberto");

    carrinhoFundo.classList.remove("aberto");

    document.body.style.overflow = "";
}


if (carrinho) {

    carrinho.addEventListener("click", function (event) {

        event.preventDefault();

        abrirCarrinho();
    });
}


if (btnFecharCarrinho) {

    btnFecharCarrinho.addEventListener(
        "click",
        fecharCarrinho
    );
}


if (carrinhoFundo) {

    carrinhoFundo.addEventListener(
        "click",
        fecharCarrinho
    );
}


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        fecharCarrinho();
    }
});


const botoesAdicionar =
    document.querySelectorAll(".btn-add-produto");


botoesAdicionar.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const card =
            botao.closest(".item-cardapio");

        if (!card) {
            return;
        }


        const elementoNome =
            card.querySelector("h3");

        const nome =
            elementoNome
                ? elementoNome.textContent.trim()
                : "Produto";


        const elementoPreco =
            card.querySelector(".card-produto-preco");

        const textoPreco =
            elementoPreco
                ? elementoPreco.textContent.trim()
                : "R$ 0,00";


        const preco =
            converterPreco(textoPreco);


        const imagem =
            card.querySelector(".card-produto-img");

        const srcImagem =
            imagem
                ? imagem.getAttribute("src")
                : "";


        adicionarProduto(
            nome,
            preco,
            srcImagem
        );

    });
});


function converterPreco(valor) {

    return Number(
        valor
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
    ) || 0;
}


function adicionarProduto(nome, preco, imagem) {

    const produtoExistente =
        produtosCarrinho.find(
            function (produto) {

                return produto.nome === nome;
            }
        );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        produtosCarrinho.push({

            nome: nome,

            preco: preco,

            imagem: imagem,

            quantidade: 1
        });
    }


    atualizarCarrinho();

    abrirCarrinho();
}


function atualizarCarrinho() {

    if (!carrinhoConteudo) {
        return;
    }

    const itensAntigos =
        carrinhoConteudo.querySelectorAll(
            ".item-carrinho"
        );


    itensAntigos.forEach(function (item) {

        item.remove();
    });

    if (produtosCarrinho.length === 0) {

        if (carrinhoVazio) {

            carrinhoVazio.style.display = "flex";
        }

    } else {

        if (carrinhoVazio) {

            carrinhoVazio.style.display = "none";
        }


        produtosCarrinho.forEach(
            function (produto, index) {

                criarItemCarrinho(
                    produto,
                    index
                );
            }
        );
    }


    atualizarTotal();
}


function criarItemCarrinho(produto, index) {

    const item =
        document.createElement("div");

    item.className =
        "item-carrinho";


    const subtotal =
        produto.preco * produto.quantidade;


    item.innerHTML = `

        <img
            src="${produto.imagem}"
            alt="${produto.nome}"
            class="item-carrinho-imagem"
        >

        <div class="item-carrinho-info">

            <h3>
                ${produto.nome}
            </h3>

            <span class="item-carrinho-preco">
                ${formatarPreco(produto.preco)} cada
            </span>

            <div class="item-carrinho-controles">

                <button
                    type="button"
                    class="btn-quantidade"
                    data-acao="diminuir"
                    data-index="${index}"
                >
                    <i class="bi bi-dash"></i>
                </button>

                <span class="quantidade-produto">
                    ${produto.quantidade}
                </span>

                <button
                    type="button"
                    class="btn-quantidade"
                    data-acao="aumentar"
                    data-index="${index}"
                >
                    <i class="bi bi-plus"></i>
                </button>

            </div>

        </div>

        <div class="item-carrinho-total">

            <strong>
                ${formatarPreco(subtotal)}
            </strong>

            <button
                type="button"
                class="btn-remover-produto"
                data-acao="remover"
                data-index="${index}"
                aria-label="Remover ${produto.nome}"
            >
                <i class="bi bi-trash3"></i>
            </button>

        </div>
    `;


    carrinhoConteudo.appendChild(item);
}


if (carrinhoConteudo) {

    carrinhoConteudo.addEventListener(
        "click",
        function (event) {

            const botao =
                event.target.closest(
                    "[data-acao]"
                );


            if (!botao) {
                return;
            }


            const acao =
                botao.dataset.acao;


            const index =
                Number(botao.dataset.index);


            if (
                Number.isNaN(index) ||
                !produtosCarrinho[index]
            ) {
                return;
            }


            // Aumentar
            if (acao === "aumentar") {

                produtosCarrinho[index].quantidade++;
            }


            // Diminuir
            if (acao === "diminuir") {

                produtosCarrinho[index].quantidade--;


                if (
                    produtosCarrinho[index]
                        .quantidade <= 0
                ) {

                    produtosCarrinho.splice(
                        index,
                        1
                    );
                }
            }


            // Remover
            if (acao === "remover") {

                produtosCarrinho.splice(
                    index,
                    1
                );
            }


            atualizarCarrinho();
        }
    );
}

function atualizarTotal() {

    let total = 0;

    let quantidade = 0;


    produtosCarrinho.forEach(
        function (produto) {

            total +=
                produto.preco *
                produto.quantidade;

            quantidade +=
                produto.quantidade;
        }
    );


    if (carrinhoTotal) {

        carrinhoTotal.textContent =
            formatarPreco(total);
    }


    if (quantidadeCarrinho) {

        quantidadeCarrinho.textContent =
            quantidade === 1
                ? "1 item"
                : `${quantidade} itens`;
    }
}

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


if (btnFinalizarPedido) {

    btnFinalizarPedido.addEventListener(
        "click",
        function () {

            if (produtosCarrinho.length === 0) {

                alert(
                    "Seu carrinho está vazio!"
                );

                return;
            }


            alert(
                "Pedido iniciado com sucesso!"
            );
        }
    );
}