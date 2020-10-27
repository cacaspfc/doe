var menuInicio = document.getElementById("menuInicio");  
var menuCadastro = document.getElementById("menuCadastro");  
var menuTrofeu = document.getElementById("menuTrofeu");  
var menuRegistro = document.getElementById("menuRegistro");  
var menuLocais = document.getElementById("menuLocais");  


var sectionInicio = document.getElementById("inicio");
var sectionCadastro = document.getElementById("cadastro");  
var sectionRegistro = document.getElementById("registro");
var sectionTrofeu = document.getElementById("trofeu");
var sectionLocais = document.getElementById("locais");

sectionInicio.style.display = "block";  
sectionCadastro.style.display = "none";  
sectionRegistro.style.display = "none";  
sectionTrofeu.style.display = "none";  
sectionLocais.style.display = "none";

menuInicio.addEventListener("click", function(){  
    sectionInicio.style.display = "block";
    sectionCadastro.style.display = "none";  
    sectionRegistro.style.display = "none";  
    sectionTrofeu.style.display = "none";  
    sectionLocais.style.display = "none";
    
} ,false);  


menuCadastro.addEventListener("click", function(){  
    sectionCadastro.style.display = "block";
    sectionInicio.style.display = "none";
    sectionRegistro.style.display = "none";  
    sectionTrofeu.style.display = "none";  
    sectionLocais.style.display = "none";
    
}    ,false);  

menuTrofeu.addEventListener("click", function(){  
    sectionCadastro.style.display = "none";
    sectionInicio.style.display = "none";
    sectionRegistro.style.display = "none";  
    sectionTrofeu.style.display = "block";  
    sectionLocais.style.display = "none";
    
}    ,false);  

menuRegistro.addEventListener("click", function(){  
    sectionCadastro.style.display = "none";
    sectionInicio.style.display = "none";
    sectionRegistro.style.display = "block";  
    sectionTrofeu.style.display = "none";  
    sectionLocais.style.display = "none";
    
}    ,false);  

menuLocais.addEventListener("click", function(){  
    sectionCadastro.style.display = "none";
    sectionInicio.style.display = "none";
    sectionRegistro.style.display = "none";  
    sectionTrofeu.style.display = "none";  
    sectionLocais.style.display = "block";
    
}    ,false);  



// PARAMETRIZAÇÃO API MAPS

function inicializar() {
    var coordenadas = {lat: -22.912869, lng: -43.228963};
    
    var mapa = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 15,
        center: coordenadas 
    });
    
    var marker = new google.maps.Marker({
        position: coordenadas,
        map: mapa,
        title: 'Meu marcador'
    });
}

// PARAMETRIZAÇÃO API VIACEP /PUXAR OS DADOS AUTOMATICAMENTE PELO CEP

$("#cep").focusout(function(){
    //Início do Comando AJAX
    $.ajax({
        //O campo URL diz o caminho de onde virá os dados
        //É importante concatenar o valor digitado no CEP
        url: 'https://viacep.com.br/ws/'+$(this).val()+'/json/unicode/',
        //Aqui você deve preencher o tipo de dados que será lido,
        //no caso, estamos lendo JSON.
        dataType: 'json',
        //SUCESS é referente a função que será executada caso
        //ele consiga ler a fonte de dados com sucesso.
        //O parâmetro dentro da função se refere ao nome da variável
        //que você vai dar para ler esse objeto.
        success: function(resposta){
            //Agora basta definir os valores que você deseja preencher
            //automaticamente nos campos acima.
            $("#logradouro").val(resposta.logradouro);
            $("#complemento").val(resposta.complemento);
            $("#bairro").val(resposta.bairro);
            $("#cidade").val(resposta.localidade);
            $("#uf").val(resposta.uf);
            $("#ddd").val(resposta.ddd);
            //Vamos incluir para que o Número seja focado automaticamente
            //melhorando a experiência do usuário
            $("#numero").focus();
        }
    });
});


// FORMATAÇÃO DE DATA

var data = document.getElementById("dataDoacao");
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
} 
if(mm<10){
    mm='0'+mm
} 

today = dd+'/'+mm+'/'+yyyy;
document.getElementById("dataDoacao").setAttribute("max", today);



data.onblur = function(){
    if(data.value  > today){
        alert("Data inserida maior que a atual. Favor inserir uma data vaiida");
        data.value = ("");
        document.getElementById("dataDoacao").focus();
        

    }
    else{
        
    }
}


var input = document.getElementById("dataDoacao");
  
var dateInputMask = function dateInputMask(elm) {
  elm.addEventListener('keypress', function(e) {
    if(e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }
    
    var len = elm.value.length;
    
    // If we're at a particular place, let the user type the slash
    // i.e., 12/12/1212
    if(len !== 1 || len !== 3) {
      if(e.keyCode == 47) {
        e.preventDefault();
      }
    }
    
    // If they don't add the slash, do it for them...
    if(len === 2) {
      elm.value += '/';
    }

    // If they don't add the slash, do it for them...
    if(len === 5) {
      elm.value += '/';
    }
  });
};
  
dateInputMask(input);


