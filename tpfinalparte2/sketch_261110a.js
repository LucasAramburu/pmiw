// Trabajo Practico Final parte #2, Acevedo Maximo - Aramburu Lucas
// Com 3
// Minijuego de boxeo con Programacion orientada a objetos

const IMAGEN_PORTADA = "assets/Fondos/AparezcoEnLaPortada.png";
const IMAGEN_CREDITOS = "assets/Fondos/Hipodromo.png";

const ARCHIVO_MUSICA = "assets/Musica/UmaMusumeSong.mp3";
const VOLUMEN_MUSICA = 0.5;

const IMAGEN_GIMNASIO = "assets/Fondos/Gimnasio.png";
const IMAGENES_SACO = [
  "assets/Fondos/SacoBox0.png",
  "assets/Fondos/SacoBox1.png",
  "assets/Fondos/SacoBox2.png"
];
const IMAGENES_BOXEO = [
  "assets/Fondos/Boxing1.png",
  "assets/Fondos/Boxing2.png",
  "assets/Fondos/Boxing3.png",
  "assets/Fondos/Boxing4.png"
];
const IMAGEN_PUNCH = "assets/Fondos/Punch.png";

const GOLPES_PARA_TERMINAR = 100;
const TIEMPO_BOXEO = 20;
const DURACION_PUNCH = 250;
const DURACION_GOLPE = 150;

const datosPantallas = {
  decisionEntrenamiento:
{
texto:
  "Aunque le dieron varias recomendaciones, Turbo todavia no sabe por donde empezar a prepararse...",
  imagen:
  "assets/Fondos/desicion.png",
  opciones:
  [
  {
  texto:
  "Descansar", siguiente:
    "CREDITOS"
  }
  ,
  {
  texto:
  "Entrenar fuerza y estamina", siguiente:
    "instruccionesBoxeo"
  }
  ,
  {
  texto:
  "Entrenar velocidad y estrategias", siguiente:
    "CREDITOS"
  }
  ]
}
,
  instruccionesBoxeo:
{
texto:
  "INSTRUCCIONES: Debes golpear 100 veces el saco en menos de 20 segundos, para ello alterna entre las letras A y D, si no llegás reinicia el intento con R.",
  imagen:
  IMAGEN_GIMNASIO,
  opciones:
  [
  {
  texto:
  "¡A entrenar!", siguiente:
    "MINIJUEGO_BOXEO"
  }
  ]
}
,
  finalVictoria:
{
texto:
  "¡Turbo logró superar el entrenamiento!\nAunque aún le falta mucho entrenamiento por delante, ahora está más cerca de estar lista para la carrera que se avecina!",
  imagen:
  IMAGEN_GIMNASIO,
  opciones:
  [
  {
  texto:
  "Continuar", siguiente:
    "CREDITOS"
  }
  ]
}
,
  finalDerrota:
{
texto:
  "Turbo no llegó a completar el entrenamiento... la carrera será mucho más dura de lo esperado.",
  imagen:
  IMAGEN_GIMNASIO,
  opciones:
  [
  {
  texto:
  "Continuar", siguiente:
    "CREDITOS"
  }
  ]
}
};

const lineasCreditos = [
  "TWIN TURBO RUN RUN! (Entrenamiento)",
  "Trabajo Práctico Final - Parte 2",
  "",
  "Alumnos: Acevedo Maximo, Aramburu Lucas",
  "Legajo: Acevedo: 125500/6 Aramburu: 87819/0",
  "Comisión: 3",
  "",
  "Obra original: Uma Musume Pretty Derby (Cygames)",
  "Imágenes generadas con IA",
  "",
  "Gracias por jugar!!"
];

const ARCHIVOS_IMAGEN = [
  IMAGEN_PORTADA,
  IMAGEN_CREDITOS,
  IMAGEN_GIMNASIO,
  IMAGEN_PUNCH,
  ...IMAGENES_SACO,
  ...IMAGENES_BOXEO,
  ...Object.values(datosPantallas).map(p => p.imagen)
];

class Recursos {
  static imagenes = {};
  static musica = null;
  static audioActivado = false;

  static precargar() {
    ARCHIVOS_IMAGEN.forEach(archivo => Recursos.cargarImagen(archivo));
    Recursos.musica = loadSound(
      ARCHIVO_MUSICA,
      () => {
    }
    ,
      () => {
      Recursos.musica = null;
    }
    );
  }

  static cargarImagen(archivo) {
    if (archivo && !(archivo in Recursos.imagenes)) {
      Recursos.imagenes[archivo] = loadImage(
        archivo,
        () => {
      }
      ,
        () => {
        Recursos.imagenes[archivo] = null;
      }
      );
    }
  }

  static configurarMusica() {
    if (Recursos.musica) {
      Recursos.musica.setVolume(VOLUMEN_MUSICA);
    }
  }

  static activarMusica() {
    if (Recursos.audioActivado) {
      return;
    }
    Recursos.audioActivado = true;
    userStartAudio();
    if (Recursos.musica && !Recursos.musica.isPlaying()) {
      Recursos.musica.loop();
    }
  }

  static imagen(archivo) {
    return Recursos.imagenes[archivo];
  }

  static dibujarFondo(archivo) {
    let img = Recursos.imagen(archivo);
    if (img) {
      image(img, 0, 0, width, height);
    } else {
      background(30, 30, 50);
      noStroke();
      fill(130, 130, 170);
      textAlign(CENTER, CENTER);
      textSize(28);
      text("ACÁ VA LA IMAGEN\n(" + archivo + ")", width / 2, height / 2);
    }
  }

  static dibujarImagenCentrada(archivo, cx, cy, altoMax) {
    let img = Recursos.imagen(archivo);
    if (img) {
      let escala = altoMax / img.height;
      imageMode(CENTER);
      image(img, cx, cy, img.width * escala, img.height * escala);
      imageMode(CORNER);
    } else {
      noStroke();
      fill(130, 130, 170);
      textAlign(CENTER, CENTER);
      textSize(14);
      text("ACÁ VA LA IMAGEN\n(" + archivo + ")", cx, cy);
    }
  }
}

class Interfaz {
  static vidrio(x, y, ancho, alto) {
    fill(0, 0, 0, 120);
    stroke(255, 255, 255, 70);
    strokeWeight(1);
    rect(x, y, ancho, alto, 12);
  }

  static escribirResaltado(contenido, x, y, ancho, alto, tamano) {
    stroke(0);
    strokeWeight(4);
    strokeJoin(ROUND);
    fill(255);
    textStyle(BOLD);
    textSize(tamano);
    text(contenido, x, y, ancho, alto);
    textStyle(NORMAL);
    strokeWeight(1);
  }

  static barra(textoNarrativo, conAviso) {
    Interfaz.vidrio(20, 275, width - 40, 105);
    textAlign(LEFT, TOP);
    Interfaz.escribirResaltado(textoNarrativo, 35, 283, width - 70, 72, 18);

    if (conAviso) {
      noStroke();
      fill(255, 200, 60);
      textAlign(RIGHT, TOP);
      textSize(13);
      text("Clic para continuar", width - 35, 358);
    }
  }

  static titulo(textoTitulo) {
    Interfaz.vidrio(20, 10, width - 40, 44);
    textAlign(CENTER, CENTER);
    Interfaz.escribirResaltado(textoTitulo, 35, 10, width - 70, 44, 18);
  }
}

class Boton {
  constructor(x, y, ancho, alto, texto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.texto = texto;
  }

  clicSobre() {
    return mouseX >= this.x && mouseX <= this.x + this.ancho &&
      mouseY >= this.y && mouseY <= this.y + this.alto;
  }

  dibujar() {
    let encima = this.clicSobre();
    if (encima) {
      stroke(255);
      fill(255, 200, 60);
    } else {
      stroke(255);
      fill(40, 40, 60, 220);
    }
    strokeWeight(1);
    rect(this.x, this.y, this.ancho, this.alto, 10);

    noStroke();
    fill(encima ? 0 : 255);
    textAlign(CENTER, CENTER);
    textSize(15);
    text(this.texto, this.x + 8, this.y, this.ancho - 16, this.alto);
  }
}

class Pantalla {
  constructor(datos) {
    this.texto = datos.texto;
    this.imagen = datos.imagen;
    this.mostrarOpciones = false;

    let posiciones = this.acomodar(datos.opciones.length);
    this.opciones = datos.opciones.map((opcion, i) => {
      let p = posiciones[i];
      return {
      boton:
        new Boton(p.x, p.y, p.ancho, p.alto, opcion.texto),
        siguiente:
        opcion.siguiente
      };
    }
    );
  }

  acomodar(cantidad) {
    if (cantidad === 1) {
      return [ {
      x:
      630, y:
      225, ancho:
      150, alto:
        42
      }
      ];
    }
    if (cantidad === 2) {
      return [
      {
      x:
      40, y:
      320, ancho:
      340, alto:
        55
      }
      ,
      {
      x:
      420, y:
      320, ancho:
      340, alto:
        55
      }
      ];
    }
    return [
    {
    x:
    40, y:
    320, ancho:
    230, alto:
      55
    }
    ,
    {
    x:
    285, y:
    320, ancho:
    230, alto:
      55
    }
    ,
    {
    x:
    530, y:
    320, ancho:
    230, alto:
      55
    }
    ];
  }

  reiniciar() {
    this.mostrarOpciones = false;
  }

  hayDecision() {
    return this.opciones.length > 1;
  }

  dibujar() {
    Recursos.dibujarFondo(this.imagen);

    if (this.hayDecision() && !this.mostrarOpciones) {
      Interfaz.barra(this.texto, true);
      return;
    }
    if (!this.hayDecision()) {
      Interfaz.barra(this.texto, false);
    }
    this.opciones.forEach(opcion => opcion.boton.dibujar());
  }

  clic() {
    if (this.hayDecision() && !this.mostrarOpciones) {
      this.mostrarOpciones = true;
      return null;
    }
    let elegida = this.opciones.find(opcion => opcion.boton.clicSobre());
    return elegida ? elegida.siguiente : null;
  }
}

class EfectoPunch {
  constructor() {
    this.inicio = millis();
    this.x = 400 + random(-25, 25);
    this.y = 200 + random(-25, 25);
    this.angulo = random(-0.4, 0.4);
    this.altoBase = 120;
  }

  progreso() {
    return (millis() - this.inicio) / DURACION_PUNCH;
  }

  estaTerminado() {
    return this.progreso() >= 1;
  }

  dibujar() {
    let img = Recursos.imagen(IMAGEN_PUNCH);
    if (!img) {
      return;
    }
    let t = this.progreso();
    let escala = 0.7 + 0.5 * t;
    let alto = this.altoBase * escala;
    let ancho = img.width * (alto / img.height);
    push();
    translate(this.x, this.y);
    rotate(this.angulo);
    tint(255, 255 * (1 - t));
    imageMode(CENTER);
    image(img, 0, 0, ancho, alto);
    pop();
  }
}

class Boxeador {
  constructor(x, y, alto, xGolpe) {
    this.x = x;
    this.y = y;
    this.alto = alto;
    this.xGolpe = xGolpe;
    this.poseGolpe = 1;
    this.ultimoGolpe = -10000;
  }

  reiniciar() {
    this.poseGolpe = 1;
    this.ultimoGolpe = -10000;
  }

  golpear(tecla) {
    this.poseGolpe = (tecla === "a") ? 2 : 1;
    this.ultimoGolpe = millis();
  }

  estaGolpeando() {
    return millis() - this.ultimoGolpe < DURACION_GOLPE;
  }

  dibujar(terminado) {
    let pose = 0;
    if (terminado) {
      pose = 3;
    } else if (this.estaGolpeando()) {
      pose = this.poseGolpe;
    }
    let posX = (pose === 2) ? this.xGolpe : this.x;
    Recursos.dibujarImagenCentrada(IMAGENES_BOXEO[pose], posX, this.y, this.alto);
  }
}

class SacoBoxeo {
  constructor(x, y, alto) {
    this.x = x;
    this.y = y;
    this.alto = alto;
  }

  dibujar(boxeador, terminado) {
    let indice = 0;
    if (!terminado && boxeador.estaGolpeando()) {
      indice = (boxeador.poseGolpe === 2) ? 1 : 2;
    }
    Recursos.dibujarImagenCentrada(IMAGENES_SACO[indice], this.x, this.y, this.alto);
  }
}
class MinijuegoBoxeo {
  constructor() {
    this.boxeador = new Boxeador(300, 250, 270, 340);
    this.saco = new SacoBoxeo(400, 200, 400);
    this.efectos = [];
    this.botonReintentar = new Boton(240, 320, 150, 45, "REINTENTAR");
    this.botonContinuar = new Boton(410, 320, 150, 45, "CONTINUAR");
    this.reiniciar();
  }

  reiniciar() {
    this.golpes = 0;
    this.efectos = [];
    this.estado = "JUGANDO";
    this.inicio = millis();
    this.boxeador.reiniciar();
  }

  tiempoRestante() {
    let transcurrido = (millis() - this.inicio) / 1000;
    return max(0, ceil(TIEMPO_BOXEO - transcurrido));
  }

  terminado() {
    return this.estado !== "JUGANDO";
  }

  tecla(k) {
    if (k === "r") {
      this.reiniciar();
      return;
    }
    if (this.estado !== "JUGANDO") {
      return;
    }
    if (k === "a" || k === "d") {
      this.boxeador.golpear(k);
      this.efectos.push(new EfectoPunch());
      this.golpes++;
      if (this.golpes >= GOLPES_PARA_TERMINAR) {
        this.estado = "GANO";
      }
    }
  }

  clic() {
    if (!this.terminado()) {
      return null;
    }
    if (this.botonReintentar.clicSobre()) {
      this.reiniciar();
      return null;
    }
    if (this.botonContinuar.clicSobre()) {
      return (this.estado === "GANO") ? "finalVictoria" : "finalDerrota";
    }
    return null;
  }

  dibujar() {
    if (this.estado === "JUGANDO" && this.tiempoRestante() <= 0) {
      this.estado = "FALLO";
    }

    Recursos.dibujarFondo(IMAGEN_GIMNASIO);
    this.saco.dibujar(this.boxeador, this.terminado());
    this.boxeador.dibujar(this.terminado());
    this.efectos = this.efectos.filter(efecto => !efecto.estaTerminado());
    this.efectos.forEach(efecto => efecto.dibujar());

    Interfaz.titulo("¡Entrenamiento de fuerza! Presiona A y D para golpear (R reinicia)");

    noStroke();
    fill(255, 200, 60);
    textAlign(LEFT, TOP);
    textSize(16);
    text("Golpes: " + this.golpes + " / " + GOLPES_PARA_TERMINAR, 30, 70);
    text("Tiempo: " + this.tiempoRestante() + " s", 30, 92);

    if (this.estado === "FALLO") {
      textAlign(CENTER, CENTER);
      Interfaz.escribirResaltado("¡Fallaste!", 0, 0, width, height, 64);
    } else if (this.estado === "GANO") {
      textAlign(CENTER, CENTER);
      Interfaz.escribirResaltado("¡Lo lograste!", 0, 0, width, height, 64);
    }

    if (this.terminado()) {
      this.botonReintentar.dibujar();
      this.botonContinuar.dibujar();
    }
  }
}
class Creditos {
  constructor(lineas, velocidad) {
    this.lineas = lineas;
    this.velocidad = velocidad;
    this.inicio = 0;
    this.terminado = false;
    this.boton = new Boton(300, 335, 200, 50, "VOLVER AL MENÚ");
  }

  iniciar() {
    this.inicio = frameCount;
    this.terminado = false;
  }

  dibujar() {
    Recursos.dibujarFondo(IMAGEN_CREDITOS);
    noStroke();
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, TOP);
    textSize(18);

    let separacion = 28;
    let alto = this.lineas.length * separacion;
    let yFinal = 320 - alto;
    let y = height - (frameCount - this.inicio) * this.velocidad;
    this.terminado = y <= yFinal;
    if (this.terminado) {
      y = yFinal;
    }
    this.lineas.forEach((linea, i) => {
      text(linea, width / 2, y + i * separacion);
    }
    );
    if (this.terminado) {
      this.boton.dibujar();
    }
  }

  clic() {
    return this.terminado && this.boton.clicSobre();
  }
}
class Juego {
  constructor() {
    this.estado = "INICIO";
    this.botonInicio = new Boton(300, 250, 200, 50, "COMENZAR");
    this.botonCreditos = new Boton(300, 315, 200, 50, "CRÉDITOS");

    this.pantallas = Object.fromEntries(
      Object.entries(datosPantallas).map(([nombre, datos]) => [nombre, new Pantalla(datos)])
      );
    this.minijuego = new MinijuegoBoxeo();
    this.creditos = new Creditos(lineasCreditos, 1.5);
  }

  irAPantalla(nombre) {
    this.estado = nombre;
    if (nombre === "CREDITOS") {
      this.creditos.iniciar();
    } else if (nombre === "MINIJUEGO_BOXEO") {
      this.minijuego.reiniciar();
    } else if (nombre in this.pantallas) {
      this.pantallas[nombre].reiniciar();
    }
  }

  dibujarInicio() {
    Recursos.dibujarFondo(IMAGEN_PORTADA);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(36);
    text("TWIN TURBO RUN RUN!", width / 2, 110);
    textSize(18);
    text("(Entrenamiento de fuerza y estamina!)", width / 2, 150);
    this.botonInicio.dibujar();
    this.botonCreditos.dibujar();
  }

  dibujar() {
    if (this.estado === "INICIO") {
      this.dibujarInicio();
    } else if (this.estado === "CREDITOS") {
      this.creditos.dibujar();
    } else if (this.estado === "MINIJUEGO_BOXEO") {
      this.minijuego.dibujar();
    } else {
      this.pantallas[this.estado].dibujar();
    }
  }

  clic() {
    if (this.estado === "INICIO") {
      if (this.botonInicio.clicSobre()) {
        this.irAPantalla("decisionEntrenamiento");
      } else if (this.botonCreditos.clicSobre()) {
        this.irAPantalla("CREDITOS");
      }
    } else if (this.estado === "CREDITOS") {
      if (this.creditos.clic()) {
        this.irAPantalla("INICIO");
      }
    } else if (this.estado === "MINIJUEGO_BOXEO") {
      let siguiente = this.minijuego.clic();
      if (siguiente) {
        this.irAPantalla(siguiente);
      }
    } else {
      let siguiente = this.pantallas[this.estado].clic();
      if (siguiente) {
        this.irAPantalla(siguiente);
      }
    }
  }

  tecla(k) {
    if (this.estado === "MINIJUEGO_BOXEO") {
      this.minijuego.tecla(k);
    }
  }
}
let juego;

function preload() {
  Recursos.precargar();
}

function setup() {
  createCanvas(800, 400);
  Recursos.configurarMusica();
  juego = new Juego();
}

function draw() {
  juego.dibujar();
}

function mousePressed() {
  Recursos.activarMusica();
  juego.clic();
}

function keyPressed() {
  juego.tecla(key.toLowerCase());
}
