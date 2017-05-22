var mongoose = require("mongoose");
var Schema = mongoose.Schema; 


mongoose.connect("mongodb://localhost/database"); 

var caja = {num:Number, Nombre:String, precio:Number};
var caja_schema = new Schema(caja);
var S = mongoose.model("Caja", caja_schema);

var nueva = new S({num:0, Nombre:"Paga 200 euros al siguiente jugador", precio:200 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:1, Nombre:"Mueve a la casilla 39 si no tiene propietario el precio de compra sera el doble", precio:800 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:2, Nombre:"Bancarrota", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:3, Nombre:"Cae en la casilla 7", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:4, Nombre:"Robale 500 al jugador anterior", precio:500 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:5, Nombre:"Pierdes el siguiente turno", precio:30 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:6, Nombre:"Cobras los impuestos", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:7, Nombre:"Recibes la herencia de tus padres pero solo tienen deudas, pagas 300 euros (Tus padres reviven despues de pagar para gastar mas)", precio:300 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:8, Nombre:"Cobras 300 de la herencia de un familiar", precio:300 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:9, Nombre:"Te pagan 250 por el asesinato de un compañero", precio:250 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:10, Nombre:"Te pagan 30 cada jugador", precio:30 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:11, Nombre:"Te vas de putas, vas a la carcel pagando 200", precio:200 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:12, Nombre:"Te han robado, pierdes 100 euros", precio:100 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:13, Nombre:"Atajo a la salida, cobras el doble", precio:400 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:14, Nombre:"Un huracan ha pasado, tienes que pagar 30 por casa y 50 por hotel", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:15, Nombre:"Un terrorista hace Allahu Akbar con un avión en tu propiedad, cobras 300 por el seguro.", precio:300 });
nueva.save(function(err){ console.log(err); });