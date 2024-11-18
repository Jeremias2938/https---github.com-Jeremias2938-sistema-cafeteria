let carrinho = [];

// Função para atualizar a lista do carrinho e o total na interface
function atualizarCarrinho() {
    const carrinhoLista = document.getElementById('carrinho-lista');
    const totalElemento = document.getElementById('total');
    carrinhoLista.innerHTML = ''; // Limpa a lista antes de adicionar os itens novamente

    let total = 0;
    const listaItensCarrinho = document.getElementById('itens-carrinho'); // Novo elemento para exibir os itens no total

    // Limpa a lista de itens no carrinho dentro da div total
    listaItensCarrinho.innerHTML = '';

    // Exibe cada item do carrinho na div total
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade} 
                        <button onclick="removerDoCarrinho(${item.id})">Remover</button>`;
        listaItensCarrinho.appendChild(li);
        total += item.preco * item.quantidade; // Atualiza o total com a quantidade
    });

    totalElemento.textContent = total.toFixed(2); // Atualiza o total na interface
}

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(id, nome, preco) {
    // Verifica se o item já está no carrinho para não duplicar
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.quantidade += 1; // Caso o item já exista, aumenta a quantidade
    } else {
        carrinho.push({ id, nome, preco, quantidade: 1 }); // Adiciona um novo item ao carrinho
    }
    console.log(carrinho); // Depuração: exibe o carrinho no console
    atualizarCarrinho();
}

// Função para remover item do carrinho
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id); // Filtra o item com o id removido
    console.log(carrinho); // Depuração: exibe o carrinho no console
    atualizarCarrinho();
}

// Adicionar evento de clique nos botões de adicionar
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(event) {
            const id = parseInt(event.target.getAttribute('data-id'));
            const nome = event.target.getAttribute('data-nome');
            const preco = parseFloat(event.target.getAttribute('data-preco'));

            console.log(`Adicionando ao carrinho: ${nome} - R$${preco}`); // Depuração: exibe a ação no console
            adicionarAoCarrinho(id, nome, preco); // Adiciona o item ao carrinho
        });
    });
});

// Função para finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', function() {
    if (carrinho.length > 0) {
        alert('Compra finalizada! Total: R$' + document.getElementById('total').textContent);
        carrinho = []; // Limpa o carrinho após a compra
        atualizarCarrinho();
    } else {
        alert('Carrinho vazio! Adicione itens antes de finalizar.');
    }
});

// Verifica o estado do carrinho ao carregar a página
window.onload = function() {
    atualizarCarrinho();
};
