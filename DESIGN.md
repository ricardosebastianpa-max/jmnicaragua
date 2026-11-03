---
name: "JM Schoenstatt Nicaragua"
description: "La identidad de las redes llevada a la web: el santuario envuelto en una llama sobre un degradado de azul noche a brasa, y los íconos de las tres etapas."
colors:
  noche: "#0B1530"
  noche-profunda: "#070D1E"
  marino: "#14233F"
  azul-logo: "#0C2A6E"
  ciruela: "#3A1D44"
  brasa: "#E8692A"
  brasa-honda: "#A83C1E"
  oro: "#F2B544"
  crema: "#F6EFE4"
  crema-suave: "rgb(246 239 228 / 0.76)"
  crema-tenue: "rgb(246 239 228 / 0.52)"
  linea: "rgb(246 239 228 / 0.16)"
  cruzados: "#8A1230"
  cruzados-luz: "#B81B3D"
  pioneros: "#0B309B"
  pioneros-luz: "#1C64D8"
  univ-rojo: "#C2170F"
  univ-naranja: "#EF6A12"
  univ-oro: "#F7BE1D"
  error: "#F58A57"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(3.5rem, 16.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.012em"
  titular:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.7rem, 11vw, 4.77rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.012em"
  acento:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.56em"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
  voz:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "2.075rem"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.005em"
  cuerpo:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 450
    lineHeight: 1.65
  rotulo:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  control: "4px"
  panel: "6px"
spacing:
  margen: "1.25rem"
  seccion: "clamp(5rem, 12vw, 9rem)"
  medida: "62ch"
---

# JM Schoenstatt Nicaragua

Alcance: el sitio en la raíz (`/`, `/historia/`, `/simbolos/`), con estilos en `assets/sitio.css`. Las páginas anteriores, en `/anterior/`, usan un sistema viejo que este archivo no describe.

## Mundo

La identidad viene de las redes de la JM: el logo (el santuario y la Mater envueltos en una llama, en crema sobre un degradado de azul noche a ciruela y brasa) y los íconos de cada etapa, vectorizados de los originales en `assets/icons/sprite.svg`. El degradado del logo es la firma: abre cada página y cierra la portada en la sección Unite. El grano de afiche (`assets/img/grano.png`, en modo overlay) y la trama de puntos sobre las fotos vienen de los afiches de referencia.

## Color

Fondo de noche profunda. La brasa es la acción: botones, números de sección, subrayados. El oro marca las traducciones, los apodos y lo que sigue pendiente. Cada etapa tiene su propio color, tomado de su ícono: bordó para Cruzados, azul rey para Pioneros y de rojo a oro para Universitarios. La sección Para papás invierte a fondo crema con texto noche, para que los papás la encuentren rápido. Todo texto pasa de 4.5:1. Sobre crema, la brasa se oscurece a `brasa-honda`.

## Tipografía

Dos familias que conviven en los mismos titulares:

- **Titulares** en Instrument Serif: el lema en latín en itálica enorme y los titulares en redonda. Dentro de un titular, una frase clave va en **Montserrat 800 en mayúsculas** y en oro (clase `.acento`), como en los afiches de referencia.
- **Texto** en Montserrat (variable, peso 450 en el cuerpo y 600 a 800 en rótulos y botones), con párrafos de hasta 62 caracteres por línea. Los rótulos van en mayúsculas de 0.75rem con espaciado de 0.14em.
- **Latín y citas** en Instrument Serif itálica, también dentro de los párrafos.

Escala modular de 1.25 sobre 16px. Las cifras grandes van en serif.

## Composición

Cada sección tiene un solo protagonista y el ritmo cambia: apertura inmersiva, ficha "en corto", cita grande con cuatro columnas, paneles de etapa a todo el ancho, línea de tiempo horizontal, definiciones con la introducción fija al costado, lista de honor, grilla de cifras, bloque del 8 de diciembre, ficha clara para papás, preguntas en acordeón y el formulario sobre el degradado. Un divisor numerado (01 a 11) indica en qué parte del recorrido estás.

## Movimiento

- **La mecha:** una línea de fuego en el borde izquierdo con una pequeña llama en la punta, que baja y crece con la lectura.
- **Apariciones:** escalonadas, de 70ms entre elementos.
- **Línea de tiempo:** se recorre de lado y su riel se va encendiendo.
- **Movimiento reducido:** todo queda visible y quieto.

## No hacer

- No usar rangos de edad: las etapas se definen por nivel escolar.
- No poner emojis.
- No usar fotos de banco como si fueran de la JM: hasta tener fotos reales, quedan los espacios marcados "Foto real".
- No inventar datos locales: van en `content.json` y se ven como "Por confirmar" hasta confirmarlos.
