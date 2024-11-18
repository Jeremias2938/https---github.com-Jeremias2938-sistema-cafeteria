// Array global para armazenar os usuários (carregado do LocalStorage, se existir)
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Lista global para o usuário logado
let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || null;

// Classe Usuario
class Usuario {
    constructor(nome, cpf, endereco, email, senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.email = email;
        this.senha = senha;
    }

    validarDados() {
        if (!this.nome || !this.cpf || !this.endereco || !this.email || !this.senha) {
            alert("Todos os campos devem ser preenchidos.");
            return false;
        }
        if (!this.validarEmail(this.email)) {
            alert("E-mail inválido.");
            return false;
        }
        if (!this.validarCPF(this.cpf)) {
            alert("CPF inválido.");
            return false;
        }
        return true;
    }

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validarCPF(cpf) {
        return /^\d{11}$/.test(cpf);
    }

    salvar() {
        if (this.validarDados()) {
            usuarios.push(this);
            this.atualizarLocalStorage();
            return true;
        }
        return false;
    }

    atualizarLocalStorage() {
        // Salva o array de usuários no LocalStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    static exibirUsuarios() {
        if (usuarios.length === 0) {
            console.log("Não há usuários cadastrados.");
            return;
        }
        usuarios.forEach(usuario => {
            console.log(`Nome: ${usuario.nome}, CPF: ${usuario.cpf}, Endereço: ${usuario.endereco}, E-mail: ${usuario.email}`);
        });
    }

    // Método de login
    static fazerLogin(email, senha) {
        const usuario = usuarios.find(u => u.email === email && u.senha === senha);
        if (usuario) {
            alert(`Bem-vindo, ${usuario.nome}!`);
            console.log(`Usuário autenticado: Nome: ${usuario.nome}, E-mail: ${usuario.email}`);
            
            // Armazenar o usuário logado no LocalStorage
            usuarioLogado = usuario;
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            
            return usuario;
        } else {
            alert("E-mail ou senha incorretos.");
            return null;
        }
    }

    // Método para criar o usuário admin inicial, se não existir
    static criarAdminInicial() {
            const admin = new Usuario("Admin", "12345678901", "Rua A, 123", "Admin@Admin.com", "Admin");
            admin.salvar();
            console.log("Admin inicial criado.");
        
    }

    static verificarUsuariosAtivos() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')); // Recupera o usuário logado do localStorage
    
        if (usuarioLogado) {
            console.log(`Usuário ativo: ${usuarioLogado.nome}`);
        } else {
            console.log("Nenhum usuário está logado.");
            alert("Nenhum usuário está logado.");
            window.location.href = "index.html"; // Redireciona para a página de login caso não haja usuário logado
        }
    }

    static deslogarUsuario() {
        if (usuarioLogado) {
            localStorage.removeItem('usuarioLogado');
            usuarioLogado = null;
            alert("Você foi deslogado.");
            console.log("Usuário deslogado.");
        } else {
            alert("Nenhum usuário está logado.");
            console.log("Não há usuário para deslogar.");
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona o evento de clique para o link "Sair"
    const sairLink = document.getElementById('sair');
    sairLink.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o redirecionamento imediato
        Usuario.deslogarUsuario(); // Chama a função de deslogar

        // Redireciona para a página de login após o logout
        window.location.href = 'index.html'; // Página de login
    });
});



Usuario.criarAdminInicial();


