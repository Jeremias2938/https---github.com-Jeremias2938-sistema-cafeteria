// Array global para armazenar os usuários (carregado do LocalStorage, se existir)
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

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
            alert("Usuário cadastrado com sucesso!");
            console.log(`Nome: ${this.nome}, CPF: ${this.cpf}, Endereço: ${this.endereco}, E-mail: ${this.email}`);
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
            return usuario;
        } else {
            alert("E-mail ou senha incorretos.");
            return null;
        }
    }
}
