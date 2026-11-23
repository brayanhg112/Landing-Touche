/**
 * liquid-logo.js — Touche Essencielle · Visual Upgrade 1.1
 * Metal Líquido / Chrome Shader en el Logo Hero
 *
 * - WebGL2 nativo, sin dependencias externas
 * - Aspect ratio real del PNG (img.naturalWidth / img.naturalHeight)
 * - RAF pausado con IntersectionObserver + visibilitychange
 * - devicePixelRatio cap: 2.0 desktop / 1.5 mobile
 * - Fallback automático: PNG estático si no hay WebGL2 / reduced-motion / GPU baja
 */

(function () {
  'use strict';

  // ─── Vertex Shader ────────────────────────────────────────────────────────
  const VS = `#version 300 es
precision mediump float;
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

  // ─── Fragment Shader ──────────────────────────────────────────────────────
  // Efecto cromo líquido:
  //   • alpha mask del logotipo (textura PNG)
  //   • normal map procedural con ondas de Perlin 2D simplificado
  //   • env map esférico (gradiente negro → #6D28D9 → plateado → blanco)
  //   • Fresnel chromatic aberration sutil
  //   • specular highlight cromado con toques #6D28D9 / #4B0082
  const FS = `#version 300 es
precision mediump float;

uniform sampler2D u_logo;
uniform float u_time;
uniform vec2 u_mouse;      // normalized [0..1], con lerp
uniform vec2 u_resolution;

in vec2 v_uv;
out vec4 fragColor;

// Función hash 2D → pseudoaleatoriedad rápida
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// Gradient noise (Perlin simplificado)
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
        dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
        dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y
  );
}

// Env map esférico simplificado → color de reflejo según normal
vec3 envSphere(vec3 n) {
  // 3 paradas de color: dark noir → violet → chrome silver
  vec3 colDark   = vec3(0.05, 0.03, 0.08);  // noir oscuro
  vec3 colViolet = vec3(0.43, 0.16, 0.85);  // #6D28D9
  vec3 colDeep   = vec3(0.29, 0.00, 0.51);  // #4B0082 (toque sutil)
  vec3 colSilver = vec3(0.85, 0.87, 0.92);  // plata cromada
  vec3 colWhite  = vec3(1.00, 0.99, 1.00);  // highlight especular

  // Mapeo del normal.y (arriba-abajo) y normal.x (izquierda-derecha)
  float t = n.y * 0.5 + 0.5;
  float s = n.x * 0.5 + 0.5;

  vec3 col = mix(colDark, colSilver, t);
  col = mix(col, colViolet, (1.0 - abs(n.x)) * 0.45 * (1.0 - t));
  col = mix(col, colDeep, s * (1.0 - t) * 0.35);

  // Highlight especular sharp
  float spec = pow(max(0.0, dot(n, normalize(vec3(0.4, 0.7, 0.6)))), 18.0);
  col = mix(col, colWhite, spec * 0.75);

  // Fresnel rim light sutil
  float fresnel = pow(1.0 - abs(n.z), 3.0);
  col = mix(col, colViolet * 1.2, fresnel * 0.3);

  return col;
}

void main() {
  // Sample alpha mask del logo
  float alpha = texture(u_logo, v_uv).a;
  if (alpha < 0.01) {
    fragColor = vec4(0.0);
    return;
  }

  // Distorsión dinámica del UV según mouse + tiempo
  vec2 mouseOff = (u_mouse - 0.5) * 0.08;
  vec2 uvDistort = v_uv + mouseOff * 0.5;

  // Normal map procedural: múltiples capas de ruido
  float scale1 = 3.5;
  float scale2 = 7.0;
  float speed  = 0.18;

  float nx = noise(uvDistort * scale1 + vec2(u_time * speed, 0.0))
           + 0.4 * noise(uvDistort * scale2 + vec2(0.0, u_time * speed * 0.7));
  float ny = noise(uvDistort * scale1 + vec2(0.0, u_time * speed * 0.8))
           + 0.4 * noise(uvDistort * scale2 + vec2(u_time * speed * 0.6, u_time * speed));

  // Normal resultante (z siempre positivo, normal hacia cámara)
  float strength = 0.55 + length(mouseOff) * 1.2;
  vec3 normal = normalize(vec3(nx * strength, ny * strength, 1.0));

  // Aberración cromática Fresnel (muy sutil)
  float aberration = 0.004 * pow(1.0 - abs(normal.z), 2.0);
  float alphaR = texture(u_logo, v_uv + vec2(aberration, 0.0)).a;
  float alphaB = texture(u_logo, v_uv - vec2(aberration, 0.0)).a;

  // Color final del metal líquido
  vec3 chromCol = envSphere(normal);

  // Aberración en los canales R y B
  chromCol.r *= (alphaR / max(alpha, 0.001));
  chromCol.b *= (alphaB / max(alpha, 0.001));

  // Composición final con alpha suavizado
  float smoothAlpha = smoothstep(0.0, 0.08, alpha) * alpha;
  fragColor = vec4(chromCol * smoothAlpha, smoothAlpha);
}`;

  // ─── Estado del módulo ────────────────────────────────────────────────────
  let gl, program, rafId, canvas;
  let isPaused = false;
  let startTime = performance.now();
  let lerpMouse = { x: 0.5, y: 0.5 };
  let targetMouse = { x: 0.5, y: 0.5 };
  let uTime, uMouse, uResolution;

  // ─── Detección de capacidad ───────────────────────────────────────────────
  function canRunWebGL() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const testCanvas = document.createElement('canvas');
    const ctx = testCanvas.getContext('webgl2');
    if (!ctx) return false;
    // Heurística de GPU baja: Android entry-level / iOS Safari < 15 con < 2GB RAM
    const renderer = ctx.getParameter(ctx.RENDERER) || '';
    const isSoftware = /SwiftShader|Software|llvmpipe/i.test(renderer);
    if (isSoftware) return false;
    ctx.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  }

  // ─── Compilar shader ─────────────────────────────────────────────────────
  function compileShader(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('[LiquidLogo] Shader error:', gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  // ─── Inicializar WebGL ────────────────────────────────────────────────────
  function initGL(container, logoImg) {
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0);

    // Dimensiones respetando el aspect ratio real del PNG
    const naturalRatio = logoImg.naturalWidth / logoImg.naturalHeight;
    const cssHeight = isMobile ? 64 : 80; // px, equivalente al h-16/h-20 de Tailwind
    const cssWidth = cssHeight * naturalRatio;

    canvas = document.createElement('canvas');
    canvas.width  = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    canvas.style.width  = cssWidth + 'px';
    canvas.style.height = cssHeight + 'px';
    canvas.style.display = 'block';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);

    gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!gl) return false;

    // Programa
    const vs = compileShader(gl, gl.VERTEX_SHADER, VS);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return false;

    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('[LiquidLogo] Link error:', gl.getProgramInfoLog(program));
      return false;
    }
    gl.useProgram(program);

    // Quad de pantalla completa
    const positions = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    uTime       = gl.getUniformLocation(program, 'u_time');
    uMouse      = gl.getUniformLocation(program, 'u_mouse');
    uResolution = gl.getUniformLocation(program, 'u_resolution');
    gl.uniform2f(uResolution, canvas.width, canvas.height);

    // Textura del logo (alpha mask)
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, logoImg);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(program, 'u_logo'), 0);

    // Blending para alpha premultiplicado
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.viewport(0, 0, canvas.width, canvas.height);
    return true;
  }

  // ─── Loop de render ───────────────────────────────────────────────────────
  function render() {
    if (isPaused || !gl) return;
    rafId = requestAnimationFrame(render);

    // Lerp suave del mouse
    const LERP = 0.08;
    lerpMouse.x += (targetMouse.x - lerpMouse.x) * LERP;
    lerpMouse.y += (targetMouse.y - lerpMouse.y) * LERP;

    const t = (performance.now() - startTime) / 1000.0;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uMouse, lerpMouse.x, lerpMouse.y);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function pause() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    isPaused = true;
  }

  function resume() {
    if (!isPaused) return;
    isPaused = false;
    render();
  }

  // ─── Fallback estático ────────────────────────────────────────────────────
  function renderFallback(container) {
    container.innerHTML = '';
    const img = document.createElement('img');
    img.src = 'assets/logo-navbar.png';
    img.alt = 'Touche Essencielle';
    img.className = 'w-full h-auto object-contain opacity-90';
    img.style.maxWidth = '80px';
    container.appendChild(img);
  }

  // ─── Inicialización principal ─────────────────────────────────────────────
  function init() {
    const container = document.getElementById('liquid-logo-hero');
    if (!container) return;

    if (!canRunWebGL()) {
      renderFallback(container);
      return;
    }

    // Cargar imagen del logo para obtener naturalWidth/Height y usarla como textura
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'assets/logo-navbar.png';

    img.onload = function () {
      if (!img.naturalWidth || !img.naturalHeight) {
        renderFallback(container);
        return;
      }

      const ok = initGL(container, img);
      if (!ok) {
        renderFallback(container);
        return;
      }

      // Mouse tracking: coordenadas normalizadas relativas al canvas
      document.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        // Usar posición global normalizada para un efecto más suave
        targetMouse.x = e.clientX / window.innerWidth;
        targetMouse.y = 1.0 - e.clientY / window.innerHeight;
      }, { passive: true });

      // Touch tracking para móvil
      document.addEventListener('touchmove', function (e) {
        if (!e.touches[0]) return;
        targetMouse.x = e.touches[0].clientX / window.innerWidth;
        targetMouse.y = 1.0 - e.touches[0].clientY / window.innerHeight;
      }, { passive: true });

      // IntersectionObserver → pausar cuando el hero sale del viewport
      const heroSection = document.querySelector('.hero-cinematic');
      if (heroSection && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver(
          function (entries) {
            entries[0].isIntersecting ? resume() : pause();
          },
          { threshold: 0.05 }
        );
        obs.observe(heroSection);
      }

      // Visibilitychange → pausar si el usuario cambia de pestaña
      document.addEventListener('visibilitychange', function () {
        document.hidden ? pause() : resume();
      });

      // Liberar contexto WebGL si el elemento se desmonta del DOM
      if ('MutationObserver' in window) {
        const mo = new MutationObserver(function () {
          if (!document.contains(container)) {
            pause();
            if (gl) {
              gl.getExtension('WEBGL_lose_context')?.loseContext();
              gl = null;
            }
            mo.disconnect();
          }
        });
        mo.observe(document.body, { childList: true, subtree: true });
      }

      // Arrancar el loop
      isPaused = false;
      render();
    };

    img.onerror = function () {
      renderFallback(container);
    };
  }

  // ─── Punto de entrada (no bloqueante) ─────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(init, { timeout: 2000 });
      } else {
        setTimeout(init, 200);
      }
    });
  } else {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(init, { timeout: 2000 });
    } else {
      setTimeout(init, 200);
    }
  }
})();
