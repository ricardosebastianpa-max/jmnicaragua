/* =========================================================================
   JM Schoenstatt Nicaragua · comportamiento del sitio (sin librerías)
   ========================================================================= */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const limitar = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const reducido = window.matchMedia('(prefers-reduced-motion: reduce)');

// Contacto fijo (también en /content.json)
let WHATSAPP = '50582344190';
const wa = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
const MENSAJE = 'Hola, quiero saber más de los grupos de vida de la JM Schoenstatt Nicaragua.';

function enlazarWhatsapp() {
  $$('[data-whatsapp]').forEach((a) => { a.href = wa(a.dataset.whatsapp || MENSAJE); });
}
enlazarWhatsapp();

/* ---------- Datos por confirmar: /content.json ---------- */

fetch('/content.json', { cache: 'no-cache' })
  .then((r) => (r.ok ? r.json() : null))
  .then((datos) => {
    if (!datos) return;
    if (datos.contacto && /^\d{8,}$/.test(datos.contacto.whatsapp || '')) {
      WHATSAPP = datos.contacto.whatsapp;
      enlazarWhatsapp();
    }
    $$('[data-pendiente]').forEach((el) => {
      const p = datos.pendientes && datos.pendientes[el.dataset.pendiente];
      if (!p) return;
      if (p.texto) {
        el.textContent = p.texto;
        el.classList.add('confirmado');
      } else {
        el.textContent = p.etiqueta;
      }
    });
  })
  .catch(() => {});

/* ---------- La mecha: una llama que baja y crece con la lectura ---------- */

const mecha = $('.mecha');
if (mecha) {
  const fuego = $('.mecha__fuego', mecha);
  const llama = $('.mecha__llama', mecha);
  let pendiente = false;
  const pintar = () => {
    pendiente = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? limitar(window.scrollY / max) : 0;
    const alto = window.innerHeight;
    fuego.style.transform = `scaleY(${p.toFixed(4)})`;
    const escala = 0.55 + p * 0.9;
    llama.style.transform = `translate3d(0, ${(p * alto - 34 * escala).toFixed(1)}px, 0) scale(${escala.toFixed(3)})`;
  };
  const pedir = () => { if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); } };
  window.addEventListener('scroll', pedir, { passive: true });
  window.addEventListener('resize', pedir, { passive: true });
  pintar();
}

/* ---------- Apariciones escalonadas ---------- */

const reveladores = $$('[data-revela]');
reveladores.forEach((g) => Array.from(g.children).forEach((c, i) => c.style.setProperty('--i', i)));
if ('IntersectionObserver' in window && !reducido.matches) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
  reveladores.forEach((el) => io.observe(el));
} else {
  reveladores.forEach((el) => el.classList.add('visible'));
}

/* ---------- Línea de tiempo: se recorre y se va encendiendo ---------- */

$$('.linea-tiempo').forEach((lt) => {
  const pista = $('.linea-tiempo__pista', lt);
  const avance = $('.linea-tiempo__avance', lt);
  const [atras, adelante] = $$('.linea-tiempo__boton', lt);
  const actualizar = () => {
    const max = pista.scrollWidth - pista.clientWidth;
    const p = max > 0 ? pista.scrollLeft / max : 1;
    avance.style.transform = `scaleX(${(0.08 + 0.92 * p).toFixed(4)})`;
    if (atras) atras.disabled = pista.scrollLeft < 4;
    if (adelante) adelante.disabled = pista.scrollLeft > max - 4;
  };
  const paso = () => ($('.hito', pista)?.getBoundingClientRect().width || 300);
  const mover = (d) => pista.scrollBy({ left: d * paso(), behavior: reducido.matches ? 'auto' : 'smooth' });
  atras?.addEventListener('click', () => mover(-1));
  adelante?.addEventListener('click', () => mover(1));
  pista.addEventListener('scroll', () => requestAnimationFrame(actualizar), { passive: true });
  window.addEventListener('resize', actualizar, { passive: true });
  actualizar();
});

/* ---------- Botón fijo: se esconde en la portada y en Unite ---------- */

const cta = $('.cta-fija');
const unite = $('#unite');
const apertura = $('.apertura');
if (cta && unite && 'IntersectionObserver' in window) {
  const visibles = new Set();
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
    cta.classList.toggle('oculta', visibles.size > 0);
  }, { threshold: 0.15 });
  io.observe(unite);
  if (apertura) io.observe(apertura);
}

/* =========================================================================
   Formulario de inscripción
   ========================================================================= */

/* ---------- Intro: lema, fuego y revelado ---------- */

const intro = $('#intro');
if (intro && document.documentElement.classList.contains('con-intro')) {
  try { sessionStorage.setItem('jm-intro', '1'); } catch (e) {}
  const terminar = (salteada) => {
    if (intro.classList.contains('fin')) return;
    intro.classList.add('fin');
    if (salteada) document.documentElement.classList.add('intro-salteada');
    document.documentElement.classList.remove('con-intro');
    const v = $('video', intro); if (v) v.pause();
  };
  $('#intro-saltar')?.addEventListener('click', () => terminar(true));
  intro.addEventListener('click', () => terminar(true));
  setTimeout(() => terminar(false), 5300);
}

/* ---------- Secciones que se animan al entrar ---------- */

if ('IntersectionObserver' in window) {
  const ioSec = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); ioSec.unobserve(e.target); }
  }), { threshold: 0.35 });
  $$('.unidad').forEach((el) => ioSec.observe(el));
} else { $$('.unidad').forEach((el) => el.classList.add('visible')); }

/* =========================================================================
   Formulario: arma un mensaje y lo abre en WhatsApp
   ========================================================================= */

const form = $('#formulario');
if (form) {
  const NOMBRES = { cruzados: 'Cruzados', pioneros: 'Pioneros', universitarios: 'Universitarios' };
  const c = (id) => document.getElementById(id);
  const campos = {
    nombre: c('f-nombre'), whatsapp: c('f-whatsapp'), colegio: c('f-colegio'),
    tutorNombre: c('f-tutor-nombre'), tutorWhatsapp: c('f-tutor-whatsapp'), consentimiento: c('f-consentimiento'),
  };
  const tutor = c('tutor');
  const bloqueJoven = c('bloque-whatsapp-joven');
  let intento = false;

  const valor = (name) => (form.querySelector(`input[name="${name}"]:checked`) || {}).value || '';
  const digitos = (v) => { let d = v.replace(/\D/g, ''); if (d.length === 11 && d.startsWith('505')) d = d.slice(3); return d; };
  const formato = (d) => `+505 ${d.slice(0, 4)} ${d.slice(4)}`;

  $$('[data-etapa]').forEach((a) => a.addEventListener('click', () => {
    const r = form.querySelector(`input[name="etapa"][value="${a.dataset.etapa}"]`);
    if (r) { r.checked = true; ajustar(); }
  }));
  $$('[data-quien]').forEach((a) => a.addEventListener('click', () => {
    const r = form.querySelector(`input[name="quien"][value="${a.dataset.quien}"]`);
    if (r) { r.checked = true; ajustar(); }
  }));

  function ajustar() {
    const papa = valor('quien') === 'papa';
    const etapa = valor('etapa');
    const menor = etapa === 'cruzados' || etapa === 'pioneros';
    c('l-nombre').textContent = papa ? 'Nombre y apellido de tu hijo' : 'Tu nombre y apellido';
    c('l-colegio').firstChild.textContent = etapa === 'universitarios' ? 'Universidad ' : 'Colegio ';
    c('t-tutor').textContent = papa ? 'Tus datos' : 'Datos de tu papá, mamá o tutor';
    c('l-tutor-nombre').textContent = papa ? 'Tu nombre y apellido' : 'Nombre de tu papá, mamá o tutor';
    c('l-tutor-whatsapp').textContent = papa ? 'Tu WhatsApp' : 'Su WhatsApp';
    c('l-consentimiento').textContent = papa ? 'Soy su papá, mamá o tutor y autorizo que se una a la JM.' : 'Mi papá, mamá o tutor sabe de esta inscripción y está de acuerdo.';
    tutor.hidden = !(menor || papa);
    bloqueJoven.hidden = papa;
    c('ayuda-whatsapp').textContent = menor ? 'Opcional si todavía no tenés celular.' : 'Número de Nicaragua, 8 dígitos.';
    if (intento) validar();
  }

  form.addEventListener('change', (e) => { if (e.target.name === 'quien' || e.target.name === 'etapa') ajustar(); else if (intento) validar(); });
  form.addEventListener('input', () => { if (intento) validar(); });
  [campos.whatsapp, campos.tutorWhatsapp].forEach((i) => i.addEventListener('blur', () => {
    const d = digitos(i.value); if (d.length === 8) i.value = `${d.slice(0, 4)} ${d.slice(4)}`;
  }));

  function marcar(control, id, msj) {
    const p = c(id);
    p.hidden = !msj; p.textContent = msj || '';
    if (msj) control.setAttribute('aria-invalid', 'true'); else control.removeAttribute('aria-invalid');
    return !msj;
  }

  function validar() {
    const errores = [];
    const r = (ctrl, id, m, foco = ctrl) => { if (!marcar(ctrl, id, m)) errores.push(foco); };
    const etapa = valor('etapa');
    const papa = valor('quien') === 'papa';
    const menor = etapa === 'cruzados' || etapa === 'pioneros';
    r(c('f-etapa'), 'e-etapa', etapa ? '' : 'Elegí el grupo: primaria, secundaria o universidad.', form.querySelector('input[name="etapa"]'));
    r(campos.nombre, 'e-nombre', campos.nombre.value.trim().length < 2 ? (papa ? 'Escribí el nombre de tu hijo.' : 'Escribí tu nombre.') : '');
    if (!papa) {
      const d = digitos(campos.whatsapp.value);
      r(campos.whatsapp, 'e-whatsapp', (!menor && d.length !== 8) || (d.length > 0 && d.length !== 8) ? 'Revisá el número: son 8 dígitos, sin el +505.' : '');
    } else marcar(campos.whatsapp, 'e-whatsapp', '');
    if (!tutor.hidden) {
      r(campos.tutorNombre, 'e-tutor-nombre', campos.tutorNombre.value.trim().length < 2 ? (papa ? 'Escribí tu nombre.' : 'Escribí el nombre de tu papá, mamá o tutor.') : '');
      r(campos.tutorWhatsapp, 'e-tutor-whatsapp', digitos(campos.tutorWhatsapp.value).length !== 8 ? 'Revisá el número: son 8 dígitos, sin el +505.' : '');
      r(campos.consentimiento, 'e-consentimiento', campos.consentimiento.checked ? '' : 'Falta que tu papá, mamá o tutor esté de acuerdo.');
    } else {
      marcar(campos.tutorNombre, 'e-tutor-nombre', ''); marcar(campos.tutorWhatsapp, 'e-tutor-whatsapp', ''); marcar(campos.consentimiento, 'e-consentimiento', '');
    }
    return errores;
  }

  function mensaje() {
    const papa = valor('quien') === 'papa';
    const rama = NOMBRES[valor('etapa')];
    const nombre = campos.nombre.value.trim();
    const colegio = campos.colegio.value.trim();
    const dJoven = digitos(campos.whatsapp.value);
    const lineas = [];
    if (papa) {
      lineas.push(`Hola, soy ${campos.tutorNombre.value.trim()}, papá/mamá de ${nombre}.`);
      lineas.push(`Mi número es ${formato(digitos(campos.tutorWhatsapp.value))}.`);
      if (colegio) lineas.push(`Mi hijo estudia en ${colegio}.`);
      lineas.push(`Quiero que se una a ${rama}.`);
    } else {
      lineas.push(`Hola, soy ${nombre}.`);
      if (dJoven.length === 8) lineas.push(`Mi número es ${formato(dJoven)}.`);
      if (colegio) lineas.push(`Estudio en ${colegio}.`);
      lineas.push(`Me quiero unir a ${rama}.`);
      if (!tutor.hidden) lineas.push(`Mi papá/mamá: ${campos.tutorNombre.value.trim()}, ${formato(digitos(campos.tutorWhatsapp.value))}. Está de acuerdo.`);
    }
    return lineas.join('\n');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    intento = true;
    const errores = validar();
    if (errores.length) {
      errores[0].focus({ preventScroll: true });
      errores[0].closest('.campo, fieldset').scrollIntoView({ behavior: reducido.matches ? 'auto' : 'smooth', block: 'center' });
      return;
    }
    const url = wa(mensaje());
    form.hidden = true;
    c('listo').hidden = false;
    c('listo-reabrir').href = url;
    c('compartir').href = `https://wa.me/?text=${encodeURIComponent(`Unite conmigo a la JM Schoenstatt Nicaragua: ${location.origin}/`)}`;
    c('listo-titulo').focus();
    window.location.href = url;
  });

  ajustar();
}
