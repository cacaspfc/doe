var baseUrl = 'https://doeparceiro.herokuapp.com';

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
  var dataNascimento = document
    .getElementById('datanasc')
    .value.replaceAll('/', '');
  var genero = document.getElementById('sexo').value;
  var cep = document.getElementById('cep').value;
  var logradouro = document.getElementById('logradouro').value;
  var numero = document.getElementById('numero').value;
  var bairro = document.getElementById('bairro').value;
  var estado = document.getElementById('uf').value;
  var endereco =
    logradouro + ',' + numero + ',' + bairro + ',' + cep + ',' + estado;
  var telefone = document
    .getElementById('phone')
    .value.replace('(', '')
    .replace(')', '')
    .trim();
  var tipoSangue = document.getElementById('tiposanguineo').value;
  var peso = document.getElementById('peso').value;
  var altura = document.getElementById('altura').value;

  var _id = localStorage.getItem('User');
  fetch(baseUrl + '/atualizar/' + _id, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
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
    if (response.status != 400) {
      alert('Alterado com sucesso');
    } else {
      alert('Erro na Atualização cadastro!');
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
        var dataNascimento = data.dataNascimento;
        var peso = data.peso;
        var tipoSangue = data.tipoSangue;
        var estado = data.estado;
        var altura = data.altura;
        var telefone = data.telefone;
        var endereco = data.endereco;
        var enderecoP = [];
        if (endereco != undefined) {
          var enderecoP = endereco.split(',');
          document.getElementById('cep').value = enderecoP[3];
          document.getElementById('logradouro').value = enderecoP[0];
          document.getElementById('numero').value = enderecoP[1];
          document.getElementById('bairro').value = enderecoP[2];
          document.getElementById('uf').value = estado;
        }
        if (dataNascimento != undefined) {
          document.getElementById('datanasc').value =
            dataNascimento.substr(0, 2) +
            '/' +
            dataNascimento.substr(2, 2) +
            '/' +
            dataNascimento.substr(4);
        }
        if (telefone != undefined) {
          document.getElementById('phone').value = telefone;
          document.getElementById('phone').dispatchEvent(new Event('keypress'));
        }
        if (peso != undefined) {
          document.getElementById('peso').value = peso;
        }
        if (altura != undefined) {
          document.getElementById('altura').value = altura;
        }
        document.getElementById('email').value = email;
        document.getElementById('nome').value = username;
        document.getElementById('sexo').value = data.genero;
        document.getElementById('tiposanguineo').value = tipoSangue;

        document.querySelectorAll('#informa')[0].innerHTML += ' ' + username;
        document.querySelectorAll('#informa')[1].innerHTML +=
          ' ' + new Date(data.dateRegister).toLocaleString();
        document.querySelectorAll('#informa')[2].innerHTML += ' ' + tipoSangue;
      });
    } else {
      alert('Erro!');
    }
  });
}

function name(params) {}
