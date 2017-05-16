var mongoose = require("mongoose");
var Schema = mongoose.Schema; 


mongoose.connect("mongodb://localhost/database"); 

var casillas = {num:Number, Nombre:String, precio:Number};
var casillas_schema = new Schema(casillas);
var Cas = mongoose.model("Casillas", casillas_schema);
var nueva = new Cas({num:0, Nombre:"Salida", precio:200});
nueva.save(function(err){ console.log(err); });


