function logar(){
    var login = document.getElementById("login").value;
    var senha = document.getElementById("senha").value;

    if(login == "admin" && senha == "12345"){
        alert("Logado como Admin!")
        location.href = "index.html"
    }
    else{
        alert("Usuário ou senha incorretos!");
    }
}