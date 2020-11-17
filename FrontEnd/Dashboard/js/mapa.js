// PARAMETRIZAÇÃO API MAPS

var mapa =  document.getElementById("mapa");

mapa.style.display = "none";


function mapa1() {

    var coordenadas = { lat: -23.556710, lng: -46.668774 };
    
    var mapa = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 15,
        center: coordenadas,
    });
    
    var marker = new google.maps.Marker({
        position: coordenadas,
        map: mapa,
        title: 'Posto Clínicas',
    });
}

function mapa2() {

    var coordenadas = { lat: -23.524876, lng: -46.771566 };
    
  
    var mapa = new google.maps.Map(document.getElementById('mapa'), {
      zoom: 15,
      center: coordenadas,
    });
  
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: mapa,
      title: 'Posto Clínicas',
    });
  }

function mapa3() {

    var coordenadas = { lat: -23.556710, lng: -46.668774 };
  
    var mapa = new google.maps.Map(document.getElementById('mapa'), {
      zoom: 15,
      center: coordenadas,
    });
  
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: mapa,
      title: 'Posto Clínicas',
    });
  }

function mapa4() {

    var coordenadas = { lat: -23.484444, lng: -46.630319 };
  
    var mapa = new google.maps.Map(document.getElementById('mapa'), {
      zoom: 15,
      center: coordenadas,
    });
  
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: mapa,
      title: 'Posto Clínicas',
    });
  }

function mapa5() {

    var coordenadas = { lat: -23.478406, lng: -46.551511 };
    
  
    var mapa = new google.maps.Map(document.getElementById('mapa'), {
      zoom: 15,
      center: coordenadas,
    });
  
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: mapa,
      title: 'Posto Clínicas',
    });
  }

function mapa6() {

    var coordenadas = { lat: -23.585130, lng: -46.651270 };
    
  
    var mapa = new google.maps.Map(document.getElementById('mapa'), {
      zoom: 16,
      center: coordenadas,
    });
  
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: mapa,
      title: 'Posto Clínicas',
    });
  }
