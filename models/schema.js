var mongoose = require("mongoose");
var Schema = mongoose.Schema; 


mongoose.connect("mongodb://localhost/database"); 


var msgSchema = {autor:String, texto:String}; 
var msg_schema = new Schema(msgSchema); 
var Msg = mongoose.model("Msg", msg_schema);

module.exports.msg = Msg;


var casillas = {num:Number, Nombre:String, precio:Number, url:String};
var casillas_schema = new Schema(casillas);
var Cas = mongoose.model("Casillas", casillas_schema);

module.exports.cas = Cas;

var precios = {num:Number, alquiler:Number, hipoteca:Number, preciocasa:Number, preciohotel:Number, casa1:Number, casa2:Number, casa3:Number, casa4:Number, hotel:Number};
var precios_schema = new Schema(precios);
var Pre = mongoose.model("Precios", precios_schema);

module.exports.precio = Pre;