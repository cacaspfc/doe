var baseUrl = 'http://localhost:8000';

function login(event) {
  event.preventDefault();
  var email = document.getElementById('username').value;
  var password = document.getElementById('senha').value;
  fetch(baseUrl + '/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(function (response) {
    if (response.status != 400) {
      response.json().then((data) => {
        localStorage.setItem('User', data._id);
        window.location.href = '../../FrontEnd/Dashboard/index.html';
      });
    } else {
      alert('Email ou senha errado');
    }
  });
}

function cadastrar(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('senha').value;

  fetch(baseUrl + '/cadastrar', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  }).then(function (response) {
    console.log(response);
    if (response.status == 200) {
      response.json().then((data) => {
        localStorage.setItem('User', data._id);
        window.location.href = '../../Dashboard/index.html';
      });
    } else if (response.status == 409) {
      alert('Email já está em uso por outro usuario');
    } else {
      alert('Erro no cadastro!');
    }
  });
}

function atualizarDados(event) {
  event.preventDefault();

  var email = document.getElementById('email').value;
  var username = document.getElementById('nome').value;
  var dataNascimento = document.getElementById('datanasc').value;
  var genero = document.getElementById('sexo').value;
  var cep = document.getElementById('cep').value;
  var logradouro = document.getElementById('logradouro').value;
  var numero = document.getElementById('numero').value;
  var bairro = document.getElementById('bairro').value;
  var estado = document.getElementById('uf').value;
  var endereco =
    logradouro + ',' + numero + ',' + bairro + ',' + cep + ',' + estado;
  var telefone =
    document.getElementById('ddd').value +
    document.getElementById('celular').value;
  var tipoSangue = document.getElementById('tiposanguineo').value;
  var peso = document.getElementById('peso').value;
  var altura = document.getElementById('altura').value;

  var _id = localStorage.getItem('User');
  fetch(baseUrl + '/atualizar', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
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
      alert('Alterado com sucesso');
    } else {
      alert('Erro no cadastro!');
    }
  });
}
function DadosUser(event) {
  event.preventDefault();

  var _id = localStorage.getItem('User');
  fetch(baseUrl + '/loginuser/' + _id, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  }).then(function (response) {
    if (response.status != 400) {
      response.json().then((data) => {
        var email = data.email;
        var username = data.username;
        var genero = data.genero;
        var peso = data.peso;
        var tipoSangue = data.tipoSangue;
        var estado = data.estado;
        var altura = data.altura;
        var telefone = data.telefone;
        var ddd;
        if (telefone != undefined) {
          telefone = telefone.substr(2);
          ddd = data.telefone.substr(0, 1);
        }
        var endereco = data.endereco;
        var enderecoP;
        if (endereco != undefined) {
          var enderecoP = endereco.split(',');
        }
        document.getElementById('email').value = email;
        document.getElementById('nome').value = username;
        // document.getElementById('datanasc').value;
        document.getElementById('sexo').value = genero;
        document.getElementById('cep').value = enderecoP[3];
        document.getElementById('logradouro').value;
        document.getElementById('numero').value;
        document.getElementById('bairro').value;
        document.getElementById('uf').value;
        document.getElementById('ddd').value = ddd;
        document.getElementById('celular').value = telefone;
        document.getElementById('tiposanguineo').value = tipoSangue;
        document.getElementById('peso').value = peso;
        document.getElementById('altura').value = altura;
      });
    } else {
      alert('Erro!');
    }
  });
}
