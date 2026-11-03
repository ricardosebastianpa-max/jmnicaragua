# Product

<!-- impeccable:product-schema 1 -->

> Escrito a partir del brief de la landing de inscripciones (noviembre 2026) y del sitio existente. Lo marcado como *inferido* no fue confirmado por el equipo de la JM y debe revisarse.

## Platform

web

## Users

- Jóvenes varones nicaragüenses de 9 a 30 años en Managua que llegan desde el enlace de la bio de Instagram (@jmschoenstattnic). Casi todos entran desde el navegador interno de Instagram en un celular, con poco tiempo y señal variable.
- Papás y mamás de los menores, que necesitan saber quién acompaña a sus hijos, dónde y cuándo, y dar su consentimiento.
- Muchos vienen "de afuera": no conocen Schoenstatt ni el lenguaje de la Iglesia.

## Product Purpose

La Juventud Masculina (JM) de Schoenstatt en Nicaragua forma grupos de vida: jóvenes que se juntan cada semana para ser amigos de verdad, crecer por dentro y vivir la fe con María, y salir a encender el mundo. El sitio existe para que un joven (o su familia) se inscriba en el grupo que le toca. Éxito: una inscripción completa con un WhatsApp válido al que el equipo responde en menos de 48 horas.

## Positioning

No es una clase ni un retiro: es un grupo de amigos fijo, por edad, con formación y aventura, ligado a un santuario (Schoenstatt, Alemania, 1914; en Nicaragua desde 2016).

## Operating Context

- Tres grupos por edad. Rangos según el brief y el sitio: Cruzados 9–12 (el sitio anterior decía 8–12), Pioneros 13–17, Universitarios 18–30 (el sitio anterior decía 18–25). *Confirmar.*
- Reuniones semanales; el sitio existente menciona viernes o sábados y "nuestro Centro" en Managua. *Inferido; confirmar día, hora y lugar por grupo.*
- El seguimiento de cada inscripción es por WhatsApp.
- Las inscripciones llegan al panel `/admin` (pestaña Mensajes) vía `/api/submit` (Netlify Functions + Blobs). El número de WhatsApp público se configura en `/admin` → Configuración.

## Capabilities and Constraints

- Sitio estático en Netlify, sin paso de build; funciones en `netlify/functions`.
- Los menores de 18 requieren nombre y WhatsApp de un padre, madre o tutor y su consentimiento.
- Sin dependencias pesadas: debe cargar rápido en datos móviles dentro del navegador de Instagram.
- Costo de participación: *no confirmado*.

## Brand Commitments

- Nombre: Juventud Masculina de Schoenstatt (JM), Managua, Nicaragua. Instagram @jmschoenstattnic.
- Lema institucional: ITE, INCENDITE MUNDUM ("Vayan y enciendan el mundo").
- Voz: de joven a joven, español con voseo nicaragüense ("unite", "escribinos", "vos"), directo, sin jerga eclesial que aleje al que viene de afuera. Sin emojis.
- Paleta fijada por el brief: azul noche #0B1530, azul marino #14233F, naranja brasa #E8692A, oro #F2B544, crema #F6EFE4.

## Evidence on Hand

- No hay fotos, videos ni testimonios reales en el repositorio. Las fotos de `inscripciones/assets/img` son de Flickr con licencia CC (créditos en la página) y deben reemplazarse por fotos propias. Los testimonios y el video de la landing son de ejemplo y no deben publicarse como reales.
- El número de WhatsApp en el código es un marcador (`50500000000`); el real se toma de la configuración del panel.

## Product Principles

1. El que viene de afuera tiene que entender y sentirse invitado en el primer vistazo.
2. Pedir solo lo necesario para que alguien le escriba al joven; todo lo demás se habla por WhatsApp.
3. Los papás de menores siempre saben y consienten.
4. Nunca inventar personas, cifras ni promesas que la JM no pueda cumplir.

## Accessibility & Inclusion

- Celulares de gama media y conexiones lentas; texto legible a pleno sol; controles grandes para el pulgar.
- Respetar `prefers-reduced-motion`.
