// ESTILIZAÇÃO DO MENU COM A SECTION INDEPENDENTES

// DEFINIR VARIAVEIS MENU E SECTION

var menuInicio = document.getElementById('menuInicio');
var menuCadastro = document.getElementById('menuCadastro');
var menuTrofeu = document.getElementById('menuTrofeu');
var menuRegistro = document.getElementById('menuRegistro');
var menuLocais = document.getElementById('menuLocais');

var sectionInicio = document.getElementById('inicio');
var sectionCadastro = document.getElementById('cadastro');
var sectionRegistro = document.getElementById('registro');
var sectionTrofeu = document.getElementById('trofeu');
var sectionLocais = document.getElementById('locais');

sectionInicio.style.display = 'block';
sectionCadastro.style.display = 'none';
sectionRegistro.style.display = 'none';
sectionTrofeu.style.display = 'none';
sectionLocais.style.display = 'none';

menuInicio.addEventListener(
  'click',
  function () {
    sectionInicio.style.display = 'block';
    sectionCadastro.style.display = 'none';
    sectionRegistro.style.display = 'none';
    sectionTrofeu.style.display = 'none';
    sectionLocais.style.display = 'none';
  },
  false
);

menuCadastro.addEventListener(
  'click',
  function () {
    sectionCadastro.style.display = 'block';
    sectionInicio.style.display = 'none';
    sectionRegistro.style.display = 'none';
    sectionTrofeu.style.display = 'none';
    sectionLocais.style.display = 'none';
  },
  false
);

menuTrofeu.addEventListener(
  'click',
  function () {
    sectionCadastro.style.display = 'none';
    sectionInicio.style.display = 'none';
    sectionRegistro.style.display = 'none';
    sectionTrofeu.style.display = 'block';
    sectionLocais.style.display = 'none';
  },
  false
);

menuRegistro.addEventListener(
  'click',
  function () {
    sectionCadastro.style.display = 'none';
    sectionInicio.style.display = 'none';
    sectionRegistro.style.display = 'block';
    sectionTrofeu.style.display = 'none';
    sectionLocais.style.display = 'none';
  },
  false
);

menuLocais.addEventListener(
  'click',
  function () {
    sectionCadastro.style.display = 'none';
    sectionInicio.style.display = 'none';
    sectionRegistro.style.display = 'none';
    sectionTrofeu.style.display = 'none';
    sectionLocais.style.display = 'block';
  },
  false
);

// PARAMETRIZAÇÃO API VIACEP /PUXAR OS DADOS AUTOMATICAMENTE PELO CEP

$('#cep').focusout(function () {
  //Início do Comando AJAX
  $.ajax({
    //O campo URL diz o caminho de onde virá os dados
    //É importante concatenar o valor digitado no CEP
    url: 'https://viacep.com.br/ws/' + $(this).val() + '/json/unicode/',
    //Aqui você deve preencher o tipo de dados que será lido,
    //no caso, estamos lendo JSON.
    dataType: 'json',
    //SUCESS é referente a função que será executada caso
    //ele consiga ler a fonte de dados com sucesso.
    //O parâmetro dentro da função se refere ao nome da variável
    //que você vai dar para ler esse objeto.
    success: function (resposta) {
      //Agora basta definir os valores que você deseja preencher
      //automaticamente nos campos acima.
      $('#logradouro').val(resposta.logradouro);
      $('#complemento').val(resposta.complemento);
      $('#bairro').val(resposta.bairro);
      $('#cidade').val(resposta.localidade);
      $('#uf').val(resposta.uf);
      $('#ddd').val(resposta.ddd);
      //Vamos incluir para que o Número seja focado automaticamente
      //melhorando a experiência do usuário
      $('#numero').focus();
    },
  });
});

// FORMATAÇÃO DE DATA DE REGISTRO

// DEFININDO A MASCARA PARA O INPUT

var input = document.getElementById('dataDoacao');
var nascimento = document.getElementById('datanasc');

var dateInputMask = function dateInputMask(elm) {
  elm.addEventListener('keypress', function (e) {
    if (e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }

    var len = elm.value.length;

    // Se estivermos em um lugar específico, deixe o usuário digitar a barra
    // i.e., 12/12/1212
    if (len !== 1 || len !== 3) {
      if (e.keyCode == 47) {
        e.preventDefault();
      }
    }

    // Se eles não adicionarem a barra, faça isso por eles ...
    if (len === 2) {
      elm.value += '/';
    }

    // Se eles não adicionarem a barra, faça isso por eles ...
    if (len === 5) {
      elm.value += '/';
    }
  });
};

dateInputMask(input);
dateInputMask(nascimento);

// ADICIONANDO EVENTO AO BOTÃO

var botaoRegistro = document.getElementById('btn-register');

botaoRegistro.addEventListener(
  'click',
  function () {
    var sexo = document.getElementById('sexo').value;
    var data = document.getElementById('dataDoacao').value;
    var parteData = data.split('/');
    var dataAno = new Date(parteData[2], parteData[1] - 1, parteData[0]);
    if (document.getElementById('nome').value == 'admin') {
      registrarDoacao(event);
      fillTable();
    } else {
      if (dataAno > new Date()) {
        alert('Data incorreta');
      } else if ((sexo = '')) {
        alert('Preencha seus dados cadastrais primeiro');
      } else {
        registrarDoacao(event);
        fillTable();
      }
    }
  },
  false
);

// MASCARA PARA O CAMPO CELULAR

function mask(o, f) {
  setTimeout(function () {
    var v = mphone(o.value);
    if (v != o.value) {
      o.value = v;
    }
  }, 1);
}

function mphone(v) {
  var r = v.replace(/\D/g, '');
  r = r.replace(/^0/, '');
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
  } else {
    r = r.replace(/^(\d*)/, '($1');
  }
  return r;
}

window.onload = DadosUser(new Event('event'));

// MASCARA PESO

function mascara_peso() {
  var v = this.value,
    integer = v.split('.')[0];
  v = v.replace(/\D/g, '');
  v = v.replace(/^[0]+/, '');
  if (v.length <= 4 || !integer) {
    if (v.length === 1) v = '00,' + v;
    if (v.length === 2) v = v[0] + v[1];
    if (v.length === 3) v = v[0] + v[1] + v[2];
    if (v.length === 4) v = v[0] + v[1] + ',' + v[2] + v[3];
  } else {
    v = v[0] + v[1] + v[2] + ',' + v[3] + v[4];
  }
  console.log(v);

  this.value = v;
}

$(document).on('keyup', '#peso', mascara_peso);

// ====================================================

// MASCARA ALTURA

function mascara_altura() {
  var v = this.value,
    integer = v.split('.')[0];
  v = v.replace(/\D/g, '');
  v = v.replace(/^[0]+/, '');

  if (v.length === 3) v = ' ' + v[0] + ',' + v[1] + v[2];
  this.value = v;
}
$(document).on('keyup', '#altura', mascara_altura);

// Icone Avatar
var carregar;
function loadImg(img) {
  carregar = new Image();
  carregar.src = img;
  document.getElementById('ft_perfil').innerHTML = 'Loading';
  setTimeout('verificarCarregameto()', 1);
}

function verificarCarregameto() {
  if (carregar.complete) {
    document.getElementById('ft_perfil').innerHTML =
      '<img class="avatarPerfil" src="' + carregar.src + '" width=50 />';
  } else {
    setTimeout('verificarCarregameto()', 1);
  }
}
