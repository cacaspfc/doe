var baseUrl = 'https://doeparceiro.herokuapp.com';

//fetch api (AJAX) to fill table
function fillTable() {
  var user_id = localStorage.getItem('User');
  fetch(baseUrl + '/userdoacao/' + user_id)
    .then((response) => response.json())
    .then((data) => {
      let html = '';
      for (i = 0; i < data.length; i++) {
        html +=
        '<div class="container">' +
        '<table id="table_posicao"">' +
          '<tr>' +
          '<td>' +
          data[i].dataDoacao.substr(0, 10) +
          '</td>' +
          '<td>' +
          data[i].localDoacao +
          '</td>' +
          '<td>' +
          '<div class="btn-group" role="group" aria-label="Basic example">' +
          '</div>' +
          '</td>' +
          '</tr>' + '</table>' +
          '</div>';
      }
      $('#tblBody').html(html);
    })
    .catch((err) => console.log('ERROR!: ', err));
}
$(document).ready(function () {
  fillTable();
});

function registrarDoacao(event) {
  event.preventDefault();
  var user_id = localStorage.getItem('User');
  var genero = document.getElementById('sexo').value;
  if (genero == '') {
    alert('Por preencha seu sexo nos seus dados cadastrais');
  } else {
    var dataDoacao = document.getElementById('dataDoacao').value;
    var localDoacao = document.getElementById('localDoacao').value;
    var dataDoacaoInit = dataDoacao.split('/');
    var dataDoacaoFinal =
      dataDoacaoInit[2] + '-' + dataDoacaoInit[1] + '-' + dataDoacaoInit[0];
    fetch(baseUrl + '/registrodoacao/' + user_id, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataDoacaoFinal, localDoacao }),
    }).then(function (response) {
      if (response.status == 400) {
        alert('Desculpe, tente fazer depois');
      } else if (response.status == 409) {
        alert('Há conflito de data de doação');
      } else if (response.status == 200) {
        alert('Doação Registrado com Sucesso');
      } else {
        alert('ERROOR');
      }
      fillTable();
    });
  }
}
function showRegister(event) {}
