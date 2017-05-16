window.onload=function(){

	var tablero = Snap("#tablero")


	tab = tablero.rect(0,0,200,400);


	tab.node.onclick = function(){
		tabla("red");
	}

}

