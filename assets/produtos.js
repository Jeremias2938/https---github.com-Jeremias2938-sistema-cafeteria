// Array para armazenar os produtos.
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
// Função para carregar os produtos na página
function carregarProdutos() {
    const container = document.querySelector('.caixa-container');
    container.innerHTML = ""; // Limpa o conteúdo antes de adicionar os produtos

    produtos.forEach(produto => {
        const item = document.createElement('div');
        item.classList.add('caixa-item');
        item.dataset.id = produto.id; // Adiciona o ID como atributo para futuras atualizações

        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <div class="preco">R$${produto.preco.toFixed(2)} <span>R$${produto.precoAntigo.toFixed(2)}</span></div>
            <a href="#" class="botao editar" data-id="${produto.id}">Editar</a>
        `;

        container.appendChild(item);
    });

    // Configura o evento para editar produtos
    document.querySelectorAll('.editar').forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.dataset.id;
            editarProduto(id);
        });
    });
}

// Função para adicionar ou atualizar produtos
function salvarProduto(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const precoAntigo = parseFloat(document.getElementById('precoAntigo').value);
    const imagemInput = document.getElementById('imagem');
    const id = document.getElementById('form-produto').dataset.id;

    let imagemUrl = "";
    if (imagemInput.files.length > 0) {
        const file = imagemInput.files[0];
        imagemUrl = URL.createObjectURL(file); // Gera um URL temporário para a imagem
    }

    if (id) {
        // Atualiza o produto existente
        const produto = produtos.find(p => p.id === parseInt(id));
        if (produto) {
            produto.nome = nome;
            produto.preco = preco;
            produto.precoAntigo = precoAntigo || produto.precoAntigo;
            produto.imagem = imagemUrl || produto.imagem; // Mantém a imagem antiga se nenhuma for selecionada
        }
    } else {
        // Adiciona um novo produto
        const novoProduto = {
            id: produtos.length + 1,
            nome,
            preco,
            precoAntigo,
            imagem: imagemUrl
        };
        produtos.push(novoProduto);
    }

    // Limpa o formulário e recarrega os produtos
    document.getElementById('form-produto').reset();
    delete document.getElementById('form-produto').dataset.id;
    carregarProdutos();
}

// Função para editar um produto
function editarProduto(id) {
    const produto = produtos.find(p => p.id === parseInt(id));
    if (produto) {
        document.getElementById('nome').value = produto.nome;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('precoAntigo').value = produto.precoAntigo;
        document.getElementById('form-produto').dataset.id = produto.id;
    }
}

// Inicializa a lista de produtos na página ao carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    document.getElementById('form-produto').addEventListener('submit', salvarProduto);
});
