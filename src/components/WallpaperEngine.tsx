import React, { useRef, useEffect } from 'react';

interface MousePos { x: number; y: number; }
interface Ripple  { id: number; x: number; y: number; born: number; }

// ─── Aurora shader ────────────────────────────────────────────────────────────
function drawAurora(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  now: number,
  m: MousePos,
  ripples: Ripple[]
) {
  const t = now * 0.001;
  ctx.fillStyle = '#0b0f1a';
  ctx.fillRect(0, 0, w, h);

  // Stars
  for (let i = 0; i < 140; i++) {
    const sx = (i * 173.3) % w, sy = (i * 97.7) % h;
    const a = 0.2 + Math.sin(t * 1.1 + i * 0.4) * 0.22;
    ctx.globalAlpha = a; ctx.fillStyle = i % 4 === 0 ? '#a8d8ff' : '#fff';
    ctx.beginPath(); ctx.arc(sx, sy, i % 5 === 0 ? 1.1 : 0.7, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Aurora layers — mouse X shifts frequency, mouse Y shifts amplitude
  const fq = 0.7 + (m.x / w) * 0.9;
  const am = 0.35 + (m.y / h) * 1.4;

  const layers = [
    { hue: 210, amp: 0.19, freq: 0.0038, spd: 0.38, ph: 0.0 },
    { hue: 190, amp: 0.14, freq: 0.0058, spd: 0.58, ph: 1.5 },
    { hue: 248, amp: 0.12, freq: 0.0028, spd: 0.28, ph: 3.1 },
    { hue: 200, amp: 0.10, freq: 0.0072, spd: 0.78, ph: 0.8 },
    { hue: 268, amp: 0.08, freq: 0.0048, spd: 0.48, ph: 2.0 },
  ];

  layers.forEach(({ hue, amp, freq, spd, ph }) => {
    ctx.beginPath(); ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 4) {
      const y = h * 0.43
        + Math.sin(x * freq * fq + t * spd + ph)       * h * amp * am
        + Math.sin(x * freq * 2.1 + t * spd * 1.4 + ph * 0.7) * h * amp * 0.42 * am
        + Math.cos(x * freq * 0.65 + t * spd * 0.6)   * h * amp * 0.3;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h); ctx.closePath();
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0,   `hsla(${hue},85%,65%,0)`);
    g.addColorStop(0.38,`hsla(${hue},88%,62%,0.24)`);
    g.addColorStop(0.78,`hsla(${hue},75%,52%,0.10)`);
    g.addColorStop(1,   `hsla(${hue},85%,65%,0)`);
    ctx.fillStyle = g; ctx.fill();
  });

  // Click ripple rings
  ripples.forEach(r => {
    const age = (now - r.born) * 0.001; if (age > 3.2) return;
    const p = age / 3.2;
    for (let ring = 0; ring < 3; ring++) {
      const rr = p * Math.min(w, h) * 0.68 * (1 - ring * 0.14);
      const alpha = (1 - p) * 0.55 * (1 - ring * 0.28);
      ctx.beginPath(); ctx.arc(r.x, r.y, rr, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ring === 0 ? '100,210,255' : '160,180,255'},${alpha})`;
      ctx.lineWidth = 2.5 - ring * 0.7; ctx.stroke();
    }
    // Inner flash
    if (age < 0.25) {
      const a = (1 - age / 0.25) * 0.4;
      const gl = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, 60);
      gl.addColorStop(0, `rgba(180,230,255,${a})`);
      gl.addColorStop(1, 'rgba(100,180,255,0)');
      ctx.beginPath(); ctx.arc(r.x, r.y, 60, 0, Math.PI * 2);
      ctx.fillStyle = gl; ctx.fill();
    }
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export function WallpaperEngine() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef<MousePos>({ x: 0, y: 0 });
  const ripplesRef = useRef<Ripple[]>([]);
  const ridRef     = useRef(0);
  const rafRef     = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMove  = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onClick = (e: MouseEvent) => {
      ripplesRef.current = [
        ...ripplesRef.current.filter(r => Date.now() - r.born < 4500),
        { id: ++ridRef.current, x: e.clientX, y: e.clientY, born: Date.now() },
      ];
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    const ctx = canvas.getContext('2d')!;

    // Respect users who ask for less motion: draw one static frame and stop.
    // (resize/mousemove/click are already registered above; clean them all up.)
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      drawAurora(ctx, canvas.width, canvas.height, Date.now(), mouseRef.current, ripplesRef.current);
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('click', onClick);
      };
    }

    // Cap the ambient animation to ~30fps — imperceptible for a slow aurora,
    // but roughly halves the per-second canvas cost on low-end machines.
    const FRAME_MS = 1000 / 30;
    let last = 0;
    const loop = (ts: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (ts - last < FRAME_MS) return;
      last = ts;
      const now = Date.now();
      ripplesRef.current = ripplesRef.current.filter(r => now - r.born < 5000);
      drawAurora(ctx, canvas.width, canvas.height, now, mouseRef.current, ripplesRef.current);
    };
    rafRef.current = requestAnimationFrame(loop);

    // Stop rendering entirely while the tab is hidden; resume on return.
    const onVisibility = () => {
      cancelAnimationFrame(rafRef.current);
      if (!document.hidden) { last = 0; rafRef.current = requestAnimationFrame(loop); }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }} />;
}
