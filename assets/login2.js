// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona o evento ao formulário de login
    document.getElementById('formulario_login').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio do formulário

        // Obtém os valores dos campos de e-mail e senha
        const email = document.querySelector('input[name="email"]').value;
        const senha = document.querySelector('input[name="senha"]').value;





        if (email == "Admin@Admin.com" && senha == "Admin") {
            alert("Logado como Admin!")

            const usuario = usuarios.find(user => user.email === email && user.senha === senha);
            usuarioLogado = usuario;
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

           // Redireciona para a página inicial ADM

            location.href = "homeAdm.html"
        }
        else {
            const usuario = usuarios.find(user => user.email === email && user.senha === senha);

            if (usuario) {
                alert(`Bem-vindo, ${usuario.nome}!`);
                usuarioLogado = usuario;
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                // Redireciona para a página inicial
                window.location.href = 'home.html';
            } else {
                alert("E-mail ou senha incorretos. Tente novamente.");
            }
        }
        
        

    });

    
});