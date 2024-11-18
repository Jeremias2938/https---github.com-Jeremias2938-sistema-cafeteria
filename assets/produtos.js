// Array para armazenar os produtos
const produtos = [
    {
        id: 1,
        nome: "Café com Leite",
        preco: 9.99,
        precoAntigo: 5.99,
        imagem: "./assets/img/cafe com leite.jpg"
    },
    {
        id: 2,
        nome: "Café coado",
        preco: 7.99,
        precoAntigo: 13.99,
        imagem: "./assets/img/cafe coado.jpg"
    },
    {
        id: 3,
        nome: "Capuccino",
        preco: 10.00,
        precoAntigo: 17.50,
        imagem: "./assets/img/capuccino.jpg"
    },
    {
        id: 4,
        nome: "Achocolatado",
        preco: 10.00,
        precoAntigo: 14.50,
        imagem: "./assets/img/achocolatado.jpg"
    },
    {
        id: 5,
        nome: "Esfiha de Carne",
        preco: 5.50,
        precoAntigo: 9.00,
        imagem: "./assets/img/esfiha.jpg"
    },
    {
        id: 6,
        nome: "Coxinha",
        preco: 3.00,
        precoAntigo: 8.00,
        imagem: "./assets/img/coxinha.jpg"
    }
];

// Função para carregar os produtos na página
function carregarProdutos() {
    const container = document.querySelector('.caixa-container');
    container.innerHTML = ""; // Limpa o conteúdo antes de adicionar os produtos

    produtos.forEach(produto => {
        const item = document.createElement('div');
        item.classList.add('caixa-item');

        item.innerHTML = `
            <img src="${produto.imagem}" alt="item-${produto.id}">
            <h3>${produto.nome}</h3>
            <div class="preco">R$${produto.preco.toFixed(2)} <span>R$${produto.precoAntigo.toFixed(2)}</span></div>
            <a href="carrinho.html" class="botao">Comprar</a>
        `;

        container.appendChild(item);
    });
}

// Função para adicionar um novo produto
function adicionarProduto(nome, preco, precoAntigo, imagem) {
    const novoProduto = {
        id: produtos.length + 1,
        nome: nome,
        preco: preco,
        precoAntigo: precoAntigo,
        imagem: imagem
    };

    produtos.push(novoProduto);
    carregarProdutos(); // Atualiza a lista exibida
}

// Inicializa a lista de produtos na página ao carregar
document.addEventListener('DOMContentLoaded', carregarProdutos);
