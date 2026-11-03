---
version: 1
slug: "inscripciones-index-html"
primary_target: "inscripciones/index.html"
related_targets: []
---

# Inscripciones — landing de la bio de Instagram

Scope: `inscripciones/` (página única). Mode: Persuade. Build path: code-led (sin generación de imágenes en esta sesión).

Audiencia y acción: joven de 9–30 (o su papá/mamá) que llega desde Instagram en el celular; la acción es inscribirse en su grupo de vida (formulario) o escribir por WhatsApp.
Prueba/contenido: tres frases de qué es, cuatro pilares con foto, tres grupos por edad, testimonios (de ejemplo hasta tener reales), línea de tiempo 1914 / 2016 / Hoy, preguntas frecuentes.
Restricciones: navegador interno de Instagram, sin librerías de animación, prefers-reduced-motion, sin emojis, voseo nicaragüense.

## Direction contract

THESIS: "Nadie se enciende solo." El scroll es el acto de encenderse: una sola llama propia crece con el progreso de lectura y el cielo pasa de noche a brasa; el formulario es el momento en que la llama está completa. Rechaza la landing de categoría (hero con foto de grupo sonriente, tarjetas iguales con íconos, botón "Inscribite" genérico).

OWN-WORLD: Noche de fogata. Suelo azul noche casi negro, marino para superficies, naranja brasa y oro solo como luz (llama, acción, foco). Titulares Anton en mayúsculas, grandes y apretados; texto en Inter. Fotos en duotono azul/naranja. Grano de película muy leve. Esquinas casi rectas, líneas finas color brasa, sin sombras de tarjeta.

STORY: El visitante entiende que es un grupo de amigos semanal (no una clase), ve cómo se vive, encuentra su grupo por edad, oye a otros como él, sabe de dónde viene el fuego, resuelve dudas (y sus papás también) y se inscribe en menos de un minuto.

FIRST VIEWPORT: Pantalla casi negra. Arriba al centro, el lema ITE, INCENDITE MUNDUM en oro tenue y espaciado, como un sello, separado del titular. Centro: "NADIE SE ENCIENDE SOLO." en Anton a todo el ancho; debajo el subtítulo en crema atenuado. La llama pequeña y viva bajo el texto, con un halo cálido. Abajo fijo, el botón "Quiero unirme".

FORM: Dirección fijada por el brief del usuario (sin ronda de concepto); una sola llama SVG fija que escala con el scroll como protagonista continuo; secciones con un solo protagonista cada una.
seed: none (unavailable)

Signature interaction: la llama crece y el cielo se enciende con el scroll; al enviar, la llama se expande hasta llenar la pantalla y se resuelve en un campo de muchas llamas, con la propia destacada.
Motion grammar: aparición única por sección con IntersectionObserver (opacidad + 12px, ease-out fuerte); parpadeo orgánico de la llama por capas con duraciones primas entre sí; sin animación con prefers-reduced-motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
