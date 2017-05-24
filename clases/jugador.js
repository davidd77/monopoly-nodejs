'use strict'; 
module.exports =
class Jugador{
	constructor(nomjug, id, pieza, dinero, posx, posy){
		this.nombre = nomjug;
		this.id = id;
		this.pieza = pieza;
		this.dinero = dinero;
		this.posx = posx;
		this.posy = posy;
		this.casillas = [];
		this.ip = null;
		this.carcel = null;
		this.enjuego = true;
		this.estadocasilla = [];
	}

	getNom(){
		return this.nombre;
	}

	setid(num){
		if(this.id+num>39){
			var num1 = 39-this.id;
			num = num - num1;
			this.id = num-1; 
		}else{
			this.id = this.id + num;
		}
	}

	getid(){
		return this.id;
	}

	c(){
		this.id = 10;
	}

	getpieza(){
		return this.pieza;
	}

	getdinero(){
		return this.dinero;
	}

	comprar(num, id){
		this.dinero = this.dinero - num;
		this.casillas.push(id);
		this.estadocasilla.push(1);
	}

	getpropiedades(){
		return this.casillas;
	}

	comprobarpropiedad(id){
		for(var x=0; x<this.casillas.length; x++){
			if(this.casillas[x] == id){
				return true;
			}
		}
		return false;
	}

	hipotecar(id){
		for(var x=0; x<this.casillas.length; x++){
			if(this.casillas[x] == id && this.estadocasilla[x]==1){
				this.estadocasilla[x]=2;
				return true;
			}else{
				return false;
			}
		}
		return false;
	}
	cobrarhipoteca(num){
		this.dinero = this.dinero+num;
	}
	gethipoteca(id){
		for(var x=0; x<this.casillas.length; x++){
			if(this.casillas[x] == id){
				if(this.estadocasilla == 1){
					return true;
				}else{
					return false;
				}
			}
		}
		return false;
	}

	setip(ip){
		this.ip = ip;
	}

	getip(){
		return this.ip;
	}

	alquiler(num){
		this.dinero = this.dinero - num;
	}

	impuestos(num){
		this.dinero = this.dinero - num;
	}

	parking(num){
		this.dinero = this.dinero + num;
	}

	salida(num){
		this.dinero = this.dinero + num;
	}

	perder(){
		this.enjuego == false;
	}
	getenpartida(){
		return this.enjuego;
	}
};