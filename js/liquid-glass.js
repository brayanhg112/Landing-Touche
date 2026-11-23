/**
 * liquid-glass.js — Touche Essencielle · Visual Upgrade 1.1 (rev 2)
 * Vidrio Líquido Translúcido para Navbar + Vitrina + Cards
 *
 * Fix 1 — #vitrina-card:
 *   • La capa glass NUNCA se inserta en el flujo flex. Siempre position:absolute,
 *     inset:0, z-index:0, pointer-events:none. El contenido existente no se toca.
 *   • #vitrina-card usa su propio tratamiento: solo backdrop CSS (sin SVG filter)
 *     para evitar el fondo gris opaco al coexistir con el <video> del Hero.
 *   • Los botones prevSize/nextSize tienen z-40 en HTML → permanecen visibles.
 *
 * Fix 2 — baseFrequency no se anima en loop JS. Filtro SVG 100% estático.
 *
 * Fix 3 — console.info de modo activo para DevTools.
 *
 * Fix 4 — Detección Chromium correcta para backdrop-filter: url(#id).
 */

(function () {
  'use strict';

  // ─── Detección de navegador ───────────────────────────────────────────────
  function detectSupport() {
    const ua = navigator.userAgent;
    const isChrome  = /Chrome\//.test(ua) && !/Edg\//.test(ua) && !/OPR\//.test(ua);
    const isEdge    = /Edg\//.test(ua);
    const chromium  = isChrome || isEdge;

    // backdrop-filter: url(#id) → SOLO Chromium real (no Safari, no Firefox)
    const supportsSVGBackdrop = chromium && CSS.supports('backdrop-filter', 'blur(1px)');
    const supportsBackdrop    = CSS.supports('backdrop-filter', 'blur(1px)')
                             || CSS.supports('-webkit-backdrop-filter', 'blur(1px)');

    return { supportsSVGBackdrop, supportsBackdrop, chromium };
  }

  // ─── Inyectar SVG filter ESTÁTICO ────────────────────────────────────────
  // baseFrequency FIJA → cero rasterización por frame → 60fps seguros en móvil.
  function injectSVGFilter() {
    if (document.getElementById('tch-glass-svg')) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'tch-glass-svg';
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;';
    svg.innerHTML = `
      <defs>
        <filter id="tch-liquid-glass" x="-5%" y="-5%" width="110%" height="110%"
                color-interpolation-filters="linearRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.025"
            numOctaves="3" seed="42" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4"
            xChannelSelector="R" yChannelSelector="G" result="displaced"/>
          <feComposite in="displaced" in2="SourceGraphic" operator="atop"/>
        </filter>
      </defs>`;
    document.body.insertBefore(svg, document.body.firstChild);
  }

  // ─── CSS base (inyectado una sola vez) ───────────────────────────────────
  function injectBaseCSS() {
    if (document.getElementById('tch-glass-css')) return;
    const style = document.createElement('style');
    style.id = 'tch-glass-css';
    style.textContent = `

      /* ── Regla universal: la capa de vidrio NUNCA afecta el flujo flex/grid ── */
      .tch-glass-layer {
        position: absolute !important;
        inset: 0 !important;
        border-radius: inherit;
        pointer-events: none !important;
        z-index: 0 !important;
      }

      /* Contenido del host siempre por encima de la capa de vidrio */
      .tch-glass-host > *:not(.tch-glass-layer) {
        position: relative;
        z-index: 1;
      }

      /* ── Breathing: solo box-shadow → 100% GPU composited (transform/opacity) ── */
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
      @media (prefers-reduced-motion: no-preference) {
        .tch-glass-breathe {
          animation: tch-glass-breathe 6s ease-in-out infinite;
        }
      }

      /* ── NAVBAR ── */
      /* Quitamos el backdrop-filter del propio header: lo gestiona la capa interna */
      #glass-header {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
      #glass-header .tch-glass-layer {
        background: rgba(13, 11, 16, 0.60);
        -webkit-backdrop-filter: blur(24px) saturate(1.6);
        backdrop-filter: blur(24px) saturate(1.6);
        transition: background 0.4s ease, box-shadow 0.4s ease;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.18),
          inset 0 -1px 0 rgba(109,40,217,0.12);
      }
      #glass-header.scrolled .tch-glass-layer {
        background: rgba(13, 11, 16, 0.92);
        -webkit-backdrop-filter: blur(28px) saturate(1.8);
        backdrop-filter: blur(28px) saturate(1.8);
        box-shadow:
          0 12px 48px rgba(0,0,0,0.5),
          inset 0 1.5px 0 rgba(255,255,255,0.22),
          inset 0 -1px 0 rgba(109,40,217,0.14);
      }
      /* Hijos del header sobre la capa de vidrio */
      #glass-header > *:not(.tch-glass-layer) {
        position: relative;
        z-index: 2;
      }

      /* ── VITRINA (#vitrina-card) ──
         Cristal oscuro translúcido sobre el video del Hero.
         NUNCA SVG filter aquí → evita el fondo gris opaco.
         Los botones z-40 del HTML quedan siempre visibles (z > 0 de la capa). */
      #vitrina-card {
        /* Neutralizamos el backdrop-blur-2xl de Tailwind: lo gestiona la capa */
        -webkit-backdrop-filter: none !important;
        backdrop-filter: none !important;
      }
      #vitrina-card .tch-glass-layer {
        background: rgba(18, 15, 24, 0.50);
        -webkit-backdrop-filter: blur(22px) saturate(1.5);
        backdrop-filter: blur(22px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.22),
          inset 0 -1px 0 rgba(109,40,217,0.15),
          inset 1px 0 0 rgba(255,255,255,0.10),
          inset -1px 0 0 rgba(75,0,130,0.12);
      }
      /* Hijos del vitrina-card deben quedar por encima de la capa de vidrio.
         Los botones z-40 ya están posicionados en el HTML con z-index alto. */
      #vitrina-card > *:not(.tch-glass-layer) {
        position: relative;
        z-index: 1;
      }
      /* Botones de flechas: forzamos z-index alto para que nunca queden ocultos */
      #vitrina-card button {
        z-index: 40 !important;
      }

      /* ── CARDS PREMIUM (fondo claro #FAF9F6) ──
         Vidrio esmerilado blanco/75 + specular de borde + highlight de cursor.
         Sin SVG filter → texto y precios siempre nítidos. */
      .card-premium.tch-glass-host .tch-glass-layer {
        background: rgba(255, 255, 255, 0.72);
        -webkit-backdrop-filter: blur(12px) saturate(1.4);
        backdrop-filter: blur(12px) saturate(1.4);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.90),
          inset 0 -1px 0 rgba(109,40,217,0.08),
          0 4px 24px rgba(109,40,217,0.06);
      }

      /* Specular de cursor en cards (custom property actualizada por JS) */
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

  // ─── Crear capa de vidrio (posición absoluta, z=0, pointer-events:none) ──
  // NUNCA altera el flujo flex/grid del contenedor padre.
  function createGlassLayer(el, options) {
    const {
      usesSVGBackdrop = false,
      blurValue       = '24px',
      saturate        = '1.6',
      bgColor         = 'rgba(13,11,16,0.0)',
    } = options;

    // Asegurar posición relativa del padre
    const pos = window.getComputedStyle(el).position;
    if (pos === 'static') el.style.position = 'relative';

    // Evitar duplicados
    if (el.dataset.glassLayer) return null;
    el.dataset.glassLayer = '1';

    const layer = document.createElement('div');
    layer.className = 'tch-glass-layer';
    layer.setAttribute('aria-hidden', 'true');

    // Estilos inline mínimos; el CSS del injectBaseCSS maneja el resto
    layer.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      z-index: 0;
      background: ${bgColor};
      -webkit-backdrop-filter: blur(${blurValue}) saturate(${saturate});
      backdrop-filter: blur(${blurValue}) saturate(${saturate});
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.18),
        inset 0 -1px 0 rgba(109,40,217,0.12),
        inset 1px 0 0 rgba(255,255,255,0.08),
        inset -1px 0 0 rgba(75,0,130,0.10);
    `;

    // Solo Chromium: añade SVG refraction encima del blur
    if (usesSVGBackdrop) {
      layer.style.backdropFilter =
        `blur(${blurValue}) saturate(${saturate}) url(#tch-liquid-glass)`;
    }

    el.classList.add('tch-glass-host');
    // Insertar como PRIMER hijo — el CSS lo posiciona absolute (fuera del flujo)
    el.insertBefore(layer, el.firstChild);
    return layer;
  }

  // ─── Specular de cursor para .card-premium ───────────────────────────────
  function bindCardCursorSpecular(card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
      card.style.setProperty('--cursor-x', x);
      card.style.setProperty('--cursor-y', y);
    }, { passive: true });
  }

  // ─── Specular reactivo al cursor para #vitrina-card ──────────────────────
  function bindVitrinaCursorSpecular(vitrina, layer) {
    // Overlay extra sobre la capa de vidrio para el highlight de cursor
    const highlight = document.createElement('div');
    highlight.setAttribute('aria-hidden', 'true');
    highlight.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      z-index: 0;
      opacity: 0;
      transition: opacity 0.4s ease;
      background: radial-gradient(
        160px circle at 50% 50%,
        rgba(255,255,255,0.10) 0%,
        transparent 70%
      );
    `;
    vitrina.insertBefore(highlight, layer.nextSibling);

    vitrina.addEventListener('mousemove', function (e) {
      const rect = vitrina.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
      highlight.style.background = `radial-gradient(
        160px circle at ${x} ${y},
        rgba(255,255,255,0.12) 0%,
        transparent 70%
      )`;
      highlight.style.opacity = '1';
    }, { passive: true });

    vitrina.addEventListener('mouseleave', function () {
      highlight.style.opacity = '0';
    }, { passive: true });
  }

  // ─── NAVBAR ───────────────────────────────────────────────────────────────
  function applyNavbarGlass(support) {
    const header = document.getElementById('glass-header');
    if (!header) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layer = createGlassLayer(header, {
      usesSVGBackdrop: support.supportsSVGBackdrop,
      blurValue: '24px',
      saturate:  '1.6',
      bgColor:   'rgba(13,11,16,0.60)',
    });
    if (layer) layer.classList.add('tch-glass-breathe');
  }

  // ─── VITRINA (#vitrina-card) ──────────────────────────────────────────────
  // Sin SVG filter → el video del Hero se ve correctamente difuminado, no gris.
  // Los botones z-40 ya están en el HTML y el CSS los fuerza visibles.
  function applyVitrinaGlass(support) {
    const vitrina = document.getElementById('vitrina-card');
    if (!vitrina) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Nunca SVG filter en la vitrina (chocaría con el <video> → gris opaco)
    const layer = createGlassLayer(vitrina, {
      usesSVGBackdrop: false,
      blurValue: '22px',
      saturate:  '1.5',
      bgColor:   'rgba(18,15,24,0.50)',
    });

    if (layer) {
      layer.classList.add('tch-glass-breathe');
      bindVitrinaCursorSpecular(vitrina, layer);
    }
  }

  // ─── CARDS PREMIUM ────────────────────────────────────────────────────────
  function applyCardGlass(support) {
    const cards = document.querySelectorAll('.card-premium');
    if (!cards.length) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    cards.forEach(function (card) {
      createGlassLayer(card, {
        usesSVGBackdrop: false, // nunca SVG en cards con texto
        blurValue: '12px',
        saturate:  '1.4',
        bgColor:   'rgba(255,255,255,0.72)',
      });
      if (!reducedMotion) bindCardCursorSpecular(card);
    });
  }

  // ─── Inicialización ───────────────────────────────────────────────────────
  function init() {
    const support = detectSupport();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    injectSVGFilter();
    injectBaseCSS();
    applyNavbarGlass(support);
    applyVitrinaGlass(support);
    applyCardGlass(support);

    // Fix 3 — Console info para verificación en DevTools
    const mode = reducedMotion
      ? 'reducido (solo blur CSS, sin breathing)'
      : support.supportsSVGBackdrop
        ? 'Chromium — SVG refraction + backdrop blur'
        : 'Safari/Firefox — backdrop blur nativo';
    console.info('[Touche Visual] Liquid Glass: activo |', mode);
  }

  // ─── Punto de entrada (no bloqueante) ────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
