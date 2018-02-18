
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
    imagenEnemigo.src = "https://cdn.glitch.com/0c5fd143-6bda-4c72-915d-a4360fa2a11d%2Fdd.png?1518731951508";
    //objeto
var vidaInicial=100;
var velocidadInicial=3;
var personaje = {
    velocidad: velocidadInicial,
    vida:vidaInicial
};
var gallina = {
    velocidad:10
};
var gallinaEnemiga={
};
  
var contador = 0;
  
// control del personaje al puplsar y despulsar la tecla
var keysDown = {};
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
// poner cood pj en juego
    personajex = canvas.width-100;
	personajey = canvas.height-10;
var resetear = function () {
	// poner random a la gallina por el mapa al morir
	gallinax = Math.random() * (canvas.width -35);
	gallinay = Math.random() * (canvas.height - 35);
  gallinaEnemigax = Math.random() * (canvas.width -35);
	gallinaEnemigay = Math.random() * (canvas.height - 35);
};

// movimiento
var actualizar = function () { 
    canvas.style.width = window.innerWidth-30 + "px";
    canvas.style.height = window.innerHeight-30 + "px";
	if (38 in keysDown) { 
		personajey -= personaje.velocidad ;
	}
	if (40 in keysDown) { 
		personajey += personaje.velocidad ;
	}
	if (37 in keysDown) { 
		personajex -= personaje.velocidad ;
	}
	if (39 in keysDown) { 
		personajex += personaje.velocidad ;
	}

  
  function movimientoGallina(){
  switch(Math.floor(5 * Math.random())) {
    case 1:
        gallinax-=controlGallina(gallinax,gallinay);
        gallinaEnemigay-=controlGallina(gallinaEnemigax,gallinaEnemigay);
        break;
    case 2:
        gallinax+=controlGallina(gallinax,gallinay);
        gallinaEnemigax+=controlGallina(gallinaEnemigax,gallinaEnemigay);
        break;
    case 3:
        gallinay-=controlGallina(gallinax,gallinay);  
        gallinaEnemigay+=controlGallina(gallinaEnemigax,gallinaEnemigay);
        break;
    case 4:
        gallinay+=controlGallina(gallinax,gallinay);
        gallinaEnemigax-=controlGallina(gallinaEnemigax,gallinaEnemigay);
        break;
    default:
        break;
}
  }

   function controlGallina(x,y){
     if(x >= canvas.width 
      ||x <= canvas.width-canvas.width 
      || y >= canvas.height 
      || y <= canvas.height-canvas.height){
       resetear()
        return 0;
     }else{
       return gallina.velocidad;
     }
  }
  
	//colision
	if (
		personajex <= (gallinax + 20)
		&& gallinax <= (personajex + 20)
		&& personajey <= (gallinay + 20)
		&& gallinay <= (personajey + 20)
	) {
		++contador;
    if(contador>getCookie("maximo")){
      setCookie("maximo", contador);
      console.log("nuevo maximo personal de "+contador);
      localStorage.setItem("maxG", contador);
    }
    personaje.velocidad=personaje.velocidad+ 0.125;
    console.log("velocidad: "+personaje.velocidad);
    console.log(localStorage.getItem("maxG"));
    personaje.vida+=5;
    if(personaje.vida>100){
       personaje.vida=100;
       }
		resetear();
	}else if(personajex >= canvas.width+20 
           ||personajex <= canvas.width-canvas.width-50 
           || personajey >= canvas.height+20 
           || personajey <= canvas.height-canvas.height-40){
      personaje.vida--;
    if(personaje.vida<0){
      personaje.vida=100;
      personaje.velocidad=3;
      personajex = canvas.width / 2;
	    personajey = canvas.height / 2;
      contador=0;
    }
  }else if(
		personajex <= (gallinaEnemigax + 20)
		&& gallinaEnemigax <= (personajex + 20)
		&& personajey <= (gallinaEnemigay + 20)
		&& gallinaEnemigay <= (personajey + 20)
	) {
    personaje.vida-=20;
    resetear();
        if(personaje.vida<0){
      personaje.vida=100;
      personaje.velocidad=3;
      personajex = canvas.width / 2;
	    personajey = canvas.height / 2;
      contador=0;
    }
  }
    if(Math.floor(10 * Math.random())==5){
     movimientoGallina();
    }
};

// pintar las gallinas
var pintar = function () {
	context.drawImage(imagenPersonaje, personajex, personajey);
	context.drawImage(imagenGallina, gallinax, gallinay);
  context.drawImage(imagenEnemigo, gallinaEnemigax, gallinaEnemigay);

    
	// pmarcador de puntuacion
	context.fillStyle = "rgba(8, 8, 141, 0.97)";
	context.textAlign = "left";
  context.font = "15px Comic Sans MS";
	context.textBaseline = "top";
  let speed= (personaje.velocidad.valueOf());
	context.fillText("Gallinas Atrapadas: " + contador + " | velocidad " + speed+" | personal: " + getCookie("maximo") +" vida:"+personaje.vida /*+ " global: " + localStorage.getItem("maxG")*/,canvas.width-canvas.width+1, 0);
 };   
    var micanvas, context;
    var tiempo = 0;
    var stop;
    var fondo = new Image();
    fondo.src ='https://cdn.glitch.com/0c5fd143-6bda-4c72-915d-a4360fa2a11d%2Ffondo.png?1518731951745';
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