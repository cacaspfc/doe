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
