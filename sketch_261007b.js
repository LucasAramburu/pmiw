//Trabajo Practico Final parte #1, Acevedo Maximo - Aramburu Lucas
//Com 3
//Link de video explicativo: https://youtu.be/bzqLdNM_rqU

const MIN_PUNTOS = 3;
const PUNTOS_ALTO = 4;
const MOSTRAR_PUNTOS = true;
const USAR_IMAGENES = true;

const IMAGEN_PORTADA = "assets/Fondos/AparezcoEnLaPortada.png";
const IMAGEN_CREDITOS = "assets/Fondos/Hipodromo.png";

const ARCHIVO_MUSICA = "assets/Musica/UmaMusumeSong.mp3";
const VOLUMEN_MUSICA = 0.5;
let musica = null;
let audioActivado = false;

const VIDEO_X = 160;
const VIDEO_Y = 62;
const VIDEO_ANCHO = 480;
const VIDEO_ALTO = 270;

let estadoActual = "INICIO";
let puntos = 0;
let imagenes = {};
let inicioCreditos = 0;
let creditosTerminados = false;
let mostrarOpciones = false;
let lienzo;
let videoActual = null;

let botonInicio    = { x: 300, y: 300, ancho: 200, alto: 50 };
let botonCreditos  = { x: 300, y: 365, ancho: 200, alto: 50 };
let botonCentro    = { x: 300, y: 370, ancho: 200, alto: 55 };
let botonSiguiente = { x: 630, y: 265, ancho: 150, alto: 42 };

const lineasCreditos = [
  "TWIN TURBO RUN RUN!",
  "Trabajo Práctico Final - Parte 1",
  "",
  "Alumnos: Acevedo Maximo, Aramburu Lucas",
  "Legajo: Acevedo: 125500/6 Aramburu: 87819/0",
  "Comisión: 3",
  "",
  "Obra original: Uma Musume Pretty Derby (Cygames)",
  "Imágenes generadas con IA",
  "",
  "Gracias por jugar"
];

const pantallas = {

  explicacion: {
    texto:      "Las Uma Musume son chicas caballo basadas en caballos de carrera reales. Nuestra historia trata sobre Twin Turbo, una chica caballo conocida por su hiperactividad, estilo de carrera extremo y gran compromiso.",
    imagen:     "assets/Fondos/Hipodromo.png",
    textoA:     "Siguiente",
    siguienteA: "despertar",
    puntosA:    0
  },

  despertar: {
    texto:      "Twin Turbo empieza su día despues de haber dormido en su habitacion, en la Academia Tracen para chicas caballo.",
    imagen:     "assets/Fondos/sleep.png",
    textoA:     "Siguiente",
    siguienteA: "decisionEntrenar",
    puntosA:    0
  },

  decisionEntrenar: {
    texto:      "Despues de despertar Twin turbo debe prepararse para ir a entrenar...",
    imagen:     "assets/Fondos/Hipodromo.png",
    textoA:     "Desayunar e ir a entrenar, llegando tarde",
    siguienteA: "retiro",
    puntosA:    0,
    textoB:     "Calentar y salir a entrenar",
    siguienteB: "retiro",
    puntosB:    1
  },

  retiro: {
    texto:      "Al volver del entrenamiento. Turbo se entera del retiro oficial de Tokai Teio, quien es su más grande referente en las carreras de Uma musumes.",
    imagen:     "assets/Fondos/TwinTurboDiario.png",
    textoA:     "Siguiente",
    siguienteA: "buscarTeio",
    puntosA:    0
  },

  buscarTeio: {
    texto:      "Al enterarse de la noticia, Turbo decide salir a encontrar a Teio para prometerle una cosa...",
    imagen:     "assets/Fondos/BusquedaTeio.png",
    textoA:     "Siguiente",
    siguienteA: "teioImposible",
    puntosA:    0
  },

  teioImposible: {
    texto:      "Al encontrarla, Turbo ve a una acongojada Teio la cual apenada le dice que no competira más, ya que para ella ganar el Arima Kinen es imposible.\n(Una carrera sumamente dificil)",
    imagen:     "assets/Fondos/teioImposible.jpg",
    textoA:     "Siguiente",
    siguienteA: "promesa",
    puntosA:    0
  },

  promesa: {
    texto:      "A esto Turbo le promete: ''Yo ganaré mi proxima carrera, por lo que debes prometerme competir en el Arima Kinen!!''\nExclamo Turbo ante una dudosa Teio, que dudaba de su declaración.",
    imagen:     "assets/Fondos/promesa.jpg",
    textoA:     "Siguiente",
    siguienteA: "entrenador",
    puntosA:    0
  },

  entrenador: {
    texto:      "Tras esas palabras, Turbo decide pedir ayuda para su preparación a su entrenador y compañeras de club.",
    imagen:     "assets/Fondos/TeamCanopus.png",
    textoA:     "Siguiente",
    siguienteA: "decisionEntrenamiento",
    puntosA:    0
  },

  decisionEntrenamiento: {
    texto:      "Aunque le dieron varias recomendaciones, Turbo todavia no sabe por donde empezar a prepararse...",
    imagen:     "assets/Fondos/desicion.png",
    textoA:     "Descansar",
    siguienteA: "resultado",
    puntosA:    0,
    textoB:     "Entrenar fuerza y estamina",
    siguienteB: "resultado",
    puntosB:    2,
    textoC:     "Entrenar velocidad y estrategias",
    siguienteC: "resultado",
    puntosC:    1
  },

  resultado: {
    texto:      "Tras pasar un día sin mucho avance. Turbo es llamada por su entrenador que le sugiere entrenar una nueva tecnica, para correr más rapido.",
    imagen:     "assets/Fondos/Planificacion.png",
    textoA:     "Siguiente",
    siguienteA: "decisionNuevoEstilo",
    puntosA:    0
  },

  decisionNuevoEstilo: {
    texto:      "Ante esto Turbo decide pensarlo cuidadosamente...",
    imagen:     "assets/Fondos/Planificacion.png",
    textoA:     "Descansar y dejar el entrenamiento para luego",
    siguienteA: "reunion",
    puntosA:    0,
    textoB:     "Entrenar con la nueva forma de correr",
    siguienteB: "reunion",
    puntosB:    2
  },

  reunion: {
    texto:      "Sin darse cuenta Turbo se percata que el día de la inscripcion a la carrera esta cerca, por lo que detiene su entrenamiento para reunirse con su equipo a conversar.",
    imagen:     "assets/Fondos/TeamCanopus.png",
    textoA:     "Siguiente",
    siguienteA: "inscripcion",
    puntosA:    0
  },

  inscripcion: {
    texto:      "Él entrenador le dice a Turbo que no debe demorar más la incripción a la carrera y le recomienda que vaya a primera hora.\nA lo cual turbo se queda pensando...",
    imagen:     "assets/Fondos/TwinTurboInscripcion.png",
    textoA:     "Ir temprano a las inscripciones",
    siguienteA: "previaCarrera",
    puntosA:    0,
    requiereA:  MIN_PUNTOS,
    textoB:     "Descansar y anotarse a la tarde",
    siguienteB: "finalMalo",
    puntosB:    0
  },

  previaCarrera: {
    texto:      "¡Es el gran dia de la carrera!\nTodas las Umas estan posicionadas en sus lugares... Turbo respira hondo y se prepara para salir.",
    imagen:     "assets/Fondos/StartingGate.png",
    textoA:     "Siguiente",
    siguienteA: "carrera",
    puntosA:    0
  },

  carrera: {
    texto:      "Suena el timbre de salida y se abren las puertas.\n¡¡Comienza la carrera!!",
    imagen:     "assets/Fondos/Start.png",
    textoA:     "Ver el resultado",
    siguienteA: "finalNormal",
    puntosA:    0
  },

  videoNormal: {
    texto:      "Así fue como Twin Turbo ganó la carrera.",
    video:      "https://www.youtube.com/watch?v=6Js8FhZOIWU",
    textoA:     "Continuar",
    siguienteA: "CHEQUEO_ALTERNATIVO",
    puntosA:    0
  },

  unosDiasDespues: {
    texto:      "Dáas despues en el Arima Kinen, una Tokai Teio motivada compite una vez más!",
    video:      "https://www.youtube.com/watch?v=_LFpimHnNw4",
    textoA:     "Continuar",
    siguienteA: "finalAlternativo",
    puntosA:    0
  },

  finalMalo: {
    final:  true,
    texto:  "Turbo quedo fuera de la competencia, por lo que no pudo correr, lo cual hizo romper su promesa con Teio, que no encontró motivos para seguir corriendo... \nFIN.",
    imagen: "assets/Fondos/FIN2DERROTA.png"
  },

  finalNormal: {
    texto:      "Tras una feroz demostracion de determinación y esfuerzo, Twin Turbo logra ganar la carrera quedando en Primer lugar!\nA su vez Tokai Teio pudo verla ganar, sintiendose muy feliz y motivada por ella. FIN.",
    imagen:     "assets/Fondos/FIN1VICTORIA.png",
    textoA:     "Continuar",
    siguienteA: "videoNormal",
    puntosA:    0
  },

  finalAlternativo: {
    texto:      "Tras una lluvia de emociones, Tokai logra dar su ultimo gran sprint que le da la victoria y el primer lugar! Frente a todos derrama lagriams de alegria y feliz recuerda el pequeño gran empujon que le dio Twin Turbo. FIN.",
    imagen:     "assets/Fondos/FinalAlternativo.png",
    textoA:     "Continuar",
    siguienteA: "CREDITOS",
    puntosA:    0
  }
};

function preload() {
  if (USAR_IMAGENES) {
    cargarImagen(IMAGEN_PORTADA);
    cargarImagen(IMAGEN_CREDITOS);
    for (let nombre in pantallas) {
      cargarImagen(pantallas[nombre].imagen);
    }
  }

  musica = loadSound(ARCHIVO_MUSICA, () => {}, () => { musica = null; });
}

function cargarImagen(archivo) {
  if (archivo && !(archivo in imagenes)) {
    imagenes[archivo] = loadImage(archivo, () => {}, () => { imagenes[archivo] = null; });
  }
}

function setup() {
  lienzo = createCanvas(800, 450);
  if (musica) {
    musica.setVolume(VOLUMEN_MUSICA);
  }
}

function draw() {
  if (estadoActual === "INICIO") {
    dibujarInicio();
  } else if (estadoActual === "CREDITOS") {
    creditosTerminados = dibujarCreditos(lineasCreditos, 1.5);
  } else {
    dibujarPantalla(pantallas[estadoActual]);
  }

  if (MOSTRAR_PUNTOS) {
    fill(255, 200, 60);
    noStroke();
    textAlign(RIGHT, TOP);
    textSize(12);
    text("puntos: " + puntos, width - 25, 60);
  }
}

function activarMusica() {
  if (audioActivado) {
    return;
  }
  audioActivado = true;
  userStartAudio();
  if (musica && !musica.isPlaying()) {
    musica.loop();
  }
}

function dibujarFondo(archivo) {
  let img = imagenes[archivo];
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

function dibujarInicio() {
  dibujarFondo(IMAGEN_PORTADA);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(36);
  text("TWIN TURBO RUN RUN!", width / 2, 130);
  dibujarBoton(botonInicio, "COMENZAR", true);
  dibujarBoton(botonCreditos, "CRÉDITOS", true);
}

function dibujarPantalla(p) {
  if (p.video) {
    background(15, 15, 25);
  } else {
    dibujarFondo(p.imagen);
  }

  if (p.video) {
    dibujarTitulo(p.texto);
    dibujarMarcoVideo();
  }

  if (p.final) {
    dibujarBarra(p.texto, false);
    dibujarBoton(botonSiguiente, "CONTINUAR", true);
    return;
  }

  let opciones = opcionesDe(p);
  let hayDecision = opciones.length > 1;

  if (hayDecision && !mostrarOpciones) {
    dibujarBarra(p.texto, true);
    return;
  }

  if (!hayDecision && !p.video) {
    dibujarBarra(p.texto, false);
  }

  for (let i = 0; i < opciones.length; i++) {
    let o = opciones[i];
    if (puntos >= o.requiere) {
      dibujarBoton(o.boton, o.texto, true);
    } else {
      dibujarBoton(o.boton, o.texto + "\n(te faltan puntos)", false);
    }
  }
}

function dibujarVidrio(x, y, ancho, alto) {
  fill(0, 0, 0, 120);
  stroke(255, 255, 255, 70);
  strokeWeight(1);
  rect(x, y, ancho, alto, 12);
}

function escribirResaltado(contenido, x, y, ancho, alto, tamano) {
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

function dibujarBarra(textoNarrativo, conAviso) {
  dibujarVidrio(20, 320, width - 40, 110);
  textAlign(LEFT, TOP);
  escribirResaltado(textoNarrativo, 35, 330, width - 70, 72, 18);

  if (conAviso) {
    noStroke();
    fill(255, 200, 60);
    textAlign(RIGHT, TOP);
    textSize(13);
    text("Clic para continuar", width - 35, 408);
  }
}

function dibujarTitulo(textoTitulo) {
  dibujarVidrio(20, 10, width - 40, 44);
  textAlign(CENTER, CENTER);
  escribirResaltado(textoTitulo, 35, 10, width - 70, 44, 18);
}

function dibujarMarcoVideo() {
  noStroke();
  fill(0, 0, 0, 200);
  rect(VIDEO_X, VIDEO_Y, VIDEO_ANCHO, VIDEO_ALTO, 6);
  fill(180);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("ACÁ VA EL VIDEO", VIDEO_X + VIDEO_ANCHO / 2, VIDEO_Y + VIDEO_ALTO / 2);
}

function idDeYoutube(enlace) {
  let partes = enlace.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  if (partes) {
    return partes[1];
  }
  return enlace;
}

function ponerVideo(enlace) {
  let id = idDeYoutube(enlace);
  if (id.length !== 11) {
    return;
  }
  let origen = lienzo.position();
  videoActual = createElement("iframe");
  videoActual.attribute("src", "https://www.youtube.com/embed/" + id);
  videoActual.attribute("allowfullscreen", "");
  videoActual.attribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen");
  videoActual.attribute("referrerpolicy", "strict-origin-when-cross-origin");
  videoActual.attribute("frameborder", "0");
  videoActual.size(VIDEO_ANCHO, VIDEO_ALTO);
  videoActual.position(origen.x + VIDEO_X, origen.y + VIDEO_Y);
}

function quitarVideo() {
  if (videoActual) {
    videoActual.remove();
    videoActual = null;
  }
}

function opcionesDe(p) {
  let lista = [];
  let letras = ["A", "B", "C"];
  for (let i = 0; i < letras.length; i++) {
    let letra = letras[i];
    if (p["texto" + letra]) {
      lista.push({
        texto: p["texto" + letra],
        siguiente: p["siguiente" + letra],
        puntos: p["puntos" + letra] || 0,
        requiere: p["requiere" + letra] || 0
      });
    }
  }
  let posiciones = acomodarBotones(lista.length);
  for (let i = 0; i < lista.length; i++) {
    lista[i].boton = posiciones[i];
  }
  if (p.video && lista.length === 1) {
    lista[0].boton = botonCentro;
  }
  return lista;
}

function acomodarBotones(cantidad) {
  if (cantidad === 1) {
    return [botonSiguiente];
  }
  if (cantidad === 2) {
    return [
      { x: 40,  y: 370, ancho: 340, alto: 55 },
      { x: 420, y: 370, ancho: 340, alto: 55 }
    ];
  }
  return [
    { x: 40,  y: 370, ancho: 230, alto: 55 },
    { x: 285, y: 370, ancho: 230, alto: 55 },
    { x: 530, y: 370, ancho: 230, alto: 55 }
  ];
}

function dibujarCreditos(lineas, velocidad) {
  dibujarFondo(IMAGEN_CREDITOS);
  noStroke();
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);
  fill(255);
  textAlign(CENTER, TOP);
  textSize(18);
  let separacion = 28;
  let alto = lineas.length * separacion;
  let yFinal = 330 - alto;
  let y = height - (frameCount - inicioCreditos) * velocidad;
  let terminado = y <= yFinal;
  if (terminado) {
    y = yFinal;
  }
  for (let i = 0; i < lineas.length; i++) {
    text(lineas[i], width / 2, y + i * separacion);
  }
  if (terminado) {
    dibujarBoton(botonCentro, "VOLVER AL MENÚ", true);
  }
  return terminado;
}

function dibujarBoton(boton, textoBoton, habilitado) {
  let encima = habilitado && clicSobre(boton);
  if (!habilitado) {
    stroke(120);
    fill(70, 70, 80, 220);
  } else if (encima) {
    stroke(255);
    fill(255, 200, 60);
  } else {
    stroke(255);
    fill(40, 40, 60, 220);
  }
  rect(boton.x, boton.y, boton.ancho, boton.alto, 10);

  noStroke();
  if (!habilitado) {
    fill(150);
  } else if (encima) {
    fill(0);
  } else {
    fill(255);
  }
  textAlign(CENTER, CENTER);
  textSize(15);
  text(textoBoton, boton.x + 8, boton.y, boton.ancho - 16, boton.alto);
}

function clicSobre(boton) {
  return mouseX >= boton.x && mouseX <= boton.x + boton.ancho &&
         mouseY >= boton.y && mouseY <= boton.y + boton.alto;
}

function resolverDestino(destino) {
  if (destino === "CHEQUEO_ALTERNATIVO") {
    if (puntos >= PUNTOS_ALTO) {
      return "unosDiasDespues";
    } else {
      return "CREDITOS";
    }
  }
  return destino;
}

function irAPantalla(nombre) {
  quitarVideo();
  estadoActual = nombre;
  mostrarOpciones = false;
  let p = pantallas[nombre];
  if (p && p.video) {
    ponerVideo(p.video);
  }
}

function elegir(sumaPuntos, destino) {
  puntos = puntos + sumaPuntos;
  let siguiente = resolverDestino(destino);
  if (siguiente === "CREDITOS") {
    irACreditos();
  } else {
    irAPantalla(siguiente);
  }
}

function irACreditos() {
  quitarVideo();
  inicioCreditos = frameCount;
  creditosTerminados = false;
  estadoActual = "CREDITOS";
}

function mousePressed() {
  activarMusica();

  if (estadoActual === "INICIO") {
    if (clicSobre(botonInicio)) {
      puntos = 0;
      irAPantalla("explicacion");
    } else if (clicSobre(botonCreditos)) {
      irACreditos();
    }

  } else if (estadoActual === "CREDITOS") {
    if (creditosTerminados && clicSobre(botonCentro)) {
      estadoActual = "INICIO";
    }

  } else {
    let p = pantallas[estadoActual];

    if (p.final) {
      if (clicSobre(botonSiguiente)) {
        irACreditos();
      }
    } else {
      let opciones = opcionesDe(p);
      if (opciones.length > 1 && !mostrarOpciones) {
        mostrarOpciones = true;
        return;
      }
      for (let i = 0; i < opciones.length; i++) {
        let o = opciones[i];
        if (puntos >= o.requiere && clicSobre(o.boton)) {
          elegir(o.puntos, o.siguiente);
          return;
        }
      }
    }
  }
}
