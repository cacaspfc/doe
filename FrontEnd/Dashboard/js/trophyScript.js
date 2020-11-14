var baseUrl = 'http://localhost:8000';

function showTrophie(event) {
  event.preventDefault();
  var user_id = localStorage.getItem('User');
  fetch(baseUrl + '/usertrophy/' + user_id)
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < data.trofeus.length; i++) {
        if (data.trofeus[i] == 'T0') {
          var lista = document.querySelectorAll('#T0').length;
          for (let i = 0; i < lista; i++) {
            document.querySelectorAll('#T0')[i].style.filter = 'grayscale(0%)';
          }
        }
      }
    })
    .catch((err) => console.log('ERROR!: ', err));
}
