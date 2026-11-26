// שכבת WebGL דקורטיבית: צבר עדשות זכוכית שקופות על רקע שמנת, טבעות דקות, אבק רך,
// ונקודה כתומה אחת (קצה המחט) שהסמן מושך בעדינות. נטען רק בצד הלקוח, בייבוא דינמי.
// "זכוכית זולה": דיסקיות שטוחות עם שיידר שמדמה עדשה קמורה (פרנל, ברק, שפה, צל רך) — בלי transmission pass.
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, PlaneGeometry, ShaderMaterial,
  Points, BufferGeometry, BufferAttribute, Vector3, DoubleSide,
} from 'three';

const COMMON = /* glsl */`
const vec3 INK = vec3(.149, .141, .133);
const vec3 ORANGE = vec3(1., .353, .122);
const vec3 WHITE = vec3(1.);
// "over" compositing in premultiplied alpha
vec4 over(vec4 acc, vec3 c, float a){ a = clamp(a, 0., 1.); return vec4(c * a + acc.rgb * (1. - a), a + acc.a * (1. - a)); }
`;

const GLASS_V = /* glsl */`
varying vec2 vUv; varying vec3 vN; varying vec3 vT; varying vec3 vB; varying vec3 vP;
void main(){
  vUv = (uv - .5) * 2.7;
  vec4 mv = modelViewMatrix * vec4(position, 1.);
  vP = mv.xyz;
  vN = normalize(normalMatrix * vec3(0., 0., 1.));
  vT = normalize(normalMatrix * vec3(1., 0., 0.));
  vB = normalize(normalMatrix * vec3(0., 1., 0.));
  gl_Position = projectionMatrix * mv;
}`;

const GLASS_F = /* glsl */`
uniform float uBlur; uniform float uCurve; uniform vec3 uTip;
varying vec2 vUv; varying vec3 vN; varying vec3 vT; varying vec3 vB; varying vec3 vP;
${COMMON}
void main(){
  float r = length(vUv);
  float px = fwidth(r);
  float soft = px * 1.25 + uBlur * .1;
  float inside = 1. - smoothstep(1. - soft, 1. + soft, r);
  vec3 V = normalize(-vP);
  vec3 N = vN * (gl_FrontFacing ? 1. : -1.);
  vec3 n = normalize(N + (vT * vUv.x + vB * vUv.y) * uCurve);
  float fr = pow(1. - abs(dot(n, V)), 3.);
  vec3 L1 = normalize(vec3(-.45, .75, .5));
  vec3 L2 = normalize(vec3(.6, -.3, .7));
  float s1 = pow(max(dot(n, normalize(L1 + V)), 0.), 90.);
  float s2 = pow(max(dot(n, normalize(L2 + V)), 0.), 16.);
  float lit = max(dot(n, L1), 0.);
  float sharp = 1. - uBlur * .6;

  vec4 acc = vec4(0.);
  // soft shadow beneath the lens
  float rs = length(vUv - vec2(.05, -.11));
  acc = over(acc, INK, (1. - smoothstep(.8, 1.33, rs)) * .15 * (1. - inside * .8));
  // lens body: a thin white veil that strengthens at grazing angles
  acc = over(acc, WHITE, (.10 + .34 * fr + .12 * lit) * inside);
  // glass thickness: gentle darkening toward the rim, on the side away from the light
  float edge = smoothstep(.45, 1., r) * inside;
  acc = over(acc, INK, edge * edge * (.045 + .085 * (1. - lit)));
  // lit rim
  float rw = .013 + px + uBlur * .05;
  float rim = (1. - smoothstep(0., rw, abs(r - (1. - rw * 1.7)))) * inside;
  acc = over(acc, WHITE, rim * (.5 + .5 * lit) * sharp);
  // dark hairline at the very edge
  float hl = 1. - smoothstep(0., px * 1.3 + uBlur * .06, abs(r - 1.));
  acc = over(acc, INK, hl * .2 * sharp);
  // specular
  acc = over(acc, WHITE, (s1 * .95 + s2 * .2) * inside);
  // the orange light of the needle tip, refracted in the lens
  float tipK = exp(-abs(uTip.z) * .9);
  vec2 d = vUv - uTip.xy * .8;
  acc = over(acc, ORANGE, exp(-dot(d, d) * 5.) * tipK * inside * .3);
  vec2 d2 = vUv - uTip.xy;
  acc = over(acc, ORANGE, exp(-dot(d2, d2) * 1.3) * tipK * rim * .85);
  gl_FragColor = acc;
}`;

const FLAT_V = /* glsl */`
varying vec2 vUv;
void main(){ vUv = (uv - .5) * 2.; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`;

const TIP_F = /* glsl */`
uniform float uPulse;
varying vec2 vUv;
${COMMON}
void main(){
  float r = length(vUv);
  float px = fwidth(r);
  float halo = exp(-r * r * 7.) * (.24 + .08 * uPulse) + exp(-r * r * 46.) * .3;
  vec4 acc = vec4(ORANGE * halo, halo);
  acc = over(acc, ORANGE, 1. - smoothstep(.085 - px, .085 + px, r));
  gl_FragColor = acc;
}`;

const NEEDLE_F = /* glsl */`
varying vec2 vUv;
${COMMON}
void main(){
  float w = fwidth(vUv.x);
  float ln = 1. - smoothstep(w * .5, w * 1.5, abs(vUv.x));
  float y = clamp(vUv.y * .5 + .5, 0., 1.);
  float a = ln * pow(1. - y, 1.6) * smoothstep(0., .04, y) * .5;
  gl_FragColor = vec4(INK * a, a);
}`;

const RINGS_F = /* glsl */`
uniform float uN;
varying vec2 vUv;
${COMMON}
void main(){
  float r = length(vUv);
  float f = abs(fract(r * uN - .5) - .5) / max(fwidth(r) * uN, 1e-5);
  float ln = 1. - smoothstep(.35, 1.25, f);
  float fade = smoothstep(.16, .34, r) * (1. - smoothstep(.5, 1., r));
  float a = ln * fade * .11;
  gl_FragColor = vec4(INK * a, a);
}`;

const DUST_V = /* glsl */`
attribute float aSeed;
uniform float uTime; uniform float uPx;
varying float vA; varying float vO;
void main(){
  vec3 p = position;
  p.x += sin(uTime * .13 + aSeed * 40.) * .3;
  p.y += sin(uTime * .1 + aSeed * 17.) * .28 + cos(uTime * .05 + aSeed * 9.) * .2;
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  float k = 9. / max(-mv.z, .5);
  float s = (1.6 + 3.4 * fract(aSeed * 7.31)) * pow(k, 1.6);
  gl_PointSize = s * uPx;
  vO = step(.92, fract(aSeed * 3.71));
  vA = (.12 + .2 * fract(aSeed * 5.13)) / (1. + s * .12) * (1. + vO * 1.6);
  gl_Position = projectionMatrix * mv;
}`;

const DUST_F = /* glsl */`
varying float vA; varying float vO;
${COMMON}
void main(){
  float r = length(gl_PointCoord - .5) * 2.;
  float a = (1. - smoothstep(.15, 1., r)) * vA;
  gl_FragColor = vec4(mix(INK, ORANGE, vO) * a, a);
}`;

// x, y, z, רדיוס, הטיה rx/ry, סחרור איטי (0 = נדנוד בלבד), טשטוש עומק
const LAYOUTS = {
  hero: {
    ref: 1.9,
    discs: [
      [0.1, 1.1, -2.6, 2.0, 0.16, 0.12, 0, 0.5],
      [-3.7, 0.5, -1.2, 1.55, 0.35, 0.55, 0, 0.12],
      [3.3, 1.2, -0.4, 1.1, -0.3, -0.6, 0.05, 0.04],
      [-2.5, -1.55, 1.2, 0.72, -0.5, 0.2, -0.07, 0],
      [4.3, -1.3, 1.0, 0.5, 0.5, 0.3, 0, 0],
      [5.4, 0.3, -3.2, 1.6, 0.2, -0.4, 0, 0.6],
      [-1.5, 2.1, 1.6, 0.34, 0.6, -0.3, 0.09, 0],
      [1.9, -0.5, 2.2, 0.26, -0.4, 0.5, -0.11, 0],
    ],
    simple: 4,
    rings: [0.1, 1.1, -3.6, 3.3, 7],
    tip: [2.3, 0.15, 0.9],
  },
  guide: {
    ref: 2.5,
    discs: [
      [0, 0.25, -3.0, 2.1, 0.14, 0.1, 0, 0.55],
      [-4.6, 0.3, -0.6, 1.25, 0.3, 0.5, 0, 0.08],
      [4.4, 0.7, -0.2, 0.95, -0.35, -0.55, 0.05, 0.02],
      [-2.6, -1.3, 1.3, 0.5, -0.5, 0.25, -0.07, 0],
      [5.9, -1.0, 1.0, 0.42, 0.5, 0.3, 0.08, 0],
    ],
    simple: 3,
    rings: [0, 0.25, -3.8, 3.4, 7],
    tip: [3.0, -0.55, 0.8],
  },
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function mount(box, canvas, { variant = 'hero', simple = false, still = false } = {}) {
  const L = LAYOUTS[variant] || LAYOUTS.hero;
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'default' });
  } catch (e) { return null; }
  renderer.setClearColor(0x000000, 0);
  const dpr = Math.min(window.devicePixelRatio || 1, simple ? 1.5 : 2);
  renderer.setPixelRatio(dpr);

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 40);
  camera.position.set(0, 0, 9);
  const cluster = new Group();
  scene.add(cluster);

  const quad = new PlaneGeometry(1, 1);
  const mat = (vertexShader, fragmentShader, uniforms) => new ShaderMaterial({
    vertexShader, fragmentShader, uniforms, transparent: true, premultipliedAlpha: true, depthTest: false, depthWrite: false, side: DoubleSide,
  });
  const disposables = [quad];

  // עדשות
  const defs = simple ? L.discs.slice(0, L.simple) : L.discs;
  const discs = defs.map(([x, y, z, r, rx, ry, spin, blur], i) => {
    const m = mat(GLASS_V, GLASS_F, { uBlur: { value: blur }, uCurve: { value: 0.5 + (i % 3) * 0.12 }, uTip: { value: new Vector3(0, 0, 99) } });
    const mesh = new Mesh(quad, m);
    disposables.push(m);
    cluster.add(mesh);
    return { mesh, m, x, y, z, r, rx, ry, spin, seed: i * 1.731 + 0.4 };
  });

  // טבעות קונצנטריות דקות מאחור
  const ringsM = mat(FLAT_V, RINGS_F, { uN: { value: L.rings[4] } });
  const rings = new Mesh(quad, ringsM);
  disposables.push(ringsM);
  cluster.add(rings);

  // אבק רך
  let dust = null, dustM = null;
  {
    const n = simple ? 36 : 110;
    const pos = new Float32Array(n * 3), seed = new Float32Array(n);
    let s = 7;
    const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (rnd() - 0.5) * 13; pos[i * 3 + 1] = (rnd() - 0.5) * 6.4; pos[i * 3 + 2] = -3.5 + rnd() * 7.5;
      seed[i] = rnd();
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new BufferAttribute(seed, 1));
    dustM = mat(DUST_V, DUST_F, { uTime: { value: 0 }, uPx: { value: dpr } });
    dust = new Points(g, dustM);
    dust.frustumCulled = false;
    disposables.push(g, dustM);
    scene.add(dust);
  }

  // קצה המחט: נקודה כתומה + קו שיער דק מעליה
  const tipM = mat(FLAT_V, TIP_F, { uPulse: { value: 0 } });
  const tip = new Mesh(quad, tipM);
  tip.scale.setScalar(0.62);
  const needleM = mat(FLAT_V, NEEDLE_F, {});
  const needle = new Mesh(quad, needleM);
  needle.scale.set(0.06, 2.4, 1);
  needle.position.y = 1.2;
  const tipG = new Group();
  tipG.add(needle, tip);
  scene.add(tipG);
  disposables.push(tipM, needleM);

  let W = 1, H = 1, lx = 1, ls = 1;
  const tipPos = new Vector3(L.tip[0], L.tip[1], L.tip[2]);
  const target = new Vector3().copy(tipPos);
  const v = new Vector3();
  let t = still ? 9 : 0, last = 0, raf = 0, visible = true, alive = true;
  let pmx = 0, pmy = 0, mx = 0, my = 0, pull = 0, pullT = 0, lean = 0;

  function size() {
    W = Math.max(1, box.clientWidth); H = Math.max(1, box.clientHeight);
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.updateProjectionMatrix();
    const a = W / H;
    lx = clamp(a / L.ref, 0.34, 1.15);
    ls = clamp((a / L.ref) * 1.6, 0.62, 1);
  }

  function update(dt) {
    mx += (pmx - mx) * 0.04; my += (pmy - my) * 0.04; pull += (pullT - pull) * 0.03;
    const top = box.getBoundingClientRect().top;
    const sc = still ? 0 : clamp(-top / H, 0, 1.4);
    cluster.rotation.y = Math.sin(t * 0.11) * 0.2 + mx * 0.09;
    cluster.rotation.x = Math.sin(t * 0.07) * 0.045 - my * 0.05;
    camera.position.y = -sc * 1.5;
    camera.position.x = mx * 0.18;
    for (const d of discs) {
      const s = d.r * ls * 2.7;
      d.mesh.scale.setScalar(s);
      d.mesh.position.set(d.x * lx, d.y + Math.sin(t * 0.27 + d.seed) * 0.11, d.z + sc * d.z * 0.25);
      d.mesh.rotation.set(
        d.rx + Math.sin(t * 0.19 + d.seed * 3) * 0.2,
        d.ry + (d.spin ? t * d.spin * 2 : Math.sin(t * 0.15 + d.seed) * 0.28),
        0,
      );
    }
    rings.position.set(L.rings[0] * lx, L.rings[1], L.rings[2]);
    rings.scale.setScalar(L.rings[3] * 2 * (1 + Math.sin(t * 0.2) * 0.03));
    rings.rotation.set(-0.25, 0.2, 0);

    // נקודת המחט: מסלול איטי + משיכה עדינה אל הסמן
    const bx = L.tip[0] * lx + Math.sin(t * 0.23) * 0.55 * lx, by = L.tip[1] + Math.sin(t * 0.31 + 1) * 0.4;
    target.set(bx, by, L.tip[2]);
    if (pull > 0.001) {
      v.set(pmx, pmy, 0.5).unproject(camera).sub(camera.position).normalize();
      const k = (L.tip[2] - camera.position.z) / v.z;
      const wx = camera.position.x + v.x * k, wy = camera.position.y + v.y * k;
      target.x += (wx - bx) * 0.42 * pull; target.y += (wy - by) * 0.42 * pull;
    }
    const px = tipPos.x;
    tipPos.lerp(target, still ? 1 : 0.035);
    lean += (clamp((tipPos.x - px) * 14, -0.35, 0.35) - lean) * 0.08;
    tipG.position.copy(tipPos);
    needle.rotation.z = still ? 0.12 : 0.12 - lean;
    needle.position.set(-Math.sin(needle.rotation.z) * 1.2, Math.cos(needle.rotation.z) * 1.2, 0);
    tipM.uniforms.uPulse.value = 0.5 + 0.5 * Math.sin(t * 1.3);
    if (dustM) dustM.uniforms.uTime.value = t;

    scene.updateMatrixWorld();
    for (const d of discs) {
      v.copy(tipPos); d.mesh.worldToLocal(v);
      d.m.uniforms.uTip.value.set(v.x * 2.7, v.y * 2.7, v.z * d.mesh.scale.x);
    }
  }

  function render() { renderer.render(scene, camera); }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - (last || now)) / 1000, 0.05); last = now; t += dt;
    update(dt); render();
  }
  function sync() {
    if (!alive) return;
    const run = visible && !document.hidden && !still;
    if (run && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    else if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  function once() { update(0); render(); }

  const onMove = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const r = box.getBoundingClientRect();
    pmx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1.2, 1.2);
    pmy = clamp(-(((e.clientY - r.top) / r.height) * 2 - 1), -1.2, 1.2);
    pullT = e.clientY >= r.top && e.clientY <= r.bottom ? 1 : 0;
  };
  const onLeave = () => { pullT = 0; };
  const onVis = () => sync();
  const onLost = (e) => { e.preventDefault(); if (raf) { cancelAnimationFrame(raf); raf = 0; } };
  const onRestored = () => { size(); if (still) once(); else sync(); };

  const ro = new ResizeObserver(() => { size(); if (still || !raf) once(); });
  ro.observe(box);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { rootMargin: '80px' });
  io.observe(box);
  document.addEventListener('visibilitychange', onVis);
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onRestored);
  if (!simple && !still) {
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
  }

  function dispose() {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
  }

  // פריים ראשון + בדיקת תקינות: אם שיידר לא התקמפל או שההקשר אבד, מוותרים ונשארים עם ציור ה־CSS
  let ok = true;
  try {
    size(); once();
    const progs = renderer.info.programs || [];
    if (renderer.getContext().isContextLost() || progs.some((p) => p.diagnostics && p.diagnostics.runnable === false)) ok = false;
  } catch (e) { ok = false; }
  if (!ok) { dispose(); return null; }
  sync();

  return { dispose };
}
