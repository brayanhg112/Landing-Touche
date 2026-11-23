/**
 * liquid-glass.js — Touche Essencielle · Visual Upgrade 1.1
 * Vidrio Líquido Translúcido para Navbar + Vitrina + Cards
 *
 * Estrategia correcta (corrección #1 y #2):
 *   - La distorsión SVG se aplica SOLO sobre una capa ::before detrás del contenido
 *     (pointer-events:none, z-index detrás), el texto/imágenes permanecen nítidos.
 *   - NO se anima baseFrequency en un loop JS. El filtro SVG es ESTÁTICO.
 *   - El "breathing" dinámico se implementa solo con CSS transform/opacity (GPU composited).
 *
 * Detección correcta (corrección #4):
 *   - `backdrop-filter: url(#id)` SOLO en Chromium (Chrome/Edge). Safari y Firefox
 *     quedan en el fallback -webkit-backdrop-filter: blur() puro.
 *
 * Cards .card-premium (sobre fondo claro):
 *   - Vidrio esmerilado: bg-white/75 + borde especular de cursor via JS
 *   - SIN distorsión de texto (corrección #1)
 */

(function () {
  'use strict';

  // ─── Detección de navegador ───────────────────────────────────────────────
  // Chromium: soporta backdrop-filter con url(#svgFilter)
  // Safari/Firefox: solo -webkit-backdrop-filter / backdrop-filter CSS nativo
  function isChromium() {
    return !!window.chrome && !navigator.userAgent.includes('Edg')
      ? true  // Chrome
      : navigator.userAgent.includes('Edg') && !!window.chrome; // Edge
  }

  function detectSupport() {
    const ua = navigator.userAgent;
    const isSafari   = /Safari/i.test(ua) && !/Chrome/i.test(ua);
    const isFirefox  = /Firefox/i.test(ua);
    const isChrome   = /Chrome/i.test(ua) && !/Edg/i.test(ua);
    const isEdge     = /Edg/i.test(ua);
    const chromium   = isChrome || isEdge;

    // backdrop-filter SVG url() solo funciona en Chromium
    const supportsSVGBackdrop = chromium && CSS.supports('backdrop-filter', 'blur(1px)');
    const supportsBackdrop    = CSS.supports('backdrop-filter', 'blur(1px)')
                             || CSS.supports('-webkit-backdrop-filter', 'blur(1px)');

    return { supportsSVGBackdrop, supportsBackdrop, isSafari, isFirefox, chromium };
  }

  // ─── Inyectar SVG filter ESTÁTICO en el DOM ───────────────────────────────
  // El filtro feTurbulence tiene baseFrequency FIJA → sin rasterización por frame.
  // Simula la refracción óptica real del vidrio (aberración en los bordes).
  function injectSVGFilter() {
    if (document.getElementById('tch-glass-svg')) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'tch-glass-svg';
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;';
    svg.innerHTML = `
      <defs>
        <!-- Filtro principal: distorsión de refracción estática en bordes del vidrio -->
        <filter id="tch-liquid-glass" x="-5%" y="-5%" width="110%" height="110%"
                color-interpolation-filters="linearRGB">
          <!-- Turbulencia estática: simula irregularidades ópticas del vidrio -->
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.025"
            numOctaves="3"
            seed="42"
            result="noise"/>
          <!-- Desplazamiento de refracción: solo en los bordes del elemento -->
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"/>
          <!-- Composite: recupera el centro nítido, solo deforma el borde -->
          <feComposite in="displaced" in2="SourceGraphic" operator="atop"/>
        </filter>

        <!-- Filtro suave para cards sobre fondo claro: solo blur leve de borde -->
        <filter id="tch-glass-soft" x="-2%" y="-2%" width="104%" height="104%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4"/>
        </filter>
      </defs>`;
    document.body.insertBefore(svg, document.body.firstChild);
  }

  // ─── CAPA DE VIDRIO (pseudo ::before vía elemento real) ───────────────────
  // Inserta un div posicionado absolutamente DETRÁS del contenido con z-index < 0.
  // El texto, imágenes y botones del elemento padre permanecen completamente nítidos.
  function createGlassLayer(el, options) {
    const {
      usesSVGBackdrop = false,
      blurValue = '24px',
      saturate = '1.6',
      extraStyles = '',
    } = options;

    // Aseguramos que el contenedor tenga position relativa para anclar la capa
    const pos = window.getComputedStyle(el).position;
    if (pos === 'static') el.style.position = 'relative';

    // Marcar para no duplicar
    if (el.dataset.glassLayer) return;
    el.dataset.glassLayer = '1';

    const layer = document.createElement('div');
    layer.className = 'tch-glass-layer';
    layer.setAttribute('aria-hidden', 'true');

    // Estilos base de la capa de vidrio (siempre detrás)
    layer.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      z-index: 0;
      /* Fallback universal: blur CSS compuesto en GPU */
      -webkit-backdrop-filter: blur(${blurValue}) saturate(${saturate});
      backdrop-filter: blur(${blurValue}) saturate(${saturate});
      /* Borde especular de vidrio líquido */
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.18),
        inset 0 -1px 0 rgba(109,40,217,0.12),
        inset 1px 0 0 rgba(255,255,255,0.08),
        inset -1px 0 0 rgba(75,0,130,0.10);
      ${extraStyles}
    `;

    // Solo en Chromium: añadir la refracción SVG sobre el backdrop
    if (usesSVGBackdrop) {
      layer.style.backdropFilter =
        `blur(${blurValue}) saturate(${saturate}) url(#tch-liquid-glass)`;
      layer.style.webkitBackdropFilter =
        `blur(${blurValue}) saturate(${saturate})`;
    }

    // El contenido real del padre debe estar por encima de esta capa
    // Forzamos z-index > 0 en los hijos directos de contenido del padre
    // usando una clase CSS inyectada (ver injectBaseCSS)
    el.classList.add('tch-glass-host');

    // Insertar como primer hijo (quedará detrás gracias al z-index)
    el.insertBefore(layer, el.firstChild);
    return layer;
  }

  // ─── CSS base inyectado una sola vez ──────────────────────────────────────
  function injectBaseCSS() {
    if (document.getElementById('tch-glass-css')) return;
    const style = document.createElement('style');
    style.id = 'tch-glass-css';
    style.textContent = `
      /* Garantiza que el contenido del host esté siempre sobre la capa de vidrio */
      .tch-glass-host > *:not(.tch-glass-layer) {
        position: relative;
        z-index: 1;
      }

      /* El header usa z-50 de Tailwind — sus hijos directos de contenido
         deben estar por encima de la capa de vidrio (z:0) pero no romper
         el stacking context del propio header */
      #glass-header > *:not(.tch-glass-layer) {
        position: relative;
        z-index: 2;
      }

      /* Breathing del borde especular: solo opacity/transform — 100% GPU composited */
      @keyframes tch-glass-breathe {
        0%, 100% {
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.18),
            inset 0 -1px 0 rgba(109,40,217,0.12),
            inset 1px 0 0 rgba(255,255,255,0.08),
            inset -1px 0 0 rgba(75,0,130,0.10);
        }
        50% {
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.28),
            inset 0 -1.5px 0 rgba(109,40,217,0.22),
            inset 1.5px 0 0 rgba(255,255,255,0.14),
            inset -1.5px 0 0 rgba(75,0,130,0.18);
        }
      }

      /* Respeta prefers-reduced-motion */
      @media (prefers-reduced-motion: no-preference) {
        .tch-glass-breathe {
          animation: tch-glass-breathe 6s ease-in-out infinite;
        }
      }

      /* ─── Navbar: la capa de vidrio ocupa todo el header ─── */
      #glass-header {
        /* Neutralizamos el backdrop-filter inline del .glass-nav porque
           ahora lo gestiona la capa dedicada. El background se mantiene. */
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
      /* Preservamos el background original del .glass-nav */
      #glass-header .tch-glass-layer {
        background: rgba(13, 11, 16, 0.6);
        transition: background 0.4s ease, box-shadow 0.4s ease;
      }
      #glass-header.scrolled .tch-glass-layer {
        background: rgba(13, 11, 16, 0.92);
        box-shadow:
          0 12px 48px rgba(0,0,0,0.5),
          inset 0 1.5px 0 rgba(255,255,255,0.22),
          inset 0 -1px 0 rgba(109,40,217,0.14);
      }

      /* ─── Vitrina (tarjeta Hero columna derecha) ─── */
      .tch-vitrina-glass .tch-glass-layer {
        background: rgba(13, 11, 16, 0.65);
        border-radius: inherit;
      }

      /* ─── Cards Premium sobre fondo claro ─── */
      /* Vidrio esmerilado: fondo blanco/75 + specular borde sutil */
      .card-premium.tch-glass-host .tch-glass-layer {
        background: rgba(255, 255, 255, 0.72);
        -webkit-backdrop-filter: blur(12px) saturate(1.4);
        backdrop-filter: blur(12px) saturate(1.4);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.90),
          inset 0 -1px 0 rgba(109,40,217,0.08),
          0 4px 24px rgba(109,40,217,0.06);
      }

      /* Efecto specular de cursor en cards (activado por JS con custom property) */
      .card-premium.tch-glass-host {
        --cursor-x: 50%;
        --cursor-y: 50%;
      }
      .card-premium.tch-glass-host .tch-glass-layer::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: radial-gradient(
          120px circle at var(--cursor-x) var(--cursor-y),
          rgba(255,255,255,0.22) 0%,
          transparent 70%
        );
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .card-premium.tch-glass-host:hover .tch-glass-layer::after {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Specular de cursor para .card-premium ────────────────────────────────
  function bindCardCursorSpecular(card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
      card.style.setProperty('--cursor-x', x);
      card.style.setProperty('--cursor-y', y);
    }, { passive: true });
  }

  // ─── Aplicar vidrio líquido al Navbar ─────────────────────────────────────
  function applyNavbarGlass(support) {
    const header = document.getElementById('glass-header');
    if (!header) return;

    // Reducir movimiento: solo blur CSS, sin capa extra
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    createGlassLayer(header, {
      usesSVGBackdrop: support.supportsSVGBackdrop,
      blurValue: '24px',
      saturate: '1.6',
    });

    // Breathing del borde solo en no-reduced-motion
    const layer = header.querySelector('.tch-glass-layer');
    if (layer) layer.classList.add('tch-glass-breathe');
  }

  // ─── Aplicar vidrio a la tarjeta Vitrina (Hero columna derecha) ───────────
  function applyVitrinaGlass(support) {
    // #vitrina-card: tarjeta interna del slider de GIFs (ya tiene backdrop-blur-2xl)
    // La capa de vidrio refuerza el efecto con refracción especular en bordes.
    const vitrina = document.getElementById('vitrina-card');
    if (!vitrina) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // La vitrina ya tiene 'overflow-hidden' → la capa de vidrio respeta border-radius
    vitrina.classList.add('tch-vitrina-glass');
    createGlassLayer(vitrina, {
      usesSVGBackdrop: support.supportsSVGBackdrop,
      blurValue: '20px',
      saturate: '1.5',
      // Fondo translúcido complementario (la tarjeta ya tiene bg-white/10)
      extraStyles: 'background: rgba(255,255,255,0.04);',
    });
  }

  // ─── Aplicar vidrio a las cards del catálogo ─────────────────────────────
  function applyCardGlass(support) {
    const cards = document.querySelectorAll('.card-premium');
    if (!cards.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    cards.forEach(function (card) {
      // Cards sobre fondo claro: solo esmerilado, sin SVG (corrección #1)
      createGlassLayer(card, {
        usesSVGBackdrop: false, // nunca SVG en cards de texto
        blurValue: '12px',
        saturate: '1.4',
      });

      // Specular de cursor solo con motion habilitado
      if (!reducedMotion) {
        bindCardCursorSpecular(card);
      }
    });
  }

  // ─── Inicialización ───────────────────────────────────────────────────────
  function init() {
    const support = detectSupport();

    // Inyectar SVG filter estático (una sola vez)
    injectSVGFilter();

    // Inyectar CSS base
    injectBaseCSS();

    // Aplicar efectos
    applyNavbarGlass(support);
    applyVitrinaGlass(support);
    applyCardGlass(support);
  }

  // ─── Punto de entrada — post DOMContentLoaded, no bloqueante ──────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
