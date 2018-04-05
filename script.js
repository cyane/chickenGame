
  //cookies
function setCookie(cname,cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname) {
    var ca = document.cookie;
    return ca.substring(7,ca.length);
}

function checkCookie() {
    var maximo = getCookie("maximo");
    if (maximo != "" && maximo != null) {
        alert("welcome again, tu record es de: "+maximo);
    } else {
        setCookie("maximo", 0);
    }
}
  checkCookie();
  
// creando el canvas
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
    document.body.appendChild(canvas);

var imagenPersonaje = new Image();
    imagenPersonaje.src = "https://cdn.glitch.com/0c5fd143-6bda-4c72-915d-a4360fa2a11d%2FputoTOnto.png?1518914638385";
var imagenGallina = new Image();
    imagenGallina.src = "https://cdn.glitch.com/0c5fd143-6bda-4c72-915d-a4360fa2a11d%2Fgallina.png?1518914640653";
var imagenEnemigo = new Image();
    imagenEnemigo.src = "https://cdn.glitch.com/b8bf82e1-f137-4611-894c-984f60112d89%2Fmala.png?1521024502826";
var imagenGallina2 = new Image();
    imagenGallina2.src = "https://cdn.glitch.com/b8bf82e1-f137-4611-894c-984f60112d89%2Fmala2.png?1521028116785";

//variables iniciales
var vidaInicial=100;
var velocidadPersonajeInicial=3;
var velocidadGallina=5;

//constructores
function Gallina(velocidad,posX,posY){
  this.velocidad=velocidad;
  this.posX=posX;
  this.posY=posY;
}
function Personaje(velocidad,posX,posY,vida,contador){
  this.velocidad=velocidad;
  this.posX=posX;
  this.posY=posY;
  this.contador=contador;
  this.vida=vida;
}

//objetos
var personaje = new Personaje(velocidadPersonajeInicial,canvas.width-100,canvas.height-10,vidaInicial,0);
var gallina = new Gallina(velocidadGallina,Math.random() * (canvas.width -35), Math.random() * (canvas.height - 35));
var gallinaEnemiga = new Gallina(velocidadGallina,Math.random() * (canvas.width -35), Math.random() * (canvas.height - 35));

// control del personaje al puplsar y despulsar la tecla
var keysDown = {};
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
// poner cood pj en juego
  personaje.posX = canvas.width-100;
	personaje.posY = canvas.height-10;
var resetear = function () {
	// poner random a la gallina por el mapa al morir
	gallina.posX = Math.random() * (canvas.width -35);
	gallina.posY = Math.random() * (canvas.height - 35);
  gallinaEnemiga.posX = Math.random() * (canvas.width -35);
	gallinaEnemiga.posY = Math.random() * (canvas.height - 35);
};

// movimiento
var actualizar = function () { 
    canvas.style.width = window.innerWidth-30 + "px";
    canvas.style.height = window.innerHeight-30 + "px";
	if (38 in keysDown &&(37 in keysDown|| 39 in keysDown)) { 
		personaje.posY -= personaje.velocidad/1.5 ;
	}else if(38 in keysDown){
      personaje.posY -= personaje.velocidad ;     
  }
	if (40 in keysDown &&(37 in keysDown|| 39 in keysDown)) { 
		personaje.posY += personaje.velocidad/1.5 ;
	}else if(40 in keysDown ){
      personaje.posY += personaje.velocidad ;  
  }
  if(37 in keysDown && (40 in keysDown|| 38 in keysDown)){
    personaje.posX  -= personaje.velocidad/1.5 ;
  }	else if (37 in keysDown) { 
		personaje.posX  -= personaje.velocidad ;
	}
	if(39 in keysDown && (38 in keysDown|| 40 in keysDown)){
    personaje.posX  += personaje.velocidad/1.5 ;
  }else if(39 in keysDown) { 
		personaje.posX  += personaje.velocidad ;
	}

	//colision
	if ( 
    personaje.posX  <= (gallina.posX + 20)
		&& gallina.posX <= (personaje.posX  + 20)
		&& personaje.posY <= (gallina.posY + 20)
		&& gallina.posY <= (personaje.posY + 20)
	) {
		++personaje.contador;
    if(personaje.contador>getCookie("maximo")){
      setCookie("maximo", personaje.contador);
      console.log("nuevo maximo personal de "+personaje.contador);
      localStorage.setItem("maxG", personaje.contador);
    }
    personaje.velocidad=personaje.velocidad+ 0.125;
    console.log("velocidad: "+personaje.velocidad);
    console.log(localStorage.getItem("maxG"));
    personaje.vida+=5;
    if(personaje.vida>100){
       personaje.vida=100;
       }
		resetear();
	}else if(personaje.posX  >= canvas.width+20 
           ||personaje.posX  <= canvas.width-canvas.width-50 
           || personaje.posY >= canvas.height+20 
           || personaje.posY <= canvas.height-canvas.height-40){
    personaje.vida--;
    muertePersonaje();
  }else if(
		personaje.posX  <= (gallinaEnemiga.posX + 20)
		&& gallinaEnemiga.posX <= (personaje.posX  + 20)
		&& personaje.posY <= (gallinaEnemiga.posY + 20)
		&& gallinaEnemiga.posY <= (personaje.posY + 20)
	) {
    personaje.vida-=20;
    resetear();
    muertePersonaje();
  }
    if(Math.floor(6 * Math.random())==5){
     movimientoGallina(gallina);
     movimientoGallina(gallinaEnemiga);
    }
};

  function movimientoGallina(objetoGallina){
  switch(Math.floor(5 * Math.random())) {
    case 1:
        //if(objetoGallina.posX<personaje.posX +30){
          objetoGallina.posX-=controlGallina(objetoGallina);
        //}
        break;
    case 2:
        //if(objetoGallina.posX>personaje.posX +30){
        objetoGallina.posX+=controlGallina(objetoGallina);
       // }
        break;
    case 3:
        //if(objetoGallina.posY<personaje.posY+30){
        objetoGallina.posY-=controlGallina(objetoGallina);  
        //}
        break;
    case 4:
        //if(objetoGallina.posY>personaje.posY+30){
        objetoGallina.posY+=controlGallina(objetoGallina);
        //}
        break;
    default:
        break;
}
  }
     function controlGallina(objetoGallina){//TODO colision lado pantalla
       let x = objetoGallina.posX;
       let y = objetoGallina.posY;
     if( x >= canvas.width || x <= canvas.width-canvas.width){
       console.log("x aliada",objetoGallina.posX);
       objetoGallina.posX=Math.abs((objetoGallina.posX-canvas.width))+10;
       console.log("x aliada",objetoGallina.posX);
        }
     if( y >= canvas.height || y <= canvas.height-canvas.height){
       console.log("y aliada",objetoGallina.posX,objetoGallina.posY);
       objetoGallina.posY=Math.abs(gallina.posY-canvas.height)+10;
       console.log("y aliada",objetoGallina.posX,objetoGallina.posY);
     }
       return objetoGallina.velocidad;
  }

/*
   function controlGallina(x,y){//TODO colision lado pantalla
     if( x >= canvas.width 
      || x <= canvas.width-canvas.width 
      || y >= canvas.height 
      || y <= canvas.height-canvas.height){
       //resetear()
       console.log(gallina.posX,gallina.posY);
       gallina.posX=Math.abs(gallina.posX-canvas.width)+10;
       gallina.posY=Math.abs(gallina.posY-canvas.height)+10;
       console.log(gallina.posX,gallina.posY);
        return 0;
     }else{
       return gallina.velocidad;
     }
  }
  */

  

//funcion para cuando el personaje muere
  var muertePersonaje = function() {
        if(personaje.vida<=0){
      personaje.vida=100;
      personaje.velocidad=3;
      personaje.posX = canvas.width / 2;
	    personaje.posY = canvas.height / 2;
      personaje.contador=0;
      alert("has muerto");
      document.location.href = document.location.href;
    }
  }


// pintar las gallinas
var pintar = function () {
	context.drawImage(imagenPersonaje, personaje.posX , personaje.posY);
	context.drawImage(imagenGallina, gallina.posX, gallina.posY);
  context.drawImage(imagenEnemigo, gallinaEnemiga.posX, gallinaEnemiga.posY);
  context.drawImage(imagenGallina2, gallinaEnemiga.posX, gallinaEnemiga.posY);
  //context.drawImage(imagenEnemigo, 0,30 * 30, 30, 30, gallinaEnemiga.posX, gallinaEnemiga.posY,1,1);
	//marcador de puntuacion
	context.fillStyle = "rgba(8, 8, 141, 0.97)";
	context.textAlign = "left";
  context.font = "15px Comic Sans MS";
	context.textBaseline = "top";
  let speed= (personaje.velocidad.valueOf());
	context.fillText("Gallinas Atrapadas: " + personaje.contador + " | velocidad " + speed+" | personal: " + getCookie("maximo") +" vida:"+personaje.vida /*+ " global: " + localStorage.getItem("maxG")*/,canvas.width-canvas.width+1, 0);
 };   
    var micanvas, context;
    var tiempo = 0;
    var stop;
    var fondo = new Image();
    fondo.src ='https://cdn.glitch.com/e9545343-6e64-41a2-9975-7af28d904caa%2Fbeetlegrassedit.png?1518971333016';
    window.addEventListener('load',init);
function init(){
	micanvas = document.getElementById('canvas');
	micanvas.width = 448;
	micanvas.height = 298;
	context = micanvas.getContext('2d');
	comenzar();
}
function comenzar(){
	clearTimeout(stop);
	stop = setTimeout(comenzar,1); 
	dibujar(context);
}
function detener(){
	clearTimeout(stop);
	}
function dibujar(context){
	context.clearRect(0,0,micanvas.width,micanvas.height);
	context.drawImage(fondo,tiempo,0);		
  context.drawImage(fondo,tiempo-448,0);	 
	tiempo--;
    if(tiempo<0){
		tiempo = tiempo + 448;	
    }
}
    
var principal = function () {
	actualizar(1 / 1000);
	pintar();
    //solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación          
    // https://developer.mozilla.org/es/docs/Web/API/Window/requestAnimationFrame
	requestAnimationFrame(principal);
};

resetear();
principal();        