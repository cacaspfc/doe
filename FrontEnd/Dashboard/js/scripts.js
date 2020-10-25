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

let datanasc = document.getElementById("datanasc").value; 
let nome = document.getElementById("nome").value;
console.log(datanasc);
console.log(nome);
