var mongoose = require("mongoose");
var Schema = mongoose.Schema; 


mongoose.connect("mongodb://localhost/database"); 

var suerte = {num:Number, Nombre:String, precio:Number};
var suerte_schema = new Schema(suerte);
var S = mongoose.model("Suerte", suerte_schema);

var nueva = new S({num:0, Nombre:"El banco te paga 200", precio:200 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:1, Nombre:"Pagas al banco 200", precio:200 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:2, Nombre:"Paga 50 euros mas 30 por numero de dado sacado", precio:50 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:3, Nombre:"Ve a la estacion de las delicias", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:4, Nombre:"Vas a la carcel y paga 50 euros", precio:200 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:5, Nombre:"El banco te paga 30 por propiedad", precio:30 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:6, Nombre:"Vuelve a la salida sin cobrar", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:7, Nombre:"Retrocede 3 casillas", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:8, Nombre:"Ve al parking pagando 100 euros", precio:200 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:9, Nombre:"Paga 100 euros por casa y 500 euros por hotel", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:10, Nombre:"Gana el PP tienes que pagar 1000 euros", precio:1000 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:11, Nombre:"Avanza 3 casillas", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:12, Nombre:"Roba una carta de comunidad", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:13, Nombre:"Ve a la casilla 38 y paga por 5", precio:500 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:14, Nombre:"Tira el dado y paga el doble", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:15, Nombre:"Hola mon, no pasa nada", precio:0 });
nueva.save(function(err){ console.log(err); });