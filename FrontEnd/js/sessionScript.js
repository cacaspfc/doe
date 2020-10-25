var baseUrl = "http://localhost:8000";

function login(event) {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  fetch(baseUrl + "/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(function (response) {
    if (response.status != 400) {
      window.location.href = "../../src/public/dashboard.html";
    } else {
      alert("Email ou senha errado");
    }
  });
}

function cadastrar(event) {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  fetch(baseUrl + "/cadastrar", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  }).then(function (response) {
    console.log(response);
    if (response.status != 400) {
      alert("Cadastrado com sucesso");
      // window.location.href = "../../src/public/dashboard.html";
      return;
    } else {
      alert("Erro no cadastro!");
    }
  });
}

function atualizarDados(event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var username = document.getElementById("nome").value;
  var dataNascimento = document.getElementById("datanasc").value;
  var genero = document.getElementById("sexo").value;
  var cep = document.getElementById("cep").value;
  var logradouro = document.getElementById("logradouro").value;
  var numero = document.getElementById("numero").value;
  var bairro = document.getElementById("bairro").value;
  var estado = document.getElementById("uf").value;
  var endereco =
    logradouro + "," + numero + "," + bairro + "," + cep + "," + estado;
  var telefone =
    document.getElementById("ddd").value +
    document.getElementById("celular").value;
  var tipoSangue = document.getElementById("tiposanguineo").value;
  var peso = document.getElementById("peso").value;
  var altura = document.getElementById("altura").value;

  // localStorage.setItem("User",);
  //id de teste
  var _id = "5f8bae16daac243f2c1a9687"; //REMOVER LINHA
  fetch(baseUrl + "/atualizar", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      _id,
      email,
      username,
      dataNascimento,
      endereco,
      telefone,
      tipoSangue,
      genero,
      peso,
      altura,
      estado,
    }),
  }).then(function (response) {
    console.log(response);
    if (response.status != 400) {
      alert("Alterado com sucesso");
      // window.location.href = "../../src/public/dashboard.html";
    } else {
      alert("Erro no cadastro!");
    }
  });
}
