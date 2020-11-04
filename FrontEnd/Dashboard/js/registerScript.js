var baseUrl = 'http://localhost:8000';

function registrarDoacao(event) {
  event.preventDefault();
  var genero = document.getElementById('sexo').value;
  if (genero == '') {
    alert('preencha seus dados cadastrais primeiro');
  } else {
    var dataDoacao = document.getElementById('dataDoacao').value;
    var localDoacao = document.getElementById('localDoacao').value;
    var user_id = localStorage.getItem('User');

    var dataDoacaoInit = dataDoacao.split('/');
    var dataDoacaoFinal =
      dataDoacaoInit[2] + '-' + dataDoacaoInit[1] + '-' + dataDoacaoInit[0];

    fetch(baseUrl + '/registrodoacao/' + user_id, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataDoacaoFinal, localDoacao }),
    }).then(function (response) {
      if (response.status != 400) {
        alert('Fon');
      } else {
        alert('Erro errado');
      }
    });
  }
}
$(document).ready(function () {
  fillTable();
});
//fetch api (AJAX) to fill table
fillTable = () => {
  var user_id = localStorage.getItem('User');
  fetch(baseUrl + '/userdoacao/' + user_id)
    .then((response) => response.json())
    .then((data) => {
      let html = '';
      for (i = 0; i < data.length; i++) {
        html +=
          '<tr>' +
          '<td class="">' +
          data[i].dataDoacao +
          '</td>' +
          '<br/><br/>' +
          '<td class="">' +
          data[i].localDoacao +
          '</td>' +
          '<br/><br/>' +
          '<td class="pv3 w-30 pr3 bb b--black-20">' +
          '<div class="btn-group" role="group" aria-label="Basic example">' +
          '</div>' +
          '</td>' +
          '</tr>';
      }
      $('#tblBody').html(html);
    })
    .catch((err) => console.log('ERROR!: ', err));
};
function showRegister(event) {}
