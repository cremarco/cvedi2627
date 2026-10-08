(function () {
  'use strict';

  const instances = new WeakMap();
  const vertexSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;
  const fragmentSource = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
    #else
      precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform vec2 u_emitter;
    uniform vec2 u_aperture;
    uniform float u_reach;
    uniform float u_time;

    // Distance to an ellipse, corrected by its local gradient so a ring keeps
    // the same optical thickness along both axes of the projected aperture.
    float ellipseRing(vec2 point, vec2 radius, float thickness) {
      vec2 q = point / radius;
      float radial = max(length(q), 0.0001);
      float gradient = max(length(q / (radius * radial)), 0.0001);
      float distance = (radial - 1.0) / gradient;
      return exp(-pow(distance / thickness, 2.0));
    }

    void main() {
      // Top-down coordinates match CSS positioning; x and y then share units.
      vec2 uv = vec2(gl_FragCoord.x / u_resolution.x,
                     1.0 - gl_FragCoord.y / u_resolution.y);
      float aspect = u_resolution.x / u_resolution.y;
      vec2 point = (uv - u_emitter) * vec2(aspect, 1.0);
      vec2 aperture = u_aperture * vec2(aspect, 1.0);
      float elevation = -point.y;
      float rise = clamp(elevation / u_reach, 0.0, 1.0);
      float breath = 0.92 + 0.08 * sin(u_time * 0.62);

      // Seven slowly separating light shafts rise from the actual aperture.
      // Broad light between them supplies volume without a solid cone surface.
      float spread = aperture.x * (0.58 + rise * 1.12);
      float axis = point.x + elevation * 0.035;
      float envelope = smoothstep(-0.018, 0.035, elevation)
                     * (1.0 - smoothstep(u_reach * 0.64, u_reach, elevation));
      float cone = 1.0 - smoothstep(spread * 0.50, spread, abs(axis));
      float shafts = 0.0;
      for (int i = 0; i < 7; i++) {
        float index = float(i) - 3.0;
        float origin = index * aperture.x * 0.19;
        float slope = index * aperture.x / u_reach * 0.22
                    + 0.027 * sin(u_time * 0.28 + index * 0.83);
        float width = 0.004 + rise * 0.013;
        float distance = axis - origin - elevation * slope;
        float band = exp(-pow(distance / width, 2.0));
        float intensity = 0.60 + 0.40 * cos(index * 0.71 + u_time * 0.31);
        shafts += band * intensity;
      }
      float rays = (cone * 0.075 + shafts * 0.13) * envelope * breath;

      // A continuous, slow horizontal sweep climbs the light volume. The
      // envelope fades both ends of the cycle, avoiding a flash at its reset.
      float scanProgress = fract(u_time * 0.105 + 0.24);
      float scanHeight = scanProgress * u_reach;
      float scan = exp(-pow((elevation - scanHeight) / 0.008, 2.0));
      scan *= cone * envelope * sin(scanProgress * 3.14159265) * 0.20;

      // Concentric elliptical light on the base makes the emission plane
      // unambiguous. The bright arc travels, while the complete ring stays on.
      float angle = atan(point.y / aperture.y, point.x / aperture.x);
      float travelingArc = pow(0.5 + 0.5 * cos(angle + u_time * 0.48), 12.0);
      float pixel = 1.0 / u_resolution.y;
      float core = ellipseRing(point, aperture, max(pixel * 1.35, 0.0015));
      float bloom = ellipseRing(point, aperture, 0.009);
      float inner = ellipseRing(point, aperture * 0.74, max(pixel, 0.0011));
      float outer = ellipseRing(point, aperture * 1.17, max(pixel, 0.0011));
      float outerArc = 0.48 + 0.52 * smoothstep(-0.45, 0.45, cos(angle * 3.0 - u_time * 0.24));
      float apertureLight = core * (0.44 + travelingArc * 0.26)
                          + bloom * 0.14 + inner * 0.22 + outer * outerArc * 0.20;
      vec2 inside = point / aperture;
      apertureLight += exp(-dot(inside, inside) * 2.4) * 0.07;

      float energy = rays + scan + apertureLight * breath;
      float edge = smoothstep(0.0, 0.018, uv.x)
                 * (1.0 - smoothstep(0.982, 1.0, uv.x))
                 * smoothstep(0.0, 0.018, uv.y)
                 * (1.0 - smoothstep(0.975, 1.0, uv.y));
      float alpha = min(energy * edge, 0.78);
      float iridescence = 0.5 + 0.5 * sin(angle * 0.65 + rise * 3.0 + u_time * 0.19);
      vec3 light = mix(vec3(0.45, 0.86, 1.0), vec3(0.86, 0.82, 1.0), iridescence * 0.55);
      light = mix(light, vec3(0.91, 0.98, 1.0), min(core + scan * 2.0, 0.86));
      // Premultiplied output composites light behind the untouched product.
      gl_FragColor = vec4(light * alpha, alpha);
    }
  `;

  function create(cafe) {
    const previous = instances.get(cafe);
    if (previous) previous.destroy();
    const hero = cafe.querySelector('.cafe-hero');
    if (!hero || cafe.dataset.page !== 'home') {
      cafe.dataset.projectionRenderer = 'css';
      const inactive = {
        destroy: function () {
          if (instances.get(cafe) !== inactive) return;
          instances.delete(cafe);
          delete cafe.dataset.projectionRenderer;
        },
        setPaused: function () {},
        replay: function () {}
      };
      instances.set(cafe, inactive);
      return inactive;
    }

    const canvas = document.createElement('canvas');
    canvas.className = 'holo-light-field';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.pointerEvents = 'none';
    canvas.width = 1;
    canvas.height = 1;
    hero.prepend(canvas);
    cafe.dataset.projectionRenderer = 'css';

    const listeners = new AbortController();
    const options = { signal: listeners.signal };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const printMedia = window.matchMedia('print');
    let gl, program, buffer, uniforms;
    let resizeObserver, intersectionObserver;
    let destroyed = false, contextLost = false, paused = false, printing = printMedia.matches;
    let frame = 0, previousTime = 0, elapsed = 0;
    let visible = isInViewport();

    function isInViewport() {
      const bounds = hero.getBoundingClientRect();
      return bounds.width > 0 && bounds.height > 0 && bounds.bottom > 0
        && bounds.right > 0 && bounds.top < window.innerHeight && bounds.left < window.innerWidth;
    }

    function canRender() {
      return !destroyed && !contextLost && gl && program && visible
        && document.visibilityState === 'visible' && !printing;
    }

    function canAnimate() {
      return canRender() && !paused && !reduced.matches;
    }

    function stopFrame() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    }

    function compile(type, source) {
      const shader = gl.createShader(type);
      if (!shader) throw new Error('Shader allocation unavailable');
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader) || 'Shader compilation unavailable';
        gl.deleteShader(shader);
        throw new Error(message);
      }
      return shader;
    }

    function releaseResources() {
      if (gl && !contextLost) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
      }
      buffer = null;
      program = null;
      uniforms = null;
    }

    function buildRenderer() {
      let vertex, fragment;
      try {
        if (!gl) gl = canvas.getContext('webgl', {
          alpha: true,
          premultipliedAlpha: true,
          antialias: false,
          depth: false,
          stencil: false,
          preserveDrawingBuffer: false,
          powerPreference: 'low-power'
        });
        if (!gl) return false;
        vertex = compile(gl.VERTEX_SHADER, vertexSource);
        fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
        program = gl.createProgram();
        if (!program) throw new Error('Program allocation unavailable');
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(program) || 'Shader linking unavailable');
        }
        buffer = gl.createBuffer();
        if (!buffer) throw new Error('Geometry allocation unavailable');
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.useProgram(program);
        const position = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        uniforms = {
          resolution: gl.getUniformLocation(program, 'u_resolution'),
          emitter: gl.getUniformLocation(program, 'u_emitter'),
          aperture: gl.getUniformLocation(program, 'u_aperture'),
          reach: gl.getUniformLocation(program, 'u_reach'),
          time: gl.getUniformLocation(program, 'u_time')
        };
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
        gl.clearColor(0, 0, 0, 0);
        cafe.dataset.projectionRenderer = 'webgl';
        delete canvas.dataset.fallbackReason;
        return true;
      } catch (error) {
        releaseResources();
        cafe.dataset.projectionRenderer = 'css';
        canvas.dataset.fallbackReason = error.message;
        return false;
      } finally {
        if (vertex) gl.deleteShader(vertex);
        if (fragment) gl.deleteShader(fragment);
      }
    }

    function draw() {
      if (!canRender()) return;
      const mobile = window.innerWidth <= 600;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.emitter, mobile ? 0.5 : 0.77, 0.88);
      gl.uniform2f(uniforms.aperture, mobile ? 0.33 : 0.17, mobile ? 0.023 : 0.034);
      gl.uniform1f(uniforms.reach, mobile ? 0.37 : 0.72);
      gl.uniform1f(uniforms.time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function animate(timestamp) {
      frame = 0;
      if (!canAnimate()) { previousTime = 0; return; }
      if (previousTime) elapsed += Math.min((timestamp - previousTime) / 1000, 0.06);
      previousTime = timestamp;
      draw();
      if (canAnimate()) frame = requestAnimationFrame(animate);
    }

    function synchronize() {
      stopFrame();
      if (!canRender()) return;
      draw();
      if (canAnimate()) frame = requestAnimationFrame(animate);
    }

    function resize() {
      if (destroyed) return;
      const width = Math.max(1, hero.clientWidth);
      const height = Math.max(1, hero.clientHeight);
      const scale = Math.min(window.devicePixelRatio || 1, 1.5, 2048 / width, 2048 / height);
      const pixelWidth = Math.max(1, Math.round(width * scale));
      const pixelHeight = Math.max(1, Math.round(height * scale));
      if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
      if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
      visible = isInViewport();
      synchronize();
    }

    function destroy() {
      if (destroyed) return;
      destroyed = true;
      stopFrame();
      listeners.abort();
      if (resizeObserver) resizeObserver.disconnect();
      if (intersectionObserver) intersectionObserver.disconnect();
      releaseResources();
      if (gl && !contextLost) {
        const extension = gl.getExtension('WEBGL_lose_context');
        if (extension) extension.loseContext();
      }
      gl = null;
      canvas.remove();
      if (instances.get(cafe) === api) {
        instances.delete(cafe);
        delete cafe.dataset.projectionRenderer;
      }
    }

    const api = {
      destroy: destroy,
      setPaused: function (value) {
        if (destroyed) return;
        paused = Boolean(value);
        synchronize();
      },
      replay: function () {
        if (destroyed) return;
        elapsed = 0;
        synchronize();
      }
    };
    instances.set(cafe, api);

    canvas.addEventListener('webglcontextlost', function (event) {
      event.preventDefault();
      stopFrame();
      contextLost = true;
      releaseResources();
      cafe.dataset.projectionRenderer = 'css';
    }, options);
    canvas.addEventListener('webglcontextrestored', function () {
      if (destroyed) return;
      contextLost = false;
      if (buildRenderer()) resize();
    }, options);
    document.addEventListener('visibilitychange', synchronize, options);
    reduced.addEventListener('change', synchronize, options);
    printMedia.addEventListener('change', function (event) {
      printing = event.matches;
      synchronize();
    }, options);
    window.addEventListener('beforeprint', function () { printing = true; synchronize(); }, options);
    window.addEventListener('afterprint', function () { printing = false; synchronize(); }, options);
    window.addEventListener('resize', resize, { passive: true, signal: listeners.signal });

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(hero);
    }
    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver(function (entries) {
        visible = entries.some(function (entry) { return entry.isIntersecting && entry.intersectionRatio > 0; });
        synchronize();
      }, { threshold: 0 });
      intersectionObserver.observe(hero);
    } else {
      window.addEventListener('scroll', function () {
        const next = isInViewport();
        if (next !== visible) { visible = next; synchronize(); }
      }, { passive: true, signal: listeners.signal });
    }

    buildRenderer();
    resize();
    return api;
  }

  window.CAFFE_HOLOGRAM = { create: create };
})();
