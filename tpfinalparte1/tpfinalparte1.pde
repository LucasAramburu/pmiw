int estado;

void setup() {
  size(800, 450);
}
void draw() {
  if (estado==0) {
    dibujaPantallaInicio();
  } else if (estado==1) {
    dibujaPantallaUno();
  } else if (estado==2) {
    dibujaPantallaDos();
  } else if (estado==3) {
    dibujaPantallaTres();
  } else if (estado==4) {
    dibujaPantallaCuatro();
  } else if (estado==5) {
    dibujaPantallaCinco();
  } else if (estado==6) {
    dibujaPantallaSeis();
  } else if (estado==7) {
    dibujaPantallaSiete();
  } else if (estado==8) {
    dibujaPantallaOcho();
  } else if (estado==9) {
    dibujaPantallaNueve();
  } else if (estado==10) {
    dibujaPantallaDiez();
  } else if (estado==11) {
    dibujaPantallaOnce();
  } else if (estado==12) {
    dibujaPantallaDoce();
  } else if (estado==13) {
    dibujaPantallaTrece();
  } else if (estado==14) {
    dibujaPantallaCatorce();
  } else if (estado==15) {
    dibujaPantallaQuince();
  }
}
void mousePressed() {
  println("X: " + mouseX + " | Y: " + mouseY);
  if (estado==0) {
    estado = 1;
  } else if (estado==1) {
    estado = 2;
  }else if (estado==2) {
    estado = 3;
  }else if (estado==3) {
    estado = 4;
  }else if (estado==4) {
    estado = 5;
  }else if (estado==5) {
    estado = 6;
  }else if (estado==6) {
    estado = 7;
  }else if (estado==7) {
    estado = 8;
  }else if (estado==8) {
    estado = 9;
  }else if (estado==9) {
    estado = 10;
  }else if (estado==10) {
    estado = 11;
  }else if (estado==11) {
    estado = 12;
  }else if (estado==12) {
    estado = 13;
  }else if (estado==13) {
    estado = 14;
  }else if (estado==14) {
    estado = 15;
  }
}
