var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Msg = require('../models/schema').msg;
var Cas = require('../models/schema').cas;
var precios = require('../models/schema').precio;
var suerte = require('../models/schema').s;
var caja = require('../models/schema').c;
var ruta = require('../routes/routes.main');
var jug = require('../clases/jugador');

//Objetos
jugador = new Array(4);
jugador[0] = new jug("Jugador1", 0, ".piezajug1", 1500);
jugador[1] = new jug("Jugador2", 0, ".piezajug2", 1500);
jugador[2] = new jug("Jugador3", 0, ".piezajug3", 1500);
jugador[3] = new jug("Jugador4", 0, ".piezajug4", 1500);

//Variables
colores = ["red", "blue", "green", "yelow"];
suertecaja = [2,7,17,22,33,35];
casillasesp = [0,4,10,20,30,38];
impuestos = 0;
mov = new Array(4);
mov[0] = [700,700];
mov[1] = [700,700];
mov[2] = [700,700];
mov[3] = [700,700];
var turno = 0;
var arrayips = [];
var arrayid = [];

//Llamada a la vista
app.set("view engine", "ejs");


//Llamada al schema de mensajes
var messages = [];
Msg.find({}, function(err, mensajes){ 
	mensajes.map(function(elem, index){ 
	messages.push({id: messages.length, text:elem.texto, author:elem.autor}); 
	}); 
});


app.use(express.static('public'));
app.use("/", ruta);


//Connection
io.on('connection', function(socket) {
	if(arrayips.length <4){
		var address = socket.handshake;
		var dis = false;
		for(var x = 0; x<arrayips.length; x++){
			if(address.address == arrayips[x]){
				dis = true;
				socket.emit("nombre", jugador[x].getNom(), colores[x], jugador[x].getdinero());
			}
		}
		if(dis==false){
			arrayid.push(socket.id);
			arrayips.push(address.address);
			socket.emit("nombre", jugador[arrayips.length-1].getNom(), colores[arrayips.length-1], jugador[arrayips.length-1].getdinero());
			console.log("Usuario conectado");
		}
		io.to(arrayid[0]).emit("emision");
	}else{
		console.log("Limite superado");
		socket.emit("nombre", "Espectador");
	}

	socket.emit("posiciones", mov);
	socket.emit("messages", messages);

	//Chat
	console.log('Alguien se ha conectado con Sockets');
	console.log(arrayips);
	socket.on('new.message', function(data){
			messages.push(data);
			var mensaje = new Msg({autor:data.author, texto:data.text}); 
			mensaje.save(function(err){ console.log(err); });
			io.sockets.emit("messages", messages);
	});


	//Movimiento fichas
	socket.on('mov.fichas', function(data, nom){
		var address = socket.handshake;
		if(arrayips[turno] == address.address){

			//Movimiento
			if(jugador[turno].getid()<10){
				if(data+jugador[turno].getid()<=10){
					jugador[turno].setid(data);
					mov[turno][0] = mov[turno][0] - data*65;
					io.sockets.emit("mov.fichas.lateral", data, mov[turno][0], jugador[turno].getpieza());
				}else{
					var custommov = 10-jugador[turno].getid();
					jugador[turno].setid(data);
					mov[turno][0] = mov[turno][0] - custommov*65;
					mov[turno][1] = mov[turno][1] - (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom", data, mov[turno][0], mov[turno][1], jugador[turno].getpieza());
				}
			}else if(jugador[turno].getid()>=10 && jugador[turno].getid()<20){
				if(data+jugador[turno].getid()<=20){
					jugador[turno].setid(data);
					mov[turno][1] = mov[turno][1] - data*65;
					io.sockets.emit("mov.fichas.vertical", data, mov[turno][1], jugador[turno].getpieza());
				}else{
					var custommov = 20-jugador[turno].getid();
					jugador[turno].setid(data);
					mov[turno][1] = mov[turno][1] - custommov*65;
					mov[turno][0] = mov[turno][0] + (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom1", data, mov[turno][1], mov[turno][0], jugador[turno].getpieza());
				}
			}else if(jugador[turno].getid()>=20 && jugador[turno].getid()<30){
				if(data+jugador[turno].getid()<=30){
					jugador[turno].setid(data);
					mov[turno][0] = mov[turno][0] + data*65;
					io.sockets.emit("mov.fichas.lateral", data, mov[turno][0], jugador[turno].getpieza());
				}else{
					var custommov = 30-jugador[turno].getid();
					jugador[turno].setid(data);
					mov[turno][0] = mov[turno][0] + custommov*65;
					mov[turno][1] = mov[turno][1] + (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom", data, mov[turno][0], mov[turno][1], jugador[turno].getpieza());
				}
			}else{
				if(data+jugador[turno].getid()<=39){
					jugador[turno].setid(data);
					mov[turno][1] = mov[turno][1] + data*65;
					io.sockets.emit("mov.fichas.vertical", data, mov[turno][1], jugador[turno].getpieza());
				}else{
					jugador[turno].salida(200);
					socket.emit("alquiler/impuestos", jugador[turno].getdinero());
					var custommov = 40-jugador[turno].getid();
					jugador[turno].setid(data);
					mov[turno][1] = mov[turno][1] + custommov*65;
					mov[turno][0] = mov[turno][0] - (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom1", data, mov[turno][1], mov[turno][0], jugador[turno].getpieza());
				}
			}
			url = "";
			Cas.find({num:jugador[turno].getid()}, function(err, casnumber){ 
				casnumber.map(function(elem, index){ 
					socket.emit("mostrar-casilla", elem.url);
				}); 
			});
			
			//Comprobacion suerte/caja
			sc = false; //sc = suerte y caja
			for(var x=0; x<suertecaja.length; x++){
				if(jugador[turno].getid() == suertecaja[x]){
					var num = Math.floor(Math.random()*15);
					if(suertecaja[x] == 2 || suertecaja[x] == 17 || suertecaja[x] == 33){
						caja.find({num:num}, function(err, alnumber){
							alnumber.map(function(elem, index){
								socket.emit("suerte", elem.Nombre);
							});
						});
					}else{
						suerte.find({num:num}, function(err, alnumber){
							alnumber.map(function(elem, index){
								socket.emit("suerte", elem.Nombre);
							});
						});
					}
					sc = true;
				}
			}

			//Comprobacion de salida, carcel, parking y impuestos
			cesp = false
			for(var x=0; x<casillasesp.length; x++){
				if(jugador[turno].getid() == casillasesp[x]){
					cesp = true;
					if(casillasesp[x] == 30){
						jugador[turno].carcel();
						mov[turno][1] = mov[turno][1] + 10*65;
						mov[turno][0] = mov[turno][0] - 10*65;
						io.sockets.emit("mov.fichas.custom1", data, mov[turno][1], mov[turno][0], jugador[turno].getpieza());
					}else if(casillasesp[x] == 4 || casillasesp[x] == 38){
						jugador[turno].impuestos();
						Cas.find({num:jugador[turno].getid()}, function(err, alnumber){
							alnumber.map(function(elem, index){
								jugador[turno].alquiler(elem.precio);
								impuestos = impuestos + elem.precio;
								socket.emit("alquiler/impuestos", jugador[turno].getdinero());
							});
						});
					}else if(casillasesp[x] == 20){
						jugador[turno].parking(impuestos);
						socket.emit("alquiler/impuestos", jugador[turno].getdinero());	
					}
				}
			}

			//Si sc == true o cesp==true no se le activaran las opciones de comprar y no comprar
			if(sc==false && cesp==false){
				var propiedadjug1 = jugador[0].comprobarpropiedad(jugador[turno].getid());
				var propiedadjug2 = jugador[1].comprobarpropiedad(jugador[turno].getid());

				if(propiedadjug1==true || propiedadjug2==true){
					if(propiedadjug1==true && jugador[turno].getNom() == jugador[0].getNom()){
						console.log("Propiedad del mismo jugador");
					}else if(propiedadjug2 == true && jugador[turno].getNom() == jugador[1].getNom()){
						console.log("Propiedad del mismo jugador");
					}else{
						precios.find({num:jugador[turno].getid()}, function(err, alnumber){
							alnumber.map(function(elem, index){
								jugador[turno].alquiler(elem.alquiler);
								socket.emit("alquiler/impuestos", jugador[turno].getdinero());
							});
						});
					}
				}else{
					socket.emit("comprar", jugador[turno].getid());
					io.sockets.emit("bloquear");
				}
			}

			//Cambia de turno
			turno++;
			if(turno == 2){
				turno = 0;
			}
			if(jugador[turno].getenpartida()==false || arrayips[turno] == null){
				turno++;
			}
		}
	});

	socket.on("buscar.casilla", function(id){
		Cas.find({num:id}, function(err, casnumber){ 
			casnumber.map(function(elem, index){ 
				socket.emit("mostrar-casilla-buscador", elem.url);
			}); 
		});
	})
	//Usuario desconectado
	socket.on("disconnect", function(){
		var address = socket.handshake;
		for(var x=0; x<arrayips.length; x++){
			if(address.address == arrayips[x]){
				arrayips[x] == null;
			}
		}
	});


	//Compra de casilla
	socket.on("compra", function(id){
		Cas.find({num:id}, function(err, casnumber){ 
			casnumber.map(function(elem, index){ 
				if(turno == 0){
					jugador[1].comprar(elem.precio, elem.num);
					socket.emit("compra.definitiva", jugador[1].getdinero());
					io.sockets.emit("desbloquear");
				}else{
					jugador[turno-1].comprar(elem.precio, elem.num);
					socket.emit("compra.definitiva", jugador[turno-1].getdinero());
					io.sockets.emit("desbloquear");
				}
			}); 
		});

	});


	//No comprar casilla
	socket.on("nocomprar", function(){
		io.sockets.emit("desbloquear");
	})
});


server.listen(8080, function(){
	console.log("Servidor corriendo en http://localhost:8080");
})