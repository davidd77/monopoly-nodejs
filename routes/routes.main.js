var express = require('express');
var router = express.Router();
var server = require('http').Server(express());
var io = require('socket.io')(server);

router.get("/", function(req, res){
	res.render("pages/index");
});
router.get("/chat", function(req, res){
	res.render("pages/chat");
});
router.get("/juego", function(req, res){
	res.render("pages/tablero");
})

module.exports = router;