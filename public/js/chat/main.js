var socket = io.connect("192.168.12.130:8080", { 'forceNew': true});

nombrejug = "";
id = null;

socket.on("nombre", function(data, color, dinero){
	nombrejug=data;
	document.getElementsByClassName("marcador1")[0].innerHTML = nombrejug;
	document.getElementsByClassName("cantidad")[0].innerHTML = dinero;
	$(".marcador").css("background-color", color);
});

//Inicio piezas
socket.on("posiciones", function(data){
	$(".piezajug1").css("margin-left", data[0][0]);
	$(".piezajug1").css("margin-top", data[0][1]);
	$(".piezajug2").css("margin-left", data[1][0]);
	$(".piezajug2").css("margin-top", data[1][1]);
	$(".piezajug3").css("margin-left", data[2][0]);
	$(".piezajug3").css("margin-top", data[2][1]);
	$(".piezajug4").css("margin-left", data[3][0]);
	$(".piezajug4").css("margin-top", data[3][1]);
});
//Fin inicio piezas

//Buscar
function addbuscar(e) {
	if(0 != document.getElementsByTagName("select")[0].value){
		socket.emit("buscar.casilla", document.getElementsByTagName("select")[0].value);
	}
	return false;
}
socket.on("mostrar-casilla-buscador", function(data){
	var cas = document.getElementsByClassName("buscar");
	cas[0].setAttribute("src", data);
});
//Fin buscar


socket.on("messages", function(data){
	render(data);
});

function render(data){
	var html = data.map(function(elem, index){
		return(`<div>
				  <strong>${elem.author}</strong>:
				  <em>${elem.text}</em>
				</div>`);
	}).join(" ");
	document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
	var payload = {
		author: nombrejug,
		text: document.getElementById("texto").value
	};

	socket.emit("new.message", payload);
	return false;
}


//Movimiento fichas
function mover(num, num2){
	numsum = num+num2;
	socket.emit("mov.fichas", 1, nombrejug);
}
socket.on('mov.fichas.lateral', function(num, posoriginal, nomjug){
	$( nomjug ).animate({
    	'margin-left': posoriginal+"px",
  	}, 3000);
});
socket.on('mov.fichas.vertical', function(num, posoriginal, nomjug){
	$( nomjug ).animate({
    	'margin-top': posoriginal+"px",
  	}, 3000);
});
socket.on('mov.fichas.custom', function(num, posoriginal, posoriginal1, nomjug){
	$( nomjug ).animate({
    	'margin-left': posoriginal+"px",
  	}, 3000);
  	$( nomjug ).animate({
    	'margin-top': posoriginal1+"px",
  	}, 3000);
});
socket.on('mov.fichas.custom1', function(num, posoriginal, posoriginal1, nomjug){
	$( nomjug ).animate({
    	'margin-top': posoriginal+"px",
  	}, 3000);
  	$( nomjug ).animate({
    	'margin-left': posoriginal1+"px",
  	}, 3000);
});
//Fin movimiento fichas



// Mostrar casilla
socket.on('mostrar-casilla', function(data){
	var cas = document.getElementsByClassName("mostrar-casilla");
	cas[0].setAttribute("src", data);
});
//Fin mostrar casilla




//Comprar/No comprar
socket.on("comprar", function(data){
	id = data;
	$(".comprar").prop("disabled", false);
	$(".nocomprar").prop("disabled", false);
});
socket.on("bloquear", function(){
	$("#result").prop("disabled", true);
});


function comprarpropiedad(){
	socket.emit("compra", id);
}

socket.on("compra.definitiva", function(dinero){
	document.getElementsByClassName("cantidad")[0].innerHTML = dinero;
	$(".comprar").prop("disabled", true);
	$(".nocomprar").prop("disabled", true);
});

socket.on("desbloquear", function(){
	$("#result").prop("disabled", false);
});


function nocomprarpropiedad(){
	socket.emit("nocomprar");
	$(".comprar").prop("disabled", true);
	$(".nocomprar").prop("disabled", true);
};

//Fin Comprar/No Comprar


//Alquiler
socket.on("alquiler/impuestos", function(dinero){
	document.getElementsByClassName("cantidad")[0].innerHTML = dinero;
})


//Mostrar suerte
socket.on("suerte", function(data){
	alert(data);
});


socket.on("emision", function(){
	alert("daskjhbrihfv");
})


//Alquiler
socket.on("alquiler", function(){
	$(".comprar").prop("disabled", false);
	$(".nocomprar").prop("disabled", false);
	$(".pagaralquiler").prop("disabled", false);
});

function pagaralquiler(){
	socket.emit("cambioturno");
}


//Hipoteca
function hipotecar(){
	socket.emit("hipotecar", document.getElementsByTagName("select")[0].value);
}

socket.on("respuesta", function(respuesta){
	if(respuesta==0){
		alert("No es tu turno");
	}else if(respuesta == 1){
		alert("Se ha hipotecado la casilla selecionada");
	}else if(respuesta == 2){
		alert("La casilla selecionada no es tu propiedad no se puede hipotecar");
	}else{
		alert("La casilla selecionada ya esta hipotecada o construida y no se puede hipotecar");
	}
});


socket.on("dis", function(nom){
	alert("Ha ganado "+nom+" por desconexion");
	window.location.replace("http://192.168.12.130:8080");
})