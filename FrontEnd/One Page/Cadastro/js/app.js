
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

// Verificação de senhar 
/* ----------------------------------------------------*/

function verificar(){
    senha = document.getElementById('senha').value;
    mostrar = document.getElementById('mostrar');
    fraca = 0; 

    if((senha.length >= 4) && (senha.length <= 7)){
        fraca += 10;
    }else if(senha.length>7){
		fraca += 25;
	}
	if(senha.match(/[a-z]+/)){
		fraca += 10;
	}
	if(senha.match(/[A-Z]+/)){
		fraca += 20;
	}
	if(senha.match(/d+/)){
		fraca += 20;
	}
	if(senha.match(/W+/)){
		fraca += 25;
	}
	return mostra_res();
}

function mostra_res(){
    if(fraca < 30){
		mostra.innerHTML = '<tr><td bgcolor="red" width="'+fraca+'"></td><td>Fraca </td></tr>';
	}else if((fraca >= 30) && (fraca < 60)){
		mostra.innerHTML = '<tr><td bgcolor="yellow" width="'+fraca+'"></td><td>Justa </td></tr>';;
	}else if((fraca >= 60) && (fraca < 85)){
		mostra.innerHTML = '<tr><td bgcolor="blue" width="'+fraca+'"></td><td>Forte </td></tr>';
	}else{
		mostra.innerHTML = '<tr><td bgcolor="green" width="'+fraca+'"></td><td>Excelente </td></tr>';
	}
}
