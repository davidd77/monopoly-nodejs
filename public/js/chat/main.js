var socket = io.connect("192.168.12.130:8080", { 'forceNew': true});
socket.on("messages", function(data){
	console.log(data);
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
		author: document.getElementById("username").value,
		text: document.getElementById("texto").value
	};

	socket.emit("new.message", payload);
	return false;
}


//Movimiento fichas

function mover(num, num2){
	numsum = num+num2;
	socket.emit("mov.fichas", numsum);
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

//

socket.on('mostrar-casilla', function(data){
	var cas = document.getElementsByClassName("mostrar-casilla");
	cas[0].setAttribute("src", data);
});