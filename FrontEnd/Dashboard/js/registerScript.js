var baseUrl = 'http://localhost:8000';

function registrarDoacao(event) {
  event.preventDefault();
  var genero = document.getElementById('sexo').value;
  if (genero == '') {
    alert("preencha seus dados cadastrais primeiro")
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
