var mongoose = require("mongoose");
var Schema = mongoose.Schema; 


mongoose.connect("mongodb://localhost/database"); 

var casillas = {num:Number, Nombre:String, precio:Number, url:String};
var casillas_schema = new Schema(casillas);
var Cas = mongoose.model("Casillas", casillas_schema);
var nueva = new Cas({num:0, Nombre:"Salida", precio:200, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:1, Nombre:"Ronda de Valencia", precio:60, url:"/img/casillas/Ronda-de-Valencia.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:2, Nombre:"Caja de Comunidad", precio:0, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:3, Nombre:"Plaza Lavapiés", precio:60, url:"/img/casillas/Plaza-lavapies.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:4, Nombre:"Impuesto sobre capital", precio:200, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:5, Nombre:"Estación de Goya", precio:200, url:"/img/casillas/Estación-de-Goya.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:6, Nombre:"Glorieta Cuatro Caminos", precio:100, url:"/img/casillas/glorieta-cuatro-caminos.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:7, Nombre:"Suerte", precio:0, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:8, Nombre:"Avenida de Reina Victoria", precio:100, url:"/img/casillas/Avenida-de-reina-victoria.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:9, Nombre:"Calle Bravo Murillo", precio:120, url:"/img/casillas/Calle-Bravo-Murillo.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:10, Nombre:"Carcel", precio:0, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:11, Nombre:"Glorieta de Bilbao", precio:140, url:"/img/casillas/Glorieta-de-Bilbao.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:12, Nombre:"Compañia de electricidad", precio:140, url:"/img/casillas/electricidad.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:13, Nombre:"Calle Alberto Aguilera", precio:160, url:"/img/casillas/calle-alberto-aguilera.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:14, Nombre:"Calle Fuencarral", precio:160, url:"/img/casillas/calle-fuencarral.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:15, Nombre:"Estación de las Delicias", precio:200, url:"/img/casillas/estacion_de_delicias.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:16, Nombre:"AVDA Felipe II", precio:180, url:"/img/casillas/avenida-felipe-ii.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:17, Nombre:"Caja de Comunidad", precio:0, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:18, Nombre:"Calle Velázquez", precio:180, url:"/img/casillas/calle_velazquez.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:19, Nombre:"Calle Serrano", precio:200, url:"/img/casillas/calle_serrano.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:20, Nombre:"Parking", precio:0, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:21, Nombre:"Avenida de America", precio:220, url:"/img/casillas/avenida_de_amrica.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:22, Nombre:"Suerte", precio:0, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:23, Nombre:"Calle María de Molina", precio:220, url:"/img/casillas/cae_maria_de_molina.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:24, Nombre:"Calle de Cea Bermúdez", precio:240, url:"/img/casillas/calle-cea-bermudez.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:25, Nombre:"Estación del Mediodia", precio:200, url:"/img/casillas/estacion_de_mediodia.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:26, Nombre:"Avenida de los reyes catolicos", precio:260, url:"/img/casillas/avenida_los_reyes_catolicos.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:27, Nombre:"Calle Bailén", precio:260, url:"/img/casillas/cale_de_bailen.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:28, Nombre:"Compañia distribucion de aguas", precio:150, url:"/img/casillas/compañia_de_aguas.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:29, Nombre:"Plaza de España", precio:280, url:"/img/casillas/plaza_españa.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:30, Nombre:"Ve a la cárcel", precio:0, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:31, Nombre:"Puerta del Sol", precio:300, url:"/img/casillas/puerta_del_sol.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:32, Nombre:"Calle de Alcalá", precio:300, url:"/img/casillas/calle_alcala.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:33, Nombre:"Caja de Comunidad", precio:0, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:34, Nombre:"Gran via", precio:320, url:"/img/casillas/calle_gran_via.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:35, Nombre:"Estación del norte", precio:200, url:"/img/casillas/estacion_del_norte"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:36, Nombre:"Suerte", precio:0, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:37, Nombre:"Paseo de la Castellana", precio:350, url:"/img/casillas/paseo_de_la_castellana.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:38, Nombre:"Impuesto de lujo", precio:100, url:"/img/casillas/free-parking.jpg"});
nueva.save(function(err){ console.log(err); });
var nueva = new Cas({num:39, Nombre:"Paseo del Prado", precio:400, url:"/img/casillas/paseo_del_prado.png"});
nueva.save(function(err){ console.log(err); });
