//Aramburu Lucas
//Comisión 3 Trabajo Practico N°1
//08/26
//Primero estuve trabajando en p5js web, por lo que al pasar el codigo a processing, tuve que cambiar algunas cosas.

let framesIdle = [];
let framesCaminar = [];
let framesBlood = [];
let totalFramesIdle = 7;
let totalFramesCaminar = 9;
let totalFramesBlood = 8;

let estado = "idle";

let frameActual = 0;

let contador = 0;
let velocidad = 8;

let posX = 50;
let posY = 290;
let velocidadDesplazamiento = 3;

let limitedeX = 639;

let inicioTransicion = 0;
let duracionTransicion = 180;

async function setup() {
  createCanvas(800, 600);
  fondo = await loadImage("fondo.png");
  framesIdle = await cargarFrames("idle", totalFramesIdle);
  framesCaminar = await cargarFrames("caminar", totalFramesCaminar);
  framesBlood = await cargarFrames("blood", totalFramesBlood);
}

function draw() {
  if (estado === "final") {
    dibujarPantallaFinal();
    return;
  }
  image(fondo, 0, 0, 800, 600);

  if (estado === "idle") {
    actualizarAnimacion(framesIdle, velocidad + 4);
    dibujarPersonaje(framesIdle, posX, posY);
  } else if (estado === "caminar") {
    actualizarAnimacion(framesCaminar, velocidad);
    moverPersonaje();
    dibujarPersonaje(framesCaminar, posX, posY);
  } else if (estado === "transicion") {
    actualizarAnimacion(framesBlood, velocidad);
    dibujarPersonaje(framesBlood, limitedeX - 50, 260);
    verificarFinTransicion();
  }
  fill(255);
  noStroke();
  text("AVANZAR: Flechita Derecha", 20, 20);
  text("REINICIAR: R", 20, 40);
  /*
  //Esto lo hice para poder ver que se activaran correctamente los estados y se reiniciaba todo correctamente tambien al presionar R
  fill("#39FF14");
  text("Estado: " + estado + " | Frame: " + frameActual, 300, 20);
  */
}
async function cargarFrames(nombre, cantidadframes) {
  let nombresArchivos = [];
  for (let i = 0; i < cantidadframes; i++) {
    nombresArchivos.push(nombre + "/" + nombre + nf(i, 4) + ".png");
  }
  let frames = await Promise.all(
    nombresArchivos.map((ruta) => loadImage(ruta))
  );
  return frames;
}
function actualizarAnimacion(frames, velocidad) {
  contador++;
  if (contador >= velocidad) {
    contador = 0;
    frameActual++;
    if (frameActual >= frames.length) {
      frameActual = 0;
    }
  }
}

function moverPersonaje() {
  posX += velocidadDesplazamiento;
  if (posX >= limitedeX - 70) {
    posX = limitedeX - 70;
    cambiarEstado("transicion");
    inicioTransicion = frameCount;
  }
}

function verificarFinTransicion() {
  if (frameCount - inicioTransicion >= duracionTransicion) {
    cambiarEstado("final");
  }
}
function dibujarPantallaFinal() {
  background("#6C001B"); // rojo
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("¿Reiniciar? Presiona R", width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  textSize(12);
}
function dibujarPersonaje(frames, x, y) {
  image(frames[frameActual], x, y);
}
function reiniciarAnimacion() {
  frameActual = 0;
  contador = 0;
}
function cambiarEstado(nuevoEstado) {
  // console.log("Intentando cambiar de", estado, "a", nuevoEstado);
  if (estado !== nuevoEstado) {
    estado = nuevoEstado;
    reiniciarAnimacion();
    //   console.log("Estado ahora es:", estado);
  }
}
function reiniciarTodo() {
  cambiarEstado("idle");
  posX = 50;
  posY = 290;
}
function keyPressed() {
  //console.log("Tecla:", key, "Code:", keyCode);
  if (keyCode === 39) {
    //cambie RIGHT ARROW por 39 porque me daba error.
    if (estado === "idle") {
      cambiarEstado("caminar");
    }
  } else if (key === "r" || key === "R") {
    reiniciarTodo();
  }
}
function keyReleased() {
  if (keyCode === 39 && estado === "caminar") {
    cambiarEstado("idle");
  }
}
