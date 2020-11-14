var baseUrl = 'http://localhost:8000';

window.onload = showTrophie(new Event('event'));

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

          if (data.trofeus[i] == 'T1') {
            var lista = document.querySelectorAll('#T1').length;
            for (let i = 0; i < lista; i++) {
              document.querySelectorAll('#T1')[i].style.filter = 'grayscale(0%)';
            }
          }

          if (data.trofeus[i] == 'T2') {
            var lista = document.querySelectorAll('#T2').length;
            for (let i = 0; i < lista; i++) {
              document.querySelectorAll('#T2')[i].style.filter = 'grayscale(0%)';
            }
          }

            if (data.trofeus[i] == 'T3') {
              var lista = document.querySelectorAll('#T3').length;
              for (let i = 0; i < lista; i++) {
                document.querySelectorAll('#T3')[i].style.filter = 'grayscale(0%)';
              }
            }
            if (data.trofeus[i] == 'T4') {
              var lista = document.querySelectorAll('#T4').length;
              for (let i = 0; i < lista; i++) {
                document.querySelectorAll('#T4')[i].style.filter = 'grayscale(0%)';
              }
          }
            if (data.trofeus[i] == 'SF1') {
              var lista = document.querySelectorAll('#SF1').length;
              for (let i = 0; i < lista; i++) {
                document.querySelectorAll('#SF1')[i].style.filter = 'grayscale(0%)';
              }
          }
          if (data.trofeus[i] == 'SF2') {
            var lista = document.querySelectorAll('#SF2').length;
            for (let i = 0; i < lista; i++) {
                document.querySelectorAll('#SF2')[i].style.filter = 'grayscale(0%)';
              }
            }
            if (data.trofeus[i] == 'SF3') {
              var lista = document.querySelectorAll('#SF3').length;
              for (let i = 0; i < lista; i++) {
                document.querySelectorAll('#SF3')[i].style.filter = 'grayscale(0%)';
              }
            }
            if (data.trofeus[i] == 'SF4') {
              var lista = document.querySelectorAll('#SF4').length;
              for (let i = 0; i < lista; i++) {
                document.querySelectorAll('#SF4')[i].style.filter = 'grayscale(0%)';
              }
          }
          }

        })
        .catch((err) => console.log('ERROR!: ', err));
}
