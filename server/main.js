var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Msg = require('../models/schema').msg;
var ruta = require('../routes/routes.main');
// inside middleware handler 
idcasilla = [0,0,0,0];
nomjug = [".piezajug1",".piezajug2",".piezajug3",".piezajug4"];
mov = new Array(4);
mov[0] = [700,700];
mov[1] = [700,700];
mov[2] = [700,700];
mov[3] = [700,700];

var turno = 0;
var arrayips = [];

app.set("view engine", "ejs");


//Llamada a la base de datos
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
		arrayips.push(address.address);
		console.log("Usuario conectado");
	}else{
		console.log("Limite superado");
	}

	//Chat
	console.log('Alguien se ha conectado con Sockets');
	console.log(arrayips);
	socket.on('new.message', function(data){
		socket.emit("messages", messages);
			messages.push(data);
			var mensaje = new Msg({autor:socket.id, texto:data.text}); 
			mensaje.save(function(err){ console.log(err); });
			io.sockets.emit("messages", messages);
	});


	//Movimiento fichas
	socket.on('mov.fichas', function(data){
		var address = socket.handshake;
		if(arrayips[turno] == address.address){

			//Movimiento
			if(idcasilla[turno]<10){
				if(data+idcasilla[turno]<=10){
					idcasilla[turno] = idcasilla[turno] + data;
					mov[turno][0] = mov[turno][0] - data*65;
					io.sockets.emit("mov.fichas.lateral", data, mov[turno][0], nomjug[turno]);
				}else{
					var custommov = 10-idcasilla[turno];
					idcasilla[turno] = idcasilla[turno] + data;
					mov[turno][0] = mov[turno][0] - custommov*65;
					mov[turno][1] = mov[turno][1] - (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom", data, mov[turno][0], mov[turno][1], nomjug[turno]);
				}
			}else if(idcasilla[turno]>=10 && idcasilla[turno]<20){
				if(data+idcasilla[turno]<=20){
					idcasilla[turno] = idcasilla[turno] + data;
					mov[turno][1] = mov[turno][1] - data*65;
					io.sockets.emit("mov.fichas.vertical", data, mov[turno][1], nomjug[turno]);
				}else{
					var custommov = 20-idcasilla[turno];
					idcasilla[turno] = idcasilla[turno] + data;
					mov[turno][1] = mov[turno][1] - custommov*65;
					mov[turno][0] = mov[turno][0] + (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom1", data, mov[turno][1], mov[turno][0], nomjug[turno]);
				}
			}else if(idcasilla[turno]>=20 && idcasilla[turno]<30){
				if(data+idcasilla[turno]<=30){
					idcasilla[turno] = idcasilla[turno] + data;
					mov[turno][0] = mov[turno][0] + data*65;
					io.sockets.emit("mov.fichas.lateral", data, mov[turno][0], nomjug[turno]);
				}else{
					var custommov = 30-idcasilla[turno];
					idcasilla[turno] = idcasilla[turno] + data;
					mov[turno][0] = mov[turno][0] + custommov*65;
					mov[turno][1] = mov[turno][1] + (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom", data, mov[turno][0], mov[turno][1], nomjug[turno]);
				}
			}else{
				if(data+idcasilla[turno]<=39){
					idcasilla[turno] = idcasilla[turno] + data;
					mov[turno][1] = mov[turno][1] + data*65;
					io.sockets.emit("mov.fichas.vertical", data, mov[turno][1], nomjug[turno]);
				}else{
					var custommov = 40-idcasilla[turno];
					idcasilla[turno] = (data-custommov);
					mov[turno][1] = mov[turno][1] + custommov*65;
					mov[turno][0] = mov[turno][0] - (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom1", data, mov[turno][1], mov[turno][0], nomjug[turno]);
				}
			}


			//Cambia de turno
			turno++;
			if(turno == 2){
				turno = 0;
			}
		}
	});
});


server.listen(8080, function(){
	console.log("Servidor corriendo en http://localhost:8080");
})


/*var userSchemaJSON = { nombre:String, direccion:Object }; 
var user_schema = new Schema(userSchemaJSON); 
var User = mongoose.model("ficha",user_schema); 
var objeto = {tel: "561651651", calle: "fghadbskjfh"}; 
var user1 = new User({nombre:"JOAN",direccion:objeto}); 
user1.save(function(err){ console.log(err); }); 
User.find({nombre:"JOAN"},function(err,user){ console.log(user); });*/

/*app.get('/', function(req, res){
	res.status(200).send("Hello World");
});*/
/*var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
*/
// Connection url
/*var url = 'mongodb://localhost:27017/sockets';*/

// Use connect method to connect to the server
/*MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
})*/

/*io.on('connection', function(socket) {
	console.log('Alguien se ha conectado con Sockets');
	socket.emit("messages", messages);

	socket.on('new.message', function(data){
		messages.push(data);
		//externaljs.prueba();
		var mensaje = new Msg({autor:data.author, texto:data.text}); 
		mensaje.save(function(err){ console.log(err); });
		io.sockets.emit("messages", messages);
	});
});*/
