document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. CUSTOM CURSOR (Desktop only)
    // =========================================================================
    if (window.matchMedia("(pointer: fine)").matches) {
        if (!document.getElementById('cursorDot')) {
            const dot = document.createElement('div');
            dot.id = 'cursorDot'; dot.className = 'cursor-dot';
            document.body.appendChild(dot);
        }
        if (!document.getElementById('cursorRing')) {
            const ring = document.createElement('div');
            ring.id = 'cursorRing'; ring.className = 'cursor-ring';
            document.body.appendChild(ring);
        }

        const cursorDot = document.getElementById('cursorDot');
        const cursorRing = document.getElementById('cursorRing');
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            dotX += (mouseX - dotX) * 0.2;
            dotY += (mouseY - dotY) * 0.2;
            ringX += (mouseX - ringX) * 0.1;
            ringY += (mouseY - ringY) * 0.1;
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const bindHoverStates = () => {
            document.querySelectorAll('a, button, input, textarea, select, .stage-card, .hover-lift, .chip-select, .accordion-trigger, .age-option, .team-card').forEach(el => {
                if (!el.dataset.cursorBound) {
                    el.addEventListener('mouseenter', () => {
                        cursorDot.classList.add('hovered');
                        cursorRing.classList.add('hovered');
                    });
                    el.addEventListener('mouseleave', () => {
                        cursorDot.classList.remove('hovered');
                        cursorRing.classList.remove('hovered');
                    });
                    el.dataset.cursorBound = "true";
                }
            });
        };
        bindHoverStates();
        setTimeout(bindHoverStates, 1500);
    }

    // =========================================================================
    // 2. INTERSECTION OBSERVER — Scroll Reveal Animations
    // =========================================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.grid-editorial, .grid-3-split, .grid-4-split, .stage-card, .rhythm-card, ' +
        '.event-row, .fast-form, .team-member, .team-card, .flow-step, .gallery-item, ' +
        '.section-title, .section-text, .rhythm-alive, .resource-section, .timeline-item, ' +
        '.leader-module, .accordion-item, .event-card, [class*="section-pad"] > div'
    ).forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    // =========================================================================
    // 3. LAZY LOADING — Add loading="lazy" to all images that don't have it
    // =========================================================================
    document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // =========================================================================
    // 4. CHIP SELECT — Toggle active chip on click (form UX)
    // =========================================================================
    document.querySelectorAll('.chip-select').forEach(chip => {
        chip.addEventListener('click', () => {
            chip.parentElement.querySelectorAll('.chip-select').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });

    // =========================================================================
    // 5. ACCORDION — Toggle expandable sections
    // =========================================================================
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.accordion-item');
            const isOpen = item.classList.contains('open');
            
            // Optional: close other items in same group
            const parent = item.parentElement;
            if (parent) {
                parent.querySelectorAll('.accordion-item.open').forEach(openItem => {
                    if (openItem !== item) openItem.classList.remove('open');
                });
            }
            
            item.classList.toggle('open', !isOpen);
        });
    });

    // =========================================================================
    // 6. FORM SUBMISSION — Netlify Functions API + WhatsApp fallback
    // =========================================================================
    document.querySelectorAll('form[action="#"]').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            const inputs = form.querySelectorAll('.form-input');
            const chipActive = form.closest('.fast-form, .form-side, .section-pad-large, .section-pad, section')
                ?.querySelector('.chip-select.active');

            btn.innerHTML = '<span style="opacity:0.7;">Enviando...</span>';
            btn.disabled = true;

            // Detect source page
            const page = document.title.toLowerCase();
            let source = 'website';
            if (page.includes('cruzados')) source = 'cruzados';
            else if (page.includes('pioneros')) source = 'pioneros';
            else if (page.includes('universitarios')) source = 'universitarios';
            else if (page.includes('dar el paso')) source = 'dar-el-paso';
            else if (page.includes('inicio')) source = 'homepage';

            // Build submission data
            const data = { source };
            const inputArr = Array.from(inputs);
            if (inputArr[0]) data.name = inputArr[0].value;
            if (inputArr[1]) data.extra = inputArr[1].value;
            if (inputArr.length > 2 && inputArr[2]) data.phone = inputArr[2].value;
            else if (inputArr[1] && inputArr[1].type === 'tel') { data.phone = inputArr[1].value; data.extra = ''; }
            if (chipActive) data.interest = chipActive.textContent;

            fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    btn.innerHTML = '✓ Mensaje enviado';
                    btn.style.backgroundColor = '#25D366';
                    btn.style.borderColor = '#25D366';
                    inputs.forEach(i => i.value = '');
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        btn.style.backgroundColor = '';
                        btn.style.borderColor = '';
                    }, 4000);
                } else {
                    throw new Error('Submit failed');
                }
            })
            .catch(() => {
                // WhatsApp fallback
                let waMsg = '¡Hola! Quiero unirme a la JM.%0A%0A';
                inputs.forEach(input => {
                    if (input.value.trim()) {
                        waMsg += `${input.placeholder}: ${input.value}%0A`;
                    }
                });
                if (chipActive) waMsg += `Interés: ${chipActive.textContent}%0A`;

                // Try to get WhatsApp from settings API, fallback to default
                fetch('/api/public/settings').then(r => r.json()).then(s => {
                    const wa = (s && s.whatsapp) ? s.whatsapp.replace('+','') : '50500000000';
                    window.open(`https://wa.me/${wa}?text=${waMsg}`, '_blank');
                }).catch(() => {
                    window.open(`https://wa.me/50500000000?text=${waMsg}`, '_blank');
                });

                btn.innerHTML = '↗ Abierto en WhatsApp';
                btn.style.backgroundColor = '#25D366';
                btn.style.borderColor = '#25D366';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                }, 4000);
            });
        });
    });

    // =========================================================================
    // 6b. DYNAMIC DATA — Load managed content from API (graceful degradation)
    // =========================================================================
    function loadDynamicEvents() {
        const carousel = document.querySelector('.event-carousel');
        if (!carousel || !document.getElementById('home-hero')) return; // Only on homepage

        fetch('/api/public/events')
            .then(r => r.json())
            .then(events => {
                if (!events || !events.length) return;
                const featured = events.filter(e => e.featured).slice(0, 4);
                const display = featured.length ? featured : events.slice(0, 4);

                carousel.innerHTML = display.map(ev => {
                    const typeLabels = { encuentro: 'ENCUENTRO', retiro: 'RETIRO', mision: 'MISIONES', 'noche-mater': 'NOCHE MATER', otro: '' };
                    const chipStyle = ev.featured
                        ? 'color: var(--old-gold); border-color: rgba(210,168,86,0.3);'
                        : 'border-color: var(--surface-border);';
                    return `<div class="event-card">
                        <div class="img-placeholder" style="height: 160px; border-radius: 12px 12px 0 0;"></div>
                        <div class="event-card-body">
                            <span class="chip" style="${chipStyle} font-size: 0.65rem; padding: 2px 8px;">${typeLabels[ev.type] || ''}</span>
                            <h4>${escHTML(ev.title)}</h4>
                            <p>${escHTML(ev.description || '')}</p>
                        </div>
                    </div>`;
                }).join('');
            })
            .catch(() => {}); // Silent fail — static content remains
    }

    function escHTML(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    loadDynamicEvents();

    // =========================================================================
    // 7. LUCIDE ICONS — Initialize if loaded
    // =========================================================================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
