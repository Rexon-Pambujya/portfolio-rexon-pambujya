/**
 * Ocean fragment shader — raw WebGL, no library, ~7 KB.
 *
 * Structure, in the order it matters visually:
 *
 *  1. Fake perspective. Screen rows below the horizon map to distance via
 *     `depth = k / (horizon - y)`, clamped. Without the clamp the noise
 *     coordinate runs to ~100 at the horizon and aliases into grey mush,
 *     which is exactly what a pure-FBM first attempt looks like.
 *
 *  2. Three directional swells. Sine waves with different headings,
 *     wavelengths and speeds. This is the part that reads as "ocean" —
 *     layered noise alone reads as fog. Their gradients are analytic, so
 *     the surface normal is exact and free.
 *
 *  3. FBM detail on top for chop, faded out with distance.
 *
 *  4. Lighting: a specular sun path, foam on crests, and a Fresnel term
 *     that reflects more sky as the surface tilts away near the horizon.
 *
 * OCTAVES is injected at compile time so phones get a cheaper build.
 */

export const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform float uWind;      // 0..1 — chop amount and drift speed
uniform vec2  uPointer;
uniform float uHorizon;
uniform vec3  uDeep;
uniform vec3  uShallow;
uniform vec3  uSkyHigh;
uniform vec3  uSkyLow;
uniform vec3  uSun;
uniform vec2  uSunPos;
uniform float uDark;
uniform float uAdvance;   // how far the camera has sailed, in wave units

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

const mat2 ROT = mat2(0.80, 0.60, -0.60, 0.80);

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    v += a * noise(p);
    p = ROT * p * 2.03;
    a *= 0.5;
  }
  return v;
}

// Three swells. Returns height in roughly -1..1 and writes the analytic
// slope into the grad out-param, which becomes the surface normal.
float swell(vec2 p, float t, out vec2 grad) {
  grad = vec2(0.0);
  float h = 0.0;

  // d1 rolls toward the camera (crest lines run across the view), the other
  // two cut across it so the surface never bands into flat stripes.
  vec2  d1 = normalize(vec2(0.22, 0.98)); float f1 = 1.05, a1 = 0.48, s1 = 1.55;
  vec2  d2 = normalize(vec2(0.86, 0.52)); float f2 = 1.85, a2 = 0.30, s2 = 2.25;
  vec2  d3 = normalize(vec2(-0.62, 0.78)); float f3 = 3.10, a3 = 0.16, s3 = 3.20;

  float p1 = dot(p, d1) * f1 - t * s1;
  float p2 = dot(p, d2) * f2 - t * s2;
  float p3 = dot(p, d3) * f3 - t * s3;

  h += a1 * sin(p1); grad += a1 * f1 * cos(p1) * d1;
  h += a2 * sin(p2); grad += a2 * f2 * cos(p2) * d2;
  h += a3 * sin(p3); grad += a3 * f3 * cos(p3) * d3;

  return h;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  float t = uTime;

  float horizon = uHorizon + uPointer.y * 0.010;
  vec3 col;

  if (uv.y >= horizon) {
    // ---------------- sky ----------------
    float k = (uv.y - horizon) / max(1.0 - horizon, 0.001);
    col = mix(uSkyLow, uSkyHigh, pow(k, 0.80));

    // warm bleed above the sun
    float warm = exp(-abs(uv.x - uSunPos.x) * 2.0) * exp(-k * 2.6);
    col = mix(col, col + uSun * 0.30, warm);

    // thin drifting cloud
    float cl = fbm(vec2(uv.x * 2.2 + t * 0.010, k * 3.0 + 4.0));
    col = mix(col, mix(col, uSun, 0.10), smoothstep(0.52, 0.92, cl) * 0.30 * (1.0 - k * 0.5));
  } else {
    // ---------------- sea ----------------
    float d = max(horizon - uv.y, 0.0012);
    float depth = min(0.55 / d, 44.0);
    float near = clamp(1.0 - depth / 24.0, 0.0, 1.0);   // 1 close, 0 far

    // The y multiplier sets how many wave crests you cross between the
    // bottom of the screen and the horizon. Too low and the entire
    // foreground sits at one phase and renders as a flat sheet.
    // uAdvance slides the whole wave field toward the viewer as you
    // scroll, so the page reads as the ship making way rather than the
    // sea looping in place.
    vec2 p = vec2(
      (uv.x - 0.5 + uPointer.x * 0.012) * aspect * depth * 1.70,
      depth * 3.40 + uAdvance
    );

    vec2 grad;
    float h = swell(p, t, grad);

    // chop: FBM detail, only where we can resolve it
    vec2 wind = normalize(vec2(0.94, -0.34)) * (0.35 + uWind * 0.55);
    float det = fbm(p * 1.9 + wind * t) - 0.5;
    float detAmt = 0.62 * near * (0.45 + uWind * 0.75);
    h += det * detAmt;

    // perturb the normal too, or the chop is visible in colour but the
    // specular stays glassy and the whole thing looks like satin
    float e = 0.35;
    grad += vec2(
      fbm(p * 1.9 + vec2(e, 0.0) + wind * t) - fbm(p * 1.9 - vec2(e, 0.0) + wind * t),
      fbm(p * 1.9 + vec2(0.0, e) + wind * t) - fbm(p * 1.9 - vec2(0.0, e) + wind * t)
    ) * detAmt * 1.6;

    vec3 n = normalize(vec3(-grad.x, -grad.y, 1.25));

    float hn = clamp(h * 0.5 + 0.5, 0.0, 1.0);

    // base body: troughs deep, crests toward the lighter tone.
    // smoothstep widens the separation — the palette tokens alone sit only
    // a few percent apart in lightness and render as a flat field.
    vec3 water = mix(uDeep * 0.82, uShallow * 1.08, smoothstep(0.20, 0.86, hn));

    // near water is darker and less hazy — without this the foreground
    // reads as brighter than the distance, which inverts the depth cue
    water *= mix(1.0, 0.74, near);

    // Fresnel: grazing angles near the horizon mirror the sky
    float fres = pow(1.0 - near, 2.2);
    water = mix(water, uSkyLow * 1.35 + uSun * 0.05, fres * 0.72);

    // Specular sun path — the flickering column that sells it as water.
    // Weighted toward the distance: glints should be small and dense far
    // out, not big blown-out blobs in the foreground.
    vec3 L = normalize(vec3((uSunPos.x - uv.x) * aspect, 0.32, 0.80));
    float spec = pow(max(dot(n, L), 0.0), 62.0);
    float path = exp(-pow((uv.x - uSunPos.x) * aspect * 1.25, 2.0));
    float falloff = mix(1.0, 0.30, near);
    water += uSun * spec * path * falloff * (uDark > 0.5 ? 2.2 : 1.5);

    // broad sheen so the path is visible even between glints
    water += uSun * path * (1.0 - near) * 0.05;

    // foam where crests are both high and steep
    float steep = clamp(length(grad) * 1.5, 0.0, 1.0);
    float foam = smoothstep(0.62, 0.93, hn) * steep * near;
    water = mix(water, mix(uShallow, vec3(1.0), 0.80), foam * 0.30);

    // haze into the horizon
    float fog = pow(1.0 - near, 3.0);
    col = mix(water, uSkyLow * 1.15, fog * 0.85);
  }

  // crisp horizon line + glow, so sky and sea actually separate
  float hl = exp(-abs(uv.y - horizon) * 300.0);
  col += mix(uSkyLow, uSun, 0.35) * hl * 0.45;

  // Sun / moon.
  // The disc is a mix, not an addition — adding warm light to a pale
  // daytime sky produces no visible disc at all, which is why light mode
  // looked like it had no sun.
  vec2 sd = (uv - uSunPos) * vec2(aspect, 1.0);
  float sr = length(sd);
  col += uSun * exp(-sr * 9.0) * 0.24;                        // bloom
  col += uSun * exp(-sr * 26.0) * 0.35;                       // tight halo
  col = mix(col, mix(uSun, vec3(1.0), 0.55), smoothstep(0.040, 0.027, sr));

  // reflected column of the sun on the water
  if (uv.y < horizon) {
    float refl = exp(-pow((uv.x - uSunPos.x) * aspect * 2.2, 2.0))
               * exp(-(horizon - uv.y) * 3.0);
    col += uSun * refl * 0.14;
  }

  float vig = 1.0 - 0.20 * pow(length((uv - 0.5) * vec2(aspect, 1.0)), 2.2);
  col *= vig;

  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) * 0.010;  // debanding

  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * JavaScript twin of the shader's swell().
 *
 * The ship has to ride the actual water, not bob on its own timer — a
 * CSS keyframe running at an unrelated period reads as the hull hovering
 * above the sea. These constants MUST stay in step with the GLSL above;
 * they're the same three directional waves.
 *
 * Returns the surface height at a point plus the x-slope, which becomes
 * the hull's pitch.
 */
const SWELL = [
  { dx: 0.22, dy: 0.98, f: 1.05, a: 0.48, s: 1.55 },
  { dx: 0.86, dy: 0.52, f: 1.85, a: 0.3, s: 2.25 },
  { dx: -0.62, dy: 0.78, f: 3.1, a: 0.16, s: 3.2 },
].map((w) => {
  const len = Math.hypot(w.dx, w.dy);
  return { ...w, dx: w.dx / len, dy: w.dy / len };
});

export function swellAt(px, py, t) {
  let h = 0;
  let slope = 0;
  for (const w of SWELL) {
    const phase = (px * w.dx + py * w.dy) * w.f - t * w.s;
    h += w.a * Math.sin(phase);
    slope += w.a * w.f * Math.cos(phase) * w.dx;
  }
  return { h, slope };
}

/**
 * Screen position → the shader's sea-plane coordinate. Mirrors the
 * perspective mapping in main().
 */
export function seaPointAt(uvX, uvY, horizon, aspect, advance) {
  const d = Math.max(horizon - uvY, 0.0012);
  const depth = Math.min(0.55 / d, 44);
  return {
    x: (uvX - 0.5) * aspect * depth * 1.7,
    y: depth * 3.4 + advance,
  };
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("createShader returned null (context lost?)");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) || "(no info log — context lost?)";
    gl.deleteShader(shader);
    throw new Error(`shader compile failed: ${log}`);
  }
  return shader;
}

/**
 * Builds the program and returns a small handle. Throws if WebGL or the
 * shader is unavailable — callers should catch and fall back to CSS.
 */
export function createOceanProgram(canvas, { octaves = 5 } = {}) {
  const gl =
    canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    }) || canvas.getContext("experimental-webgl");

  if (!gl) throw new Error("WebGL unavailable");
  if (gl.isContextLost?.()) throw new Error("WebGL context already lost");

  const frag = `#define OCTAVES ${octaves}\n${FRAG}`;
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`link failed: ${gl.getProgramInfoLog(program)}`);
  }

  gl.useProgram(program);

  // full-screen triangle — cheaper than a quad, no diagonal seam
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const names = [
    "uRes", "uTime", "uWind", "uPointer", "uHorizon", "uAdvance",
    "uDeep", "uShallow", "uSkyHigh", "uSkyLow", "uSun", "uSunPos", "uDark",
  ];
  const u = {};
  for (const n of names) u[n] = gl.getUniformLocation(program, n);

  return { gl, program, u };
}
