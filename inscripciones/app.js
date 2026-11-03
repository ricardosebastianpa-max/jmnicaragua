/* =========================================================================
   Nadie se enciende solo — comportamiento de la landing
   Sin librerías. La llama crece con el scroll; el formulario envía a
   /api/submit (mismo panel /admin que el resto del sitio).
   ========================================================================= */

const CONFIG = {
  // Respaldo si /api/public/settings no responde. El número real se configura
  // en /admin → Configuración → WhatsApp.
  whatsapp: '50500000000',

  // Ruta a un video vertical (.mp4, 9:16, idealmente < 8 MB). Vacío = póster con aviso.
  videoTestimonio: '',

  // Muestra la etiqueta "Ejemplo · reemplazar" en testimonios y video.
  // Ponelo en false cuando los testimonios y el video sean reales.
  mostrarEtiquetasDeEjemplo: true,
};

const $ = (sel, raiz = document) => raiz.querySelector(sel);
const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));
const limitar = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');
const urlPagina = location.origin + location.pathname;

const NOMBRES_GRUPO = {
  cruzados: 'Cruzados',
  pioneros: 'Pioneros',
  universitarios: 'Universitarios',
};

if (!CONFIG.mostrarEtiquetasDeEjemplo) document.documentElement.classList.add('sin-ejemplos');

/* -------------------------------------------------------------------------
   WhatsApp: número desde la configuración del panel
   ------------------------------------------------------------------------- */

let numeroWhatsapp = CONFIG.whatsapp;
const MENSAJE_DIRECTO = 'Hola, quiero unirme a un grupo de vida de la JM.';

function enlaceWhatsapp(texto, numero = numeroWhatsapp) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

function actualizarEnlacesWhatsapp() {
  $$('[data-whatsapp]').forEach((a) => { a.href = enlaceWhatsapp(MENSAJE_DIRECTO); });
}

actualizarEnlacesWhatsapp();
fetch('/api/public/settings')
  .then((r) => (r.ok ? r.json() : null))
  .then((s) => {
    const limpio = s && typeof s.whatsapp === 'string' ? s.whatsapp.replace(/\D/g, '') : '';
    if (limpio.length >= 8) {
      numeroWhatsapp = limpio;
      actualizarEnlacesWhatsapp();
    }
  })
  .catch(() => {});

/* -------------------------------------------------------------------------
   La llama y el cielo: crecen con el progreso del scroll
   ------------------------------------------------------------------------- */

const llama = $('#llama');
const brasa = $('#cielo-brasa');
const seccionFormulario = $('#inscripcion');

const ESCALA_INICIAL = 0.2;
let altoVentana = window.innerHeight;
let finRecorrido = 1;
let pendiente = false;

function medir() {
  altoVentana = window.innerHeight;
  const arribaFormulario = seccionFormulario.getBoundingClientRect().top + window.scrollY;
  // La llama queda completa cuando el formulario ocupa el centro de la pantalla
  finRecorrido = Math.max(1, arribaFormulario - altoVentana * 0.35);
}

function pintarLlama() {
  pendiente = false;
  const y = window.scrollY;
  const progreso = limitar(y / finRecorrido);
  // Salida suave de la portada: la llama baja de debajo del titular a su base
  const salidaPortada = limitar(y / (altoVentana * 0.9));
  const desplazamiento = -0.12 * altoVentana * (1 - salidaPortada);
  // Crece rápido al principio y se asienta al final
  const escala = ESCALA_INICIAL + (1 - ESCALA_INICIAL) * (1 - (1 - progreso) ** 1.6);
  llama.style.transform = `translate3d(-50%, ${desplazamiento.toFixed(1)}px, 0) scale(${escala.toFixed(4)})`;
  brasa.style.opacity = (progreso ** 1.2).toFixed(3);
}

function alHacerScroll() {
  if (!pendiente) {
    pendiente = true;
    requestAnimationFrame(pintarLlama);
  }
}

function iniciarLlama() {
  medir();
  pintarLlama();
  window.addEventListener('scroll', alHacerScroll, { passive: true });
  window.addEventListener('resize', () => { medir(); alHacerScroll(); }, { passive: true });
  // Las fuentes y las imágenes cambian la altura de la página
  window.addEventListener('load', () => { medir(); alHacerScroll(); });
  if (document.fonts) document.fonts.ready.then(() => { medir(); alHacerScroll(); });
}

iniciarLlama();

// Secciones de lectura: la llama baja su brillo mientras ocupan el centro
if ('IntersectionObserver' in window) {
  const enLectura = new Set();
  const obsLectura = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => (e.isIntersecting ? enLectura.add(e.target) : enLectura.delete(e.target)));
    llama.classList.toggle('tenue', enLectura.size > 0);
  }, { rootMargin: '-35% 0px -35% 0px' });
  $$('[data-llama="tenue"]').forEach((s) => obsLectura.observe(s));
}

/* -------------------------------------------------------------------------
   Apariciones de texto
   ------------------------------------------------------------------------- */

const reveladores = $$('[data-revela]');
if ('IntersectionObserver' in window && !movimientoReducido.matches) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observador.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -18% 0px', threshold: 0.15 });
  reveladores.forEach((el) => observador.observe(el));
} else {
  reveladores.forEach((el) => el.classList.add('visible'));
}

/* -------------------------------------------------------------------------
   Carrusel: indicador de posición
   ------------------------------------------------------------------------- */

const carrusel = $('#carrusel');
const marcas = $$('.carrusel__progreso span');
if (carrusel && 'IntersectionObserver' in window) {
  const tarjetas = $$('.tarjeta', carrusel);
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        const i = tarjetas.indexOf(e.target);
        marcas.forEach((m, j) => m.classList.toggle('activo', j === i));
      }
    });
  }, { root: carrusel, threshold: 0.6 });
  tarjetas.forEach((t) => obs.observe(t));
}

/* -------------------------------------------------------------------------
   Video de testimonios
   ------------------------------------------------------------------------- */

if (CONFIG.videoTestimonio) {
  const figura = $('#video-testimonio');
  const marco = $('.video__marco', figura);
  const poster = $('img', marco).getAttribute('src');
  const video = document.createElement('video');
  video.src = CONFIG.videoTestimonio;
  video.poster = poster;
  video.controls = true;
  video.playsInline = true;
  video.preload = 'none';
  video.setAttribute('aria-label', 'Video: miembros de la JM cuentan cómo es su grupo');
  marco.classList.remove('duotono');
  marco.replaceChildren(video);
  $('.video__aviso', figura).remove();
}

/* -------------------------------------------------------------------------
   Botón fijo "Quiero unirme": se oculta al llegar al formulario
   ------------------------------------------------------------------------- */

const ctaFija = $('#cta-fija');
let formularioALaVista = false;
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => {
    // Visible mientras el formulario no haya llegado a la parte baja de la pantalla
    formularioALaVista = e.isIntersecting || e.boundingClientRect.top < 0;
    ctaFija.classList.toggle('oculta', formularioALaVista);
  }, { rootMargin: '0px 0px -12% 0px' }).observe(seccionFormulario);
}

/* -------------------------------------------------------------------------
   Formulario
   ------------------------------------------------------------------------- */

const form = $('#formulario');
const campos = {
  nombre: $('#f-nombre'),
  edad: $('#f-edad'),
  whatsapp: $('#f-whatsapp'),
  colegio: $('#f-colegio'),
  tutorNombre: $('#f-tutor-nombre'),
  tutorWhatsapp: $('#f-tutor-whatsapp'),
  consentimiento: $('#f-consentimiento'),
  website: $('#f-website'),
};
const radiosGrupo = $$('input[name="grupo"]', form);
const fieldsetGrupo = $('#f-grupo');
const notaGrupo = $('#nota-grupo');
const tutor = $('#tutor');
const botonEnviar = $('#enviar');
const fallo = $('#fallo');
let intentoEnviar = false;
let grupoElegidoAMano = false;

function grupoActual() {
  const r = radiosGrupo.find((x) => x.checked);
  return r ? r.value : '';
}

function marcarGrupo(valor) {
  radiosGrupo.forEach((r) => { r.checked = r.value === valor; });
  $$('.grupo').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.grupo === valor)));
}

function grupoPorEdad(edad) {
  const r = radiosGrupo.find((x) => edad >= Number(x.dataset.min) && edad <= Number(x.dataset.max));
  return r ? r.value : '';
}

function edadNumero() {
  const v = campos.edad.value.trim();
  return /^\d{1,2}$/.test(v) ? Number(v) : NaN;
}

function soloDigitos(v) {
  let d = v.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('505')) d = d.slice(3);
  return d;
}

function formatoTelefono(d) {
  return `+505 ${d.slice(0, 4)} ${d.slice(4)}`;
}

// 4. Botones de grupo: preseleccionan y bajan al formulario
$$('.grupo').forEach((boton) => {
  boton.setAttribute('aria-pressed', 'false');
  boton.addEventListener('click', () => {
    grupoElegidoAMano = true;
    marcarGrupo(boton.dataset.grupo);
    notaGrupo.textContent = `Elegiste ${NOMBRES_GRUPO[boton.dataset.grupo]}.`;
    if (intentoEnviar) validar();
    seccionFormulario.scrollIntoView({ behavior: movimientoReducido.matches ? 'auto' : 'smooth', block: 'start' });
  });
});

radiosGrupo.forEach((r) => r.addEventListener('change', () => {
  grupoElegidoAMano = true;
  marcarGrupo(r.value);
  notaGrupo.textContent = '';
  if (intentoEnviar) validar();
}));

// Edad: muestra los datos del tutor y sugiere el grupo
campos.edad.addEventListener('input', () => {
  campos.edad.value = campos.edad.value.replace(/\D/g, '').slice(0, 2);
  const edad = edadNumero();
  const menor = !Number.isNaN(edad) && edad < 18;
  if (tutor.hidden === menor) {
    tutor.hidden = !menor;
    medir();
  }
  const sugerido = Number.isNaN(edad) ? '' : grupoPorEdad(edad);
  if (sugerido && sugerido !== grupoActual()) {
    const habiaOtro = grupoActual() !== '';
    marcarGrupo(sugerido);
    notaGrupo.textContent = habiaOtro && grupoElegidoAMano
      ? `Con ${edad} años te toca ${NOMBRES_GRUPO[sugerido]}; te lo cambiamos.`
      : '';
  }
  if (intentoEnviar) validar();
});

// Teléfonos: al salir del campo, quitar el +505 repetido y agrupar 4 + 4
[campos.whatsapp, campos.tutorWhatsapp].forEach((input) => input.addEventListener('blur', () => {
  const d = soloDigitos(input.value);
  if (d.length === 8) input.value = `${d.slice(0, 4)} ${d.slice(4)}`;
}));

['input', 'change'].forEach((tipo) => form.addEventListener(tipo, (e) => {
  if (intentoEnviar && e.target !== campos.edad) validar();
}));

function ponerError(control, idError, mensaje) {
  const p = document.getElementById(idError);
  if (mensaje) {
    p.textContent = mensaje;
    p.hidden = false;
    control.setAttribute('aria-invalid', 'true');
  } else {
    p.textContent = '';
    p.hidden = true;
    control.removeAttribute('aria-invalid');
  }
  return !mensaje;
}

function validar() {
  const errores = [];
  const revisar = (control, idError, mensaje) => {
    if (!ponerError(control, idError, mensaje)) errores.push(control);
  };

  revisar(campos.nombre, 'e-nombre',
    campos.nombre.value.trim().length < 2 ? 'Escribí tu nombre.' : '');

  const edad = edadNumero();
  let msjEdad = '';
  if (Number.isNaN(edad)) msjEdad = 'Escribí tu edad en números.';
  else if (edad < 9 || edad > 30) msjEdad = 'Los grupos son de 9 a 30 años. Escribinos por WhatsApp y vemos cómo ayudarte.';
  revisar(campos.edad, 'e-edad', msjEdad);

  revisar(campos.whatsapp, 'e-whatsapp',
    soloDigitos(campos.whatsapp.value).length !== 8 ? 'Revisá el número: son 8 dígitos, sin el +505.' : '');

  if (!ponerError(fieldsetGrupo, 'e-grupo', grupoActual() ? '' : 'Elegí tu grupo.')) {
    errores.push(radiosGrupo[0]);
  }

  if (!tutor.hidden) {
    revisar(campos.tutorNombre, 'e-tutor-nombre',
      campos.tutorNombre.value.trim().length < 2 ? 'Escribí el nombre de tu papá, mamá o tutor.' : '');
    revisar(campos.tutorWhatsapp, 'e-tutor-whatsapp',
      soloDigitos(campos.tutorWhatsapp.value).length !== 8 ? 'Revisá el número: son 8 dígitos, sin el +505.' : '');
    revisar(campos.consentimiento, 'e-consentimiento',
      campos.consentimiento.checked ? '' : 'Necesitamos que tu papá, mamá o tutor esté de acuerdo.');
  } else {
    ['tutorNombre', 'tutorWhatsapp', 'consentimiento'].forEach((k) => {
      ponerError(campos[k], `e-${k === 'tutorNombre' ? 'tutor-nombre' : k === 'tutorWhatsapp' ? 'tutor-whatsapp' : 'consentimiento'}`, '');
    });
  }

  return errores;
}

function datosInscripcion() {
  const edad = edadNumero();
  const grupo = NOMBRES_GRUPO[grupoActual()];
  const partes = [`Edad: ${edad}`];
  const colegio = campos.colegio.value.trim();
  if (colegio) partes.push(`Colegio/universidad: ${colegio}`);
  if (!tutor.hidden) {
    partes.push(`Tutor: ${campos.tutorNombre.value.trim()} (${formatoTelefono(soloDigitos(campos.tutorWhatsapp.value))})`);
    partes.push('Consentimiento del tutor: sí');
  }
  return {
    name: campos.nombre.value.trim(),
    phone: formatoTelefono(soloDigitos(campos.whatsapp.value)),
    interest: grupo,
    source: 'inscripciones',
    extra: partes.join(' · '),
    website: campos.website.value,
  };
}

function mensajeRespaldo(d) {
  return `Hola, quiero unirme a un grupo de vida de la JM.\nNombre: ${d.name}\nWhatsApp: ${d.phone}\nGrupo: ${d.interest}\n${d.extra.split(' · ').join('\n')}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  intentoEnviar = true;
  fallo.hidden = true;
  const errores = validar();
  if (errores.length) {
    errores[0].focus({ preventScroll: true });
    errores[0].closest('.campo, fieldset').scrollIntoView({ behavior: movimientoReducido.matches ? 'auto' : 'smooth', block: 'center' });
    return;
  }

  const datos = datosInscripcion();
  botonEnviar.setAttribute('aria-busy', 'true');
  botonEnviar.disabled = true;
  $('.boton-llama__texto', botonEnviar).textContent = 'Encendiendo…';

  try {
    const control = new AbortController();
    const espera = setTimeout(() => control.abort(), 12000);
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
      signal: control.signal,
    });
    clearTimeout(espera);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const cuerpo = await res.json().catch(() => ({}));
    form.hidden = true;
    $('#inscrito').hidden = false;
    medir();
    encender(typeof cuerpo.count === 'number' ? cuerpo.count : null);
  } catch {
    $('#fallo-whatsapp').href = enlaceWhatsapp(mensajeRespaldo(datos));
    fallo.hidden = false;
    botonEnviar.disabled = false;
    botonEnviar.removeAttribute('aria-busy');
    $('.boton-llama__texto', botonEnviar).textContent = 'Encender mi llama';
  }
});

/* -------------------------------------------------------------------------
   9. Éxito: la llama llena la pantalla y se suma a las demás
   ------------------------------------------------------------------------- */

const exito = $('#exito');
const campo = $('#exito-campo');

function sembrarLlamas(cantidad) {
  // Pseudoaleatorio con semilla: el mismo campo cada vez, sin amontonarse al centro
  let semilla = 7;
  const azar = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
  const frag = document.createDocumentFragment();
  for (let i = 0; i < cantidad; i += 1) {
    let x;
    let y;
    do {
      x = azar() * 100;
      y = 6 + azar() * 88;
    } while (x > 18 && x < 82 && y > 18 && y < 82); // deja libre el centro para el texto
    const t = 10 + azar() * 22;
    const el = document.createElement('div');
    el.className = 'mini';
    el.style.cssText = `left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;--t:${t.toFixed(0)}px;--o:${(0.35 + azar() * 0.6).toFixed(2)};--d:${(1.6 + azar() * 2.4).toFixed(2)}s;--r:${(-azar() * 3).toFixed(2)}s`;
    el.innerHTML = '<svg viewBox="0 0 100 160" aria-hidden="true" focusable="false"><use href="#llama-mini"/></svg>';
    frag.appendChild(el);
  }
  campo.replaceChildren(frag);
}

function encender(cuenta) {
  const cuentaP = $('#exito-cuenta');
  if (cuenta && cuenta > 0) {
    $('#exito-numero').textContent = new Intl.NumberFormat('es-NI').format(cuenta);
    cuentaP.hidden = false;
  }
  $('#compartir').href = `https://wa.me/?text=${encodeURIComponent(
    `Me inscribí en un grupo de vida de la JM de Schoenstatt. Nadie se enciende solo: sumate vos también. ${urlPagina}`,
  )}`;
  sembrarLlamas(Math.min(Math.max((cuenta || 0) - 1, 24), 56));

  ctaFija.classList.add('oculta');
  document.body.classList.add('bloqueado');
  exito.hidden = false;

  const listo = () => {
    exito.classList.remove('encendiendo');
    exito.classList.add('encendido');
    $('#exito-titulo').focus({ preventScroll: true });
  };

  if (movimientoReducido.matches || !llama.animate) {
    listo();
    return;
  }

  // La misma llama de la página pasa al frente y crece hasta llenar la pantalla
  // con su luz; después se apaga sobre la noche llena de llamas.
  exito.classList.add('encendiendo');
  llama.classList.remove('tenue');
  llama.classList.add('al-frente');
  const curva = 'cubic-bezier(0.77, 0, 0.175, 1)';
  llama.animate(
    [{ transform: llama.style.transform }, { transform: 'translate3d(-50%, 0, 0) scale(7)' }],
    { duration: 1100, easing: curva, fill: 'forwards' },
  ).finished.then(() => {
    listo();
    return llama.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, easing: 'ease', fill: 'forwards' }).finished;
  }).then(() => {
    llama.classList.remove('al-frente');
  }).catch(listo);
}

function cerrarExito() {
  exito.hidden = true;
  exito.classList.remove('encendido', 'encendiendo');
  document.body.classList.remove('bloqueado');
  llama.getAnimations().forEach((a) => a.cancel());
  llama.classList.remove('al-frente');
  pintarLlama();
  ctaFija.classList.toggle('oculta', formularioALaVista);
  $('#inscrito').setAttribute('tabindex', '-1');
  $('#inscrito').focus();
}

$('#exito-cerrar').addEventListener('click', cerrarExito);
exito.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarExito();
  if (e.key === 'Tab') {
    // Mantener el foco dentro del diálogo
    const focos = $$('a[href], button:not([disabled]), [tabindex="0"]', exito);
    const primero = focos[0];
    const ultimo = focos[focos.length - 1];
    if (e.shiftKey && (document.activeElement === primero || document.activeElement === $('#exito-titulo'))) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  }
});
