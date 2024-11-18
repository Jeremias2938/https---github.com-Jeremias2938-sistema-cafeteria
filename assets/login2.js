    // Aguarda o carregamento completo do DOM
    document.addEventListener('DOMContentLoaded', () => {
        // Adiciona o evento ao formulário de login
        document.getElementById('formulario_login').addEventListener('submit', function (event) {
            event.preventDefault(); // Evita o envio do formulário

            // Obtém os valores dos campos de e-mail e senha
            const email = document.querySelector('input[name="email"]').value;
            const senha = document.querySelector('input[name="senha"]').value;

            // Validação do login usando o array global `usuarios`
            const usuario = usuarios.find(user => user.email === email && user.senha === senha);

            if (usuario) {
                alert(`Bem-vindo, ${usuario.nome}!`);
                // Redireciona para a página inicial
                window.location.href = 'home.html';
            } else {
                alert("E-mail ou senha incorretos. Tente novamente.");
            }
        });
    });