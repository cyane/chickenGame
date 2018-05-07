//cookies
function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname) {
    let ca = document.cookie;
    return ca.substring(7, ca.length);
}

function checkCookie() {
    let maximo = getCookie("maximo");
    if (maximo != "" && maximo != null) {
        alert("welcome again, tu record es de: " + maximo);
    } else {
        setCookie("maximo", 0);
    }
}
checkCookie();

// creando el canvas
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);

var contadorGallinas = 0; //para añadir mas cuando llege a tal numero

//letiables iniciales
let vidaInicial = 100,
    velocidadPersonajeInicial = 3,
    velocidadGallina = 5,
    imagenPersonaje = new Image(),
    imagenGallina = new Image(),
    imagenEnemigo = new Image();

imagenPersonaje.src = "https://cdn.glitch.com/0c5fd143-6bda-4c72-915d-a4360fa2a11d%2FputoTOnto.png?1518914638385";
imagenGallina.src = "https://cdn.glitch.com/0c5fd143-6bda-4c72-915d-a4360fa2a11d%2Fgallina.png?1518914640653";
imagenEnemigo.src = "https://cdn.glitch.com/b8bf82e1-f137-4611-894c-984f60112d89%2Fmala.png?1521024502826";


//constructores
function Gallina(velocidad, posX, posY, aliada, imagen) {
    this.velocidad = velocidad;
    this.posX = posX;
    this.posY = posY;
    this.aliada = aliada;
    this.imagen = imagen;
}

function Personaje(velocidad, posX, posY, vida, contador) {
    this.velocidad = velocidad;
    this.posX = posX;
    this.posY = posY;
    this.contador = contador;
    this.vida = vida;
    this.imagen = imagenPersonaje;
}

//objetos
let personaje = new Personaje(velocidadPersonajeInicial, canvas.width - 100, canvas.height - 10, vidaInicial, 0),
    gallinas = [];
gallinas.push(new Gallina(velocidadGallina, Math.random() * (canvas.width - 35), Math.random() * (canvas.height - 35), true, imagenGallina));
gallinas.push(new Gallina(velocidadGallina, Math.random() * (canvas.width - 35), Math.random() * (canvas.height - 35), false, imagenEnemigo));


// control del personaje al puplsar y despulsar la tecla
let keysDown = {};
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);
// poner cood pj en juego
personaje.posX = canvas.width - 100;
personaje.posY = canvas.height - 10;

let resetear = function () {
    // poner random a la gallina por el mapa al morir
    for (let i = 0; i < gallinas.length; i++) {
        gallinas[i].posX = Math.random() * (canvas.width - 35);
        gallinas[i].posY = Math.random() * (canvas.height - 35);
    }
};

// movimiento
let actualizar = function () {
    canvas.style.width = window.innerWidth - 30 + "px";
    canvas.style.height = window.innerHeight - 30 + "px";
    if (38 in keysDown && (37 in keysDown || 39 in keysDown)) {
        personaje.posY -= personaje.velocidad;
    } else if (38 in keysDown) {
        personaje.posY -= personaje.velocidad;
    }
    if (40 in keysDown && (37 in keysDown || 39 in keysDown)) {
        personaje.posY += personaje.velocidad;
    } else if (40 in keysDown) {
        personaje.posY += personaje.velocidad;
    }
    if (37 in keysDown && (40 in keysDown || 38 in keysDown)) {
        personaje.posX -= personaje.velocidad;
    } else if (37 in keysDown) {
        personaje.posX -= personaje.velocidad;
    }
    if (39 in keysDown && (38 in keysDown || 40 in keysDown)) {
        personaje.posX += personaje.velocidad;
    } else if (39 in keysDown) {
        personaje.posX += personaje.velocidad;
    }
    for (let i = 0; i < gallinas.length; i++) {
        colision(personaje, gallinas[i]);

        //movimiento de las gallinas
        if (Math.floor(6 * Math.random()) == 5) {
            movimientoGallina(gallinas[i]);
        }
    }

};

function colision(personaje, gallina) {
    if (colisiona(gallina)) {
        if (gallina.aliada) {
            accionPillarAliada();
        } else {
            personaje.vida -= 20;
            muertePersonaje();
        }
        resetear();
    }
    controlSer(personaje);

}

function movimientoGallina(gallina) {
    switch (Math.floor(5 * Math.random())) {
        case 1:
            gallina.posX -= controlSer(gallina);
            break;
        case 2:
            gallina.posX += controlSer(gallina);
            break;
        case 3:
            gallina.posY -= controlSer(gallina);
            break;
        case 4:
            gallina.posY += controlSer(gallina);
            break;
        default:
            break;
    }
}
//controla la salida por un lado de la pantalla de cualquier ser
function controlSer(ser) {
    let x = ser.posX,
        y = ser.posY;
    if (x >= canvas.width) {
        ser.posX = Math.abs((ser.posX - canvas.width)) + 0;
    }
    if (x <= canvas.width - canvas.width) {
        ser.posX = Math.abs((ser.posX - canvas.width)) - 20;
    }
    if (y >= canvas.height) {
        ser.posY = Math.abs(ser.posY - canvas.height) + 0;
    }
    if (y <= canvas.height - canvas.height) {
        ser.posY = Math.abs(ser.posY - canvas.height) - 20;
    }
    return ser.velocidad;
}

//funcion para cuando el personaje muere
let muertePersonaje = function () {
    if (personaje.vida <= 0) {
        personaje.vida = 100;
        personaje.velocidad = 3;
        personaje.posX = canvas.width / 2;
        personaje.posY = canvas.height / 2;
        personaje.contador = 0;
        alert("has muerto");
        document.location.href = document.location.href;
    }
};

let colisiona = function (gallina) {
    return (personaje.posX <= (gallina.posX + 20) && gallina.posX <= (personaje.posX + 20) && personaje.posY <= (gallina.posY + 20) && gallina.posY <= (personaje.posY + 20));

};


let accionPillarAliada = function () {
    ++personaje.contador;
    if (personaje.contador > getCookie("maximo")) {
        setCookie("maximo", personaje.contador);
        console.log("nuevo maximo personal de " + personaje.contador);
        localStorage.setItem("maxG", personaje.contador);
    }
    contadorGallinas++;
    if (contadorGallinas % 5 === 0) {
        if (Math.round(Math.random())) {
            let gallinaAdd = new Gallina(velocidadGallina, Math.random() * (canvas.width - 35), Math.random() * (canvas.height - 35), true, imagenGallina);
            gallinas.push(gallinaAdd);
        } else {
            let gallinaAdd = new Gallina(velocidadGallina, Math.random() * (canvas.width - 35), Math.random() * (canvas.height - 35), false, imagenEnemigo);
            gallinas.push(gallinaAdd);
        }
    }
    personaje.velocidad = personaje.velocidad + 0.125;
    console.log("velocidad: " + personaje.velocidad);
    console.log(localStorage.getItem("maxG"));
    personaje.vida += 5;
    if (personaje.vida > 100) {
        personaje.vida = 100;
    }
}


// pintar las gallinas y el muñeco
let pintar = function () {
    context.drawImage(personaje.imagen, personaje.posX, personaje.posY);
    for (let i = 0; i < gallinas.length; i++) {
        context.drawImage(gallinas[i].imagen, gallinas[i].posX, gallinas[i].posY);
    }
    //context.drawImage(imagenEnemigo, 0,30 * 30, 30, 30, gallinaEnemiga.posX, gallinaEnemiga.posY,1,1);
    //marcador de puntuacion
    context.fillStyle = "rgba(8, 8, 141, 0.97)";
    context.textAlign = "left";
    context.font = "15px Comic Sans MS";
    context.textBaseline = "top";
    let speed = (personaje.velocidad.valueOf());
    context.fillText("Gallinas Atrapadas: " + personaje.contador + " | velocidad " + speed + " | personal: " + getCookie("maximo") + " vida:" + personaje.vida /*+ " global: " + localStorage.getItem("maxG")*/ , canvas.width - canvas.width + 1, 0);
};
var micanvas, context;
let tiempo = 0;
let stop;
let fondo = new Image();
fondo.src = 'https://cdn.glitch.com/e9545343-6e64-41a2-9975-7af28d904caa%2Fbeetlegrassedit.png?1518971333016';
window.addEventListener('load', init);

function init() {
    micanvas = document.getElementById('canvas');
    micanvas.width = 448;
    micanvas.height = 298;
    context = micanvas.getContext('2d');
    comenzar();
}

function comenzar() {
    clearTimeout(stop);
    stop = setTimeout(comenzar, 1);
    dibujar(context);
}

function detener() {
    clearTimeout(stop);
}

function dibujar(context) {
    context.clearRect(0, 0, micanvas.width, micanvas.height);
    context.drawImage(fondo, tiempo, 0);
    context.drawImage(fondo, tiempo - 448, 0);
    tiempo--;
    if (tiempo < 0) {
        tiempo = tiempo + 448;
    }
}

let principal = function () {
    actualizar(1 / 1000);
    pintar();
    //solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación          
    // https://developer.mozilla.org/es/docs/Web/API/Window/requestAnimationFrame
    requestAnimationFrame(principal);
};

resetear();
principal();
