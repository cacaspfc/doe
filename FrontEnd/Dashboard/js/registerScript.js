var baseUrl = 'https://doeparceiro.herokuapp.com';

function registrarDoacao(event) {
  event.preventDefault();
  var user_id = localStorage.getItem('User');
  var genero = document.getElementById('sexo').value;
  if (genero == '') {
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
      } else if (response.status == 200){
        alert('Doação Registrado com Sucesso');
      }else{
        alert('ERROOR');
      }
    });
    fillTable();
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
          '<tr class="active">' +
          '<td>' +
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
