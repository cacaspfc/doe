var baseUrl = 'http://localhost:8000';

function showTrophie(event) {
  event.preventDefault();
  var user_id = localStorage.getItem('User');
  fetch(baseUrl + '/usertrophy/' + user_id)
    .then((response) => response.json())
    .then((data) => {
      let html = '';
      for (i = 0; i < data.trofeus.length; i++) {
        if (data.trofeus[i] == 'T0') {
          document.getElementById('T0').style('filter: grayscale(0%);');
        }
      }
    })
    .catch((err) => console.log('ERROR!: ', err));
}
