/* ============================================================
   Animations for the Pineda portfolio
   ============================================================ */

/* ---- scroll progress bar ---- */
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  progress.style.width = (scrolled * 100) + '%';
}, { passive: true });

/* ---- reveal on scroll ---- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // language bars
      e.target.querySelectorAll('.bar span').forEach(b => {
        b.style.width = b.dataset.val + '%';
      });
      // counters
      e.target.querySelectorAll('.num[data-count]').forEach(countUp);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---- count-up numbers ---- */
function countUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  let cur = 0;
  const step = Math.max(1, Math.round(target / 60));
  const tick = () => {
    cur += step;
    if (cur >= target) { el.textContent = target + suffix; return; }
    el.textContent = cur + suffix;
    requestAnimationFrame(tick);
  };
  tick();
}

/* ---- typewriter in hero ---- */
const phrases = [
  'Historian of Argentina & Latin America',
  'Scholar of Technology & Science',
  'Documentary Filmmaker',
  'Digital Humanist',
  'Faculty Union Leader'
];
const typedEl = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;
function type() {
  const word = phrases[pi];
  if (!deleting) {
    ci++;
    if (ci > word.length) { deleting = true; setTimeout(type, 1600); return; }
  } else {
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  typedEl.innerHTML = word.slice(0, ci) + '<span class="cursor">▌</span>';
  setTimeout(type, deleting ? 45 : 80);
}
if (typedEl) type();

/* ---- floating glyphs ---- */
const GLYPHS = ['𓂀','☀','◬','♅','⚝','✦','◈','卐','ᚱ','☉','⟁','✺'];
const mayaGlyphs = ['𓁢','◮','◭','⬡','⬢','✶','❂','☥','⌖','⏃'];
function spawnGlyph() {
  const g = document.createElement('div');
  g.className = 'float-glyph';
  const set = Math.random() > .5 ? GLYPHS : mayaGlyphs;
  g.textContent = set[Math.floor(Math.random() * set.length)];
  g.style.left = Math.random() * 100 + 'vw';
  g.style.animationDuration = (12 + Math.random() * 16) + 's';
  g.style.color = ['#e6b34a','#2ec4b6','#c75b39'][Math.floor(Math.random()*3)];
  document.body.appendChild(g);
  setTimeout(() => g.remove(), 28000);
}
setInterval(spawnGlyph, 2200);
for (let i = 0; i < 5; i++) setTimeout(spawnGlyph, i * 600);

/* ---- canvas glyph constellation backdrop ---- */
const canvas = document.getElementById('glyph-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, nodes = [];
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(70, Math.floor(w * h / 22000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.6 + .6
    }));
  }
  resize();
  window.addEventListener('resize', resize);
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(230,179,74,.7)';
      ctx.fill();
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(46,196,182,${(1 - d / 120) * .25})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) draw();
}

/* ---- subtle parallax on hero glyph ring ---- */
const ring = document.querySelector('.glyph-ring');
window.addEventListener('scroll', () => {
  if (ring) ring.style.transform = `translateY(${window.scrollY * 0.25}px)`;
}, { passive: true });
