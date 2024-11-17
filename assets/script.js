function logar(){
    var login = document.getElementById("login").value;
    var senha = document.getElementById("senha").value;

    if(login == "js" && senha == "js"){
        alert("Sucessuful")
        location.href = "index.html"
    }
    else{
        alert("Usuário ou senha incorretos!");
    }
}