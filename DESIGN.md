---
name: "JM Schoenstatt Managua: Nadie se enciende solo"
description: "Noche de fogata: una sola llama que crece con el scroll sobre un cielo azul noche que se vuelve brasa."
colors:
  brasa: "#E8692A"
  oro: "#F2B544"
  noche-profunda: "#070D1E"
  noche: "#0B1530"
  marino: "#14233F"
  crema: "#F6EFE4"
  crema-suave: "rgb(246 239 228 / 0.74)"
  crema-tenue: "rgb(246 239 228 / 0.5)"
  linea: "rgb(246 239 228 / 0.18)"
  brasa-clara: "#F58A57"
typography:
  display:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "clamp(4rem, 19vw, 9.5rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "clamp(2.75rem, 13vw, 5.75rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.005em"
  title:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.01em"
  button:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.03em"
  quote:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.25rem, 5.4vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.45
  seal:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.34em"
rounded:
  hairline: "2px"
  check: "3px"
  control: "4px"
  media: "6px"
spacing:
  gutter: "1rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  section: "clamp(5rem, 14svh, 7.5rem)"
  content-max: "68rem"
components:
  button-llama:
    backgroundColor: "{colors.brasa}"
    textColor: "{colors.noche}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.25rem"
    height: "3.75rem"
    width: "100%"
  button-llama-hover:
    backgroundColor: "{colors.oro}"
    textColor: "{colors.noche}"
  cta-fija:
    backgroundColor: "{colors.brasa}"
    textColor: "{colors.noche}"
    rounded: "{rounded.control}"
    height: "3.5rem"
    width: "min(calc(100% - 2rem), 26rem)"
  grupo:
    backgroundColor: "rgb(11 21 48 / 0.9)"
    textColor: "{colors.crema}"
    rounded: "{rounded.media}"
    padding: "1.5rem 1.25rem"
    height: "6.5rem"
  grupo-selected:
    backgroundColor: "rgb(232 105 42 / 0.14)"
    textColor: "{colors.crema}"
  input:
    backgroundColor: "{colors.noche-profunda}"
    textColor: "{colors.crema}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 0.875rem"
    height: "3.25rem"
  opcion:
    backgroundColor: "transparent"
    textColor: "{colors.crema}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1rem"
    height: "3.5rem"
  opcion-checked:
    backgroundColor: "rgb(232 105 42 / 0.16)"
    textColor: "{colors.crema}"
  formulario:
    backgroundColor: "rgb(11 21 48 / 0.84)"
    textColor: "{colors.crema}"
    padding: "1.75rem 1.25rem 2rem"
    width: "34rem"
  foto-duotono:
    backgroundColor: "{colors.brasa}"
    rounded: "{rounded.media}"
---

# Design System: JM Schoenstatt Managua: Nadie se enciende solo

> **Alcance.** Este archivo describe solo el mundo visual "Nadie se enciende solo", el de la landing de inscripciones en `/inscripciones/` (`inscripciones/index.html`, `styles.css`, `app.js`). Las páginas anteriores del sitio (`index.html`, `la-jm.html`, `caminos.html`, `cruzados.html`, `pioneros.html`, `universitarios.html`, `encuentros.html`, `equipo.html`, `recursos.html`, etc., todas con `/style.css`) usan un sistema visual distinto y más antiguo que este archivo **no** describe. No apliques estas reglas a esas páginas ni copies sus estilos aquí sin una decisión explícita de migrarlas.

## Overview

**Creative North Star: "La fogata de noche"**

La página es una noche casi negra en la que una sola llama, fija abajo al centro, crece a medida que el visitante baja; el cielo pasa de azul noche a brasa con el progreso de lectura, y la llama queda completa cuando el formulario llega al centro de la pantalla. Leer es encenderse. Todo lo demás (titulares, fotos, grupos, preguntas) pasa por delante de ese fuego, una sección y un protagonista a la vez.

El color cálido es luz, no superficie: brasa y oro aparecen en la llama, en la acción y en el foco; los fondos son siempre noche o marino translúcido. Los titulares gritan en Anton, en mayúsculas, grandes y apretados; lo que se lee de verdad habla en Inter, en crema atenuado. Las fotos nunca llegan en color natural: un duotono por CSS las lleva a sombras marino y luces brasa, para que vivan dentro de la misma noche. Un grano de película muy leve cubre todo y quita el brillo digital.

La densidad es baja y vertical, pensada para un celular dentro del navegador de Instagram: secciones altas, una idea por pantalla, controles grandes para el pulgar y un botón fijo abajo. El sistema rechaza la landing de categoría: el hero con foto de grupo sonriente, las rejillas de tarjetas iguales con íconos y el botón genérico.

**Key Characteristics:**
- Una sola llama SVG fija como protagonista continuo, escalada por el scroll (de 0.2 a 1).
- Cielo en dos capas: noche fija y una capa brasa cuya opacidad sigue al progreso.
- Brasa y oro solo como luz: llama, acción, selección, foco y la línea fina.
- Anton en mayúsculas para lo que se grita; Inter para lo que se lee.
- Fotos siempre en duotono marino/brasa por CSS.
- Grano de película al 7% sobre toda la página.
- Esquinas casi rectas (4px controles, 6px medios); líneas finas en lugar de sombras de tarjeta.

## Colors

Cinco colores fijados por el brief, más los derivados que la noche necesita para texto, líneas y error; el fuego es la única fuente de calor.

### Primary
- **Naranja brasa** (#E8692A): la capa exterior de la llama, el relleno de la acción (botón principal y botón fijo), el borde y el tinte de lo seleccionado (al 14–16%), el borde superior del formulario, las comillas de los testimonios, el signo + de las preguntas y el tramo final de la línea de tiempo. Texto sobre brasa siempre en Noche.

### Secondary
- **Oro de llama** (#F2B544): la capa media de la llama y su halo, el anillo de foco (2px), el estado hover de los botones de acción, el lema institucional, las edades, los autores de citas, "Hoy" en la línea de tiempo y los titulares que cierran (la frase "Y salir a encender el mundo", "Sumate", el título de éxito). Es el color de la recompensa: aparece donde el recorrido culmina.

### Neutral
- **Noche profunda** (#070D1E): el "casi negro" del suelo; fondo del documento, del cielo en la parte alta, de los campos de texto y de los puntos de la línea de tiempo. También es el color del halo que separa el texto del fuego.
- **Azul noche** (#0B1530): el pie del cielo, el texto sobre brasa y, translúcido (0.84–0.9), los paneles que flotan sobre la llama (grupos y formulario).
- **Azul marino** (#14233F): el resplandor frío del horizonte del cielo y el tono de las sombras en el duotono de fotos.
- **Crema** (#F6EFE4): todo el texto principal y los titulares; la capa núcleo de la llama.
- **Crema suave** (crema al 74%): bajadas, respuestas, textos de apoyo, ayudas de campo.
- **Crema tenue** (crema al 50%): el inicio frío de la línea de tiempo y el borde de las casillas.
- **Línea** (crema al 18%): divisores, bordes de grupos y preguntas, pasos inactivos del carrusel.

### Error
- **Brasa clara** (#F58A57): solo para estados inválidos (bordes y la barra lateral del mensaje de error). El texto del error se queda en crema; la brasa clara marca, no habla.

### Named Rules
**The Light-Only Rule.** Brasa y oro son luz, nunca superficie. Ninguna sección, panel ni bloque de fondo se pinta de brasa u oro; solo la llama, los botones de acción y los tintes de selección al 14–16% los usan.

**The Night Halo Rule.** El texto que cruza la llama lleva un halo de noche profunda al 85%: un `drop-shadow` por bloque para los titulares en Anton, un `text-shadow` de 1.2em para el texto en Inter. Nunca una caja de fondo por línea.

**The Gold-Ends Rule.** El oro marca los finales y las respuestas: la última frase de una secuencia, "Hoy", el título del formulario y el de éxito. Un titular de sección cualquiera va en crema.

## Typography

**Display Font:** Anton (con Arial Narrow, sans-serif)
**Body Font:** Inter 400 y 600 (con system-ui, -apple-system, Segoe UI, sans-serif)

**Character:** Anton es el grito de fogata, condensado, en mayúsculas y apretado a todo el ancho del celular; Inter es la voz de al lado, clara a pleno sol. Ambas se sirven localmente en woff2 con `font-display: swap`.

### Hierarchy
- **Display** (Anton 400, clamp(4rem, 19vw, 9.5rem), 0.9): solo el titular de portada "NADIE SE ENCIENDE SOLO.", máx. 9ch en celular.
- **Headline** (Anton 400, clamp(2.75rem, 13vw, 5.75rem), 0.95): títulos de sección y la frase de cierre en oro. Las frases grandes de "Qué es" usan un paso menor (clamp(2.25rem, 10.5vw, 5rem), 1.0). El título "Sumate" sube a clamp(4rem, 22vw, 6rem).
- **Title** (Anton 400, 2.25rem, 1.0): nombres de pilar; los nombres de grupo usan clamp(2rem, 9vw, 3.25rem) y los años de la línea de tiempo clamp(3rem, 14vw, 4.5rem).
- **Button** (Anton 400, 1.5rem, 0.03em): etiqueta del botón principal; 1.375rem / 0.04em en el botón fijo; 1.25rem / 0.02em en las opciones del formulario.
- **Quote** (Inter 400, clamp(1.25rem, 5.4vw, 1.5rem), 1.35): testimonios, máx. 30ch.
- **Body** (Inter 400, 1.0625rem, 1.55): todo el texto corrido; bajadas a 34ch, respuestas a 62ch. Los campos usan el mismo tamaño (≥16px para que iOS no haga zoom).
- **Label** (Inter 600, 0.9375rem): etiquetas de campo, edades, autores, preguntas (1.125rem).
- **Seal** (Inter 600, 0.6875rem, 0.34em, mayúsculas): exclusivamente el lema ITE, INCENDITE MUNDUM, en oro al 82%, en la portada y en el pie.

### Named Rules
**The Shout-and-Speak Rule.** Anton siempre en mayúsculas, peso 400, interlineado 0.9–1.1, y solo para lo que se grita: titulares, nombres, años, números grandes y etiquetas de acción. Todo lo que se lee en más de una línea va en Inter.

**The Seal Rule.** La única línea pequeña, espaciada y en mayúsculas es el lema institucional. No se inventan antetítulos ni "eyebrows" sobre los titulares.

## Layout

Columna única vertical, mobile-first. El contenido vive en un contenedor de 68rem centrado con un margen lateral de 1rem que respeta la zona segura (`max(1rem, env(safe-area-inset-left))`). Cada sección tiene padding vertical generoso que escala con la altura de la pantalla (clamp(5rem, 14svh, 7.5rem) arriba, clamp(3rem, 8svh, 5rem) abajo) para que haya un solo protagonista por pantalla.

- **Portada:** 100svh, centrada; el lema arriba como sello, el titular a clamp(5rem, 20svh, 11rem) del borde superior.
- **Qué es:** tres frases, cada una ocupando ~78svh (la última 62svh), centradas.
- **Horizontales con snap:** el carrusel de pilares (tarjetas de min(78vw, 21rem)) y la línea de tiempo (puntos de min(72vw, 19rem)) se deslizan con scroll-snap en celular y se convierten en rejilla de 4 columnas (≥64rem) o fila de 3 (≥56rem) en escritorio.
- **Grupos:** una lista apilada en celular; tres columnas a partir de 48rem.
- **Formulario:** panel de máx. 34rem; debajo queda un hogar vacío de 58svh donde la llama completa se ve entera.
- **Botón fijo:** abajo al centro, 3.5rem de alto, máx. 26rem, sobre la zona segura inferior; se oculta cuando el formulario está a la vista.
- **Ritmo:** pasos de 0.5, 0.75, 1, 1.5 y 2.5rem; 2.5rem separa un titular de su contenido.

### Named Rules
**The One Protagonist Rule.** Cada sección tiene un solo protagonista a la vez (una frase, un carrusel, una lista, un formulario). Sin columnas laterales ni bloques secundarios compitiendo.

## Elevation & Depth

La profundidad viene de capas fijas, no de sombras: el cielo (z 0), la llama (z 1), el contenido (z 2), el grano (z 4) y el botón fijo (z 5). Los paneles que deben leerse sobre la llama (grupos, preguntas, formulario) son noche translúcida (0.7–0.9); el formulario suma `backdrop-filter: blur(8px)` y un borde superior brasa de 2px en lugar de una sombra. El grano de película (textura PNG de 180px al 7%) une todas las capas.

### Shadow Vocabulary
- **Halo de noche, bloque** (`filter: drop-shadow(0 0 22px rgb(7 13 30 / 0.85))`): titulares en Anton que cruzan la llama.
- **Halo de noche, texto** (`text-shadow: 0 0 1.2em rgb(7 13 30 / 0.85)`): texto en Inter que cruza la llama.
- **Botón fijo** (`box-shadow: 0 10px 30px -8px rgb(7 13 30 / 0.8)`): la única sombra de caja; separa el control flotante del contenido que pasa por debajo.
- **Brillo de llama** (`filter: drop-shadow(0 0 18px rgb(242 181 68 / 0.75))`): la llama propia en la pantalla de éxito.

### Named Rules
**The No-Card-Shadow Rule.** Ninguna tarjeta, panel ni campo lleva sombra. La separación se hace con translucidez de noche, una línea fina o un borde brasa. La sombra de caja existe solo en el botón fijo.

## Shapes

Esquinas casi rectas y líneas de 1px. Los controles (botones, campos, opciones) llevan 4px; los medios y los selectores de grupo, 6px; las casillas, 3px; el anillo de foco, 2px. El único círculo es el punto de la línea de tiempo; la forma orgánica del sistema es la llama misma (tres trazados SVG en un viewBox 100×160: exterior brasa, media oro, núcleo crema), reutilizada a escala mínima en la línea de tiempo y en el campo de llamas del éxito. Nada en forma de píldora.

## Components

### Buttons
Directos y cálidos: un bloque de fuego con la etiqueta en Anton.
- **Shape:** casi recto (4px).
- **Primary ("botón llama"):** relleno brasa, texto noche, Anton 1.5rem en mayúsculas, 3.75rem de alto mínimo, ancho completo dentro del formulario; variante compacta de máx. 20rem en la pantalla de éxito.
- **Hover / Focus / Active:** hover (solo con puntero fino) pasa a oro en 200ms; foco con anillo oro de 2px a 3px de distancia; al presionar escala a 0.97 en 160ms con ease-out fuerte. Ocupado: opacidad 0.72 y cursor de progreso.
- **Botón fijo ("Quiero unirme"):** misma piel que el principal, 3.5rem de alto, Anton 1.375rem; se esconde bajando y desvaneciéndose (280ms) cuando el formulario entra en pantalla.
- **Enlace:** texto crema con subrayado brasa de 1px a 0.22em; el enlace a WhatsApp lleva un ícono SVG de trazo 1.6 en currentColor.

### Selector de grupo
- **Style:** panel noche al 90%, borde línea de 1px, 6px, nombre en Anton y edad en Inter 600 oro; 6.5rem de alto en celular, 12rem en columna desde 48rem.
- **State:** hover y seleccionado (`aria-pressed`) pasan el borde a brasa; seleccionado suma tinte brasa al 14%. Presionar escala a 0.98.

### Inputs / Fields
- **Style:** 3.25rem de alto, fondo noche profunda, borde crema al 28%, 4px, texto 1.0625rem; prefijo "+505" dentro del campo de WhatsApp.
- **Focus:** borde oro más un anillo oro de 1px (sin glow difuso).
- **Error:** borde brasa clara; mensaje en Inter 600 crema con barra lateral brasa clara de 2px.
- **Opciones de grupo (radio):** tarjetas de 4px con borde crema al 28%, nombre en Anton 1.25rem; marcada, borde brasa y tinte al 16%, edad en oro.
- **Casilla:** caja de 1.5rem, 3px, fondo noche profunda; marcada, relleno brasa con check noche.

### Formulario
Panel noche al 84% con desenfoque de 8px y borde superior brasa de 2px; padding 1.75rem/1.25rem en celular, 2.5rem en escritorio. El bloque del tutor se separa con una línea fina y una leyenda en oro.

### Preguntas
Lista de `details` con divisores de línea de 1px sobre noche profunda al 70%; la pregunta en Inter 600 1.125rem con 4rem de alto mínimo; un signo + brasa dibujado con dos líneas de 1.5px que gira y se vuelve −. La apertura anima altura y opacidad en 220ms.

### Foto duotono
Toda foto va dentro de un marco duotono: fondo brasa, imagen en escala de grises (contraste 1.15) en modo `multiply`, y una capa marino en modo `lighten`. Resultado: sombras marino, luces brasa. Marcos 4:5 (pilares) o 9:16 (video), 6px.

### La llama (signature)
Un SVG fijo, abajo al centro, de 62svh de alto, con halo radial oro→brasa. Escala de 0.2 (portada) a 1 (formulario centrado) con una curva que crece rápido y se asienta (`1 − (1 − p)^1.6`); la capa brasa del cielo sigue `p^1.2`. Sus tres capas parpadean por separado con duraciones primas entre sí (2.3s, 1.7s, 1.1s; halo 3.1s) para no repetirse a la vista. Baja a 0.26 de opacidad mientras se lee una sección con mucho texto. Al enviar, pasa al frente, crece a escala 7 en 1100ms (`cubic-bezier(0.77, 0, 0.175, 1)`) y se disuelve en un campo de llamas pequeñas con la propia destacada.

### Línea de tiempo
Años en Anton sobre una línea de 1px que va de crema tenue a brasa; puntos circulares de 0.875rem con borde crema suave; el punto "Hoy" es una llama mínima y su año y texto van en oro y crema 600.

### Motion
Aparición única por sección: opacidad + 14px hacia arriba en 0.9s con `cubic-bezier(0.23, 1, 0.32, 1)` (la portada suma un desenfoque de 4px y retardos de 0.15s y 0.35s). Las respuestas táctiles usan 160ms y escala 0.97–0.98. Con `prefers-reduced-motion`, no hay apariciones, parpadeo, scroll suave ni secuencia de éxito: todo aparece ya resuelto.

## Do's and Don'ts

### Do:
- **Do** dejar que la llama sea el único protagonista continuo; cualquier sección nueva debe leerse por delante de ella y, si tiene mucho texto, marcarse para que la llama baje a 0.26.
- **Do** usar brasa (#E8692A) para la acción y oro (#F2B544) para el foco, el hover y los finales; texto sobre brasa siempre en noche (#0B1530).
- **Do** poner un halo de noche profunda al 85% detrás de todo texto que cruce la llama: `drop-shadow` por bloque en Anton, `text-shadow` en Inter.
- **Do** pasar toda foto por el duotono marino/brasa por CSS.
- **Do** escribir titulares en Anton mayúsculas y todo texto corrido en Inter, con voseo nicaragüense ("unite", "escribinos", "vos").
- **Do** mantener controles de al menos 3.25rem de alto y campos a ≥16px.
- **Do** usar una aparición única por sección (opacidad + 14px, ease-out fuerte) y quitar todo movimiento con `prefers-reduced-motion`.

### Don't:
- **Don't** pintar fondos de sección o paneles de brasa u oro; el calor es luz, no superficie.
- **Don't** poner sombras de tarjeta; la única sombra de caja es la del botón fijo.
- **Don't** usar fotos a todo color ni un hero con foto de grupo sonriente.
- **Don't** armar rejillas de tarjetas iguales con íconos; los pilares se cuentan con fotos duotono y un nombre en Anton.
- **Don't** inventar antetítulos o líneas pequeñas espaciadas sobre los titulares; ese tratamiento es exclusivo del lema ITE, INCENDITE MUNDUM.
- **Don't** usar emojis.
- **Don't** redondear en píldora ni pasar de 6px de radio.
- **Don't** convertir la etiqueta "Ejemplo · reemplazar" en un componente: es una marca temporal de honestidad para contenido de ejemplo y desaparece cuando llega contenido real.
