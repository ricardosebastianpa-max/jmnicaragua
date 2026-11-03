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

const form = $('#formulario');
if (form) {
  const NOMBRES = { cruzados: 'Cruzados de María', pioneros: 'Pioneros', universitarios: 'Universitarios' };
  const c = (id) => document.getElementById(id);
  const campos = {
    nombre: c('f-nombre'), whatsapp: c('f-whatsapp'), colegio: c('f-colegio'),
    tutorNombre: c('f-tutor-nombre'), tutorWhatsapp: c('f-tutor-whatsapp'),
    consentimiento: c('f-consentimiento'), website: c('f-website'),
  };
  const tutor = c('tutor');
  const bloqueJoven = c('bloque-whatsapp-joven');
  const enviar = c('enviar');
  const fallo = c('fallo');
  let intento = false;

  const valor = (name) => (form.querySelector(`input[name="${name}"]:checked`) || {}).value || '';
  const digitos = (v) => { let d = v.replace(/\D/g, ''); if (d.length === 11 && d.startsWith('505')) d = d.slice(3); return d; };
  const formato = (d) => `+505 ${d.slice(0, 4)} ${d.slice(4)}`;

  // Preseleccionar etapa desde los enlaces "Inscribirme en …"
  $$('[data-etapa]').forEach((a) => a.addEventListener('click', () => {
    const r = form.querySelector(`input[name="etapa"][value="${a.dataset.etapa}"]`);
    if (r) { r.checked = true; ajustar(); }
  }));
  $$('[data-quien]').forEach((a) => a.addEventListener('click', () => {
    const r = form.querySelector(`input[name="quien"][value="${a.dataset.quien}"]`);
    if (r) { r.checked = true; ajustar(); }
  }));

  function ajustar() {
    const quien = valor('quien') || 'joven';
    const etapa = valor('etapa');
    const menor = etapa === 'cruzados' || etapa === 'pioneros';
    const papa = quien === 'papa';

    // Etiquetas según quién llena el formulario
    c('l-nombre').textContent = papa ? 'Nombre y apellido de tu hijo' : 'Tu nombre y apellido';
    c('l-colegio').firstChild.textContent = etapa === 'universitarios' ? 'Universidad ' : 'Colegio ';
    c('t-tutor').textContent = papa ? 'Tus datos, para que te escribamos' : 'Datos de tu papá, mamá o tutor';
    c('l-tutor-nombre').textContent = papa ? 'Tu nombre y apellido' : 'Nombre de tu papá, mamá o tutor';
    c('l-tutor-whatsapp').textContent = papa ? 'Tu WhatsApp' : 'Su WhatsApp';
    c('l-consentimiento').textContent = papa
      ? 'Soy su papá, mamá o tutor y autorizo que se inscriba y que la JM me escriba por WhatsApp.'
      : 'Mi papá, mamá o tutor sabe de esta inscripción, está de acuerdo y acepta que la JM le escriba por WhatsApp.';
    c('t-enviar').textContent = papa ? 'Inscribir a mi hijo' : 'Quiero unirme';

    // Tutor: obligatorio para primaria y secundaria, o si llena un papá
    tutor.hidden = !(menor || papa);
    // WhatsApp del joven: solo cuando llena él mismo
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

    r(c('f-etapa'), 'e-etapa', etapa ? '' : 'Elegí la etapa: primaria, secundaria o universidad.', form.querySelector('input[name="etapa"]'));
    r(campos.nombre, 'e-nombre', campos.nombre.value.trim().length < 2 ? (papa ? 'Escribí el nombre de tu hijo.' : 'Escribí tu nombre.') : '');

    if (!papa) {
      const d = digitos(campos.whatsapp.value);
      const obligatorio = !menor;
      r(campos.whatsapp, 'e-whatsapp', (obligatorio && d.length !== 8) || (d.length > 0 && d.length !== 8) ? 'Revisá el número: son 8 dígitos, sin el +505.' : '');
    } else marcar(campos.whatsapp, 'e-whatsapp', '');

    if (!tutor.hidden) {
      r(campos.tutorNombre, 'e-tutor-nombre', campos.tutorNombre.value.trim().length < 2 ? (papa ? 'Escribí tu nombre.' : 'Escribí el nombre de tu papá, mamá o tutor.') : '');
      r(campos.tutorWhatsapp, 'e-tutor-whatsapp', digitos(campos.tutorWhatsapp.value).length !== 8 ? 'Revisá el número: son 8 dígitos, sin el +505.' : '');
      r(campos.consentimiento, 'e-consentimiento', campos.consentimiento.checked ? '' : 'Falta la autorización del papá, mamá o tutor.');
    } else {
      ['tutorNombre', 'tutorWhatsapp', 'consentimiento'].forEach((k) => marcar(campos[k], `e-${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`, ''));
    }
    return errores;
  }

  function datos() {
    const etapa = valor('etapa');
    const papa = valor('quien') === 'papa';
    const extra = [`Llena: ${papa ? 'papá/mamá/tutor' : 'el joven'}`];
    const colegio = campos.colegio.value.trim();
    if (colegio) extra.push(`Colegio/universidad: ${colegio}`);
    const dJoven = digitos(campos.whatsapp.value);
    if (!tutor.hidden) {
      extra.push(`Tutor: ${campos.tutorNombre.value.trim()} (${formato(digitos(campos.tutorWhatsapp.value))})`);
      extra.push('Autorización del tutor: sí');
    }
    return {
      name: campos.nombre.value.trim(),
      phone: dJoven.length === 8 ? formato(dJoven) : formato(digitos(campos.tutorWhatsapp.value)),
      interest: NOMBRES[etapa],
      source: 'inscripciones',
      extra: extra.join(' · '),
      website: campos.website.value,
    };
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    intento = true;
    fallo.hidden = true;
    const errores = validar();
    if (errores.length) {
      errores[0].focus({ preventScroll: true });
      errores[0].closest('.campo, fieldset').scrollIntoView({ behavior: reducido.matches ? 'auto' : 'smooth', block: 'center' });
      return;
    }
    const d = datos();
    enviar.setAttribute('aria-busy', 'true'); enviar.disabled = true;
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 12000);
      const res = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d), signal: ctrl.signal });
      clearTimeout(t);
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      const listo = c('listo');
      listo.hidden = false;
      c('compartir').href = `https://wa.me/?text=${encodeURIComponent(`Me uní a un grupo de vida de la JM Schoenstatt Nicaragua. Ite, incendite mundum: ${location.origin}/`)}`;
      c('listo-titulo').focus();
    } catch {
      c('fallo-whatsapp').href = wa(`Hola, quiero unirme a la JM.\nNombre: ${d.name}\nEtapa: ${d.interest}\nWhatsApp: ${d.phone}\n${d.extra.split(' · ').join('\n')}`);
      fallo.hidden = false;
      enviar.disabled = false; enviar.removeAttribute('aria-busy');
    }
  });

  ajustar();
}
