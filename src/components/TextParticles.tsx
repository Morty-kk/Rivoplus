import React, { useRef, useEffect } from 'react';
import type { Language } from '@/pages/index-content';

// Sci-fi space blue keyword pools per language
const WORDS: Record<Language, string[]> = {
  en: [
    '4K·HD', '◈ STREAM', '⟨ AI ⟩', 'MUSIC·PRO', '◉ ANIME',
    '→ RIVO+', 'CLOUD·99%', '⬡ SECURE', '0xBLUE', 'ULTRA·HD',
    '∑ DIGITAL', 'CREATIVE', '▲ PLUS', 'SYS:LIVE', '⟨CHATGPT⟩',
    'GEMINI·AI', 'STREAM·4K', '◈ CANVA', '[ADOBE]', '01·PLUS',
  ],
  ar: [
    'بث·4K', '◈ موسيقى', '⟨ ذكاء ⟩', 'أنيمي·برو', '◉ إبداع',
    '→ ريفو+', 'سحابة·99%', '⬡ آمن', 'فائق·الجودة', 'رقمي',
    '[شات·جي·بي·تي]', 'جيميني·AI', '▲ بلس', 'كانفا·برو', 'أدوبي·CC',
  ],
  de: [
    '4K·HD', '◈ STREAM', '⟨ KI ⟩', 'MUSIK·PRO', '◉ ANIME',
    '→ RIVO+', 'CLOUD·99%', '⬡ SICHER', '0xBLAU', 'ULTRA·HD',
    '∑ DIGITAL', 'KREATIV', '▲ PLUS', 'SYS:LIVE', '⟨CHATGPT⟩',
    'GEMINI·KI', 'STREAM·4K', '◈ CANVA', '[ADOBE]', '01·PLUS',
  ],
};

const PALETTE = [
  { color: '#29acf0', blur: 14, alpha: 0.75 }, // primary blue
  { color: '#22d3ee', blur: 12, alpha: 0.70 }, // cyan
  { color: '#818cf8', blur: 16, alpha: 0.65 }, // indigo
  { color: '#60a5fa', blur: 10, alpha: 0.65 }, // sky blue
  { color: '#a78bfa', blur: 14, alpha: 0.60 }, // purple
  { color: '#7dd8f8', blur: 12, alpha: 0.70 }, // light blue
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  word: string;
  size: number;
  born: number;
  maxAge: number; // ms
  color: string;
  blur: number;
  baseAlpha: number;
  mono: boolean;
}

function spawn(w: number, h: number, words: string[]): Particle {
  const p = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  const isMini = Math.random() < 0.35;
  return {
    x: 10 + Math.random() * (w - 20),
    y: h + 10,
    vx: (Math.random() - 0.5) * 22,
    vy: -(28 + Math.random() * 38),
    word: words[Math.floor(Math.random() * words.length)],
    size: isMini ? 10 + Math.random() * 4 : 14 + Math.random() * 10,
    born: Date.now(),
    maxAge: 5000 + Math.random() * 4000,
    color: p.color,
    blur: isMini ? p.blur * 0.6 : p.blur,
    baseAlpha: isMini ? p.alpha * 0.55 : p.alpha,
    mono: Math.random() < 0.6,
  };
}

export function TextParticles({ language }: { language: Language }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const psRef     = useRef<Particle[]>([]);
  const rafRef    = useRef(0);
  const langRef   = useRef(language);
  langRef.current = language;
  const lastRef   = useRef(Date.now());
  const spawnTimerRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const ctx = canvas.getContext('2d')!;

    // Floating words are pure motion — there is nothing meaningful to show as a
    // static frame, so users who ask for reduced motion just get a clean hero.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return () => ro.disconnect();
    }

    // Match WallpaperEngine: cap the ambient animation at ~30fps. The particles
    // drift slowly enough that the halved frame rate is not noticeable, and it
    // halves the per-second cost of the glow passes below.
    const FRAME_MS = 1000 / 30;
    let lastFrame = 0;

    const loop = (ts: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (ts - lastFrame < FRAME_MS) return;
      lastFrame = ts;

      const now  = Date.now();
      const dt   = Math.min(now - lastRef.current, 50); // cap at 50ms
      lastRef.current = now;
      const w = canvas.width, h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Spawn new particles
      spawnTimerRef.current += dt;
      const interval = 480 + Math.random() * 120;
      if (spawnTimerRef.current > interval && psRef.current.length < 28) {
        psRef.current.push(spawn(w, h, WORDS[langRef.current]));
        spawnTimerRef.current = 0;
      }

      // Update + draw
      psRef.current = psRef.current.filter(p => {
        const age = now - p.born;
        if (age > p.maxAge || p.y < -40) return false;

        const progress = age / p.maxAge;
        const fade = progress < 0.15
          ? progress / 0.15
          : progress > 0.75
            ? (1 - progress) / 0.25
            : 1;
        const alpha = fade * p.baseAlpha;

        // Move
        p.x += (p.vx * dt) / 1000;
        p.y += (p.vy * dt) / 1000;

        // Draw with glow
        const font = p.mono
          ? `${p.size}px 'Courier New', monospace`
          : `700 ${p.size}px Cairo, Helvetica, Arial, sans-serif`;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = alpha;

        // Coloured glow pass. shadowBlur is by far the most expensive canvas 2D
        // operation here, so only this pass pays for it — the white core below
        // is drawn crisp (shadowBlur 0) instead of blurred a second time. Same
        // look, roughly half the blur work per particle.
        ctx.shadowColor  = p.color;
        ctx.shadowBlur   = p.blur * 2;
        ctx.fillStyle    = p.color;
        ctx.fillText(p.word, p.x, p.y);

        ctx.shadowBlur   = 0;
        ctx.fillStyle    = '#fff';
        ctx.globalAlpha  = alpha * 0.35;
        ctx.fillText(p.word, p.x, p.y);

        ctx.restore();
        return true;
      });
    };

    rafRef.current = requestAnimationFrame(loop);

    // Stop rendering entirely while the tab is hidden; resume on return.
    // Without this the particle clock keeps running against a canvas nobody
    // can see. `lastRef` is reset so the first frame back does not apply one
    // huge dt and teleport every particle up the screen.
    const onVisibility = () => {
      cancelAnimationFrame(rafRef.current);
      if (!document.hidden) {
        lastRef.current = Date.now();
        lastFrame = 0;
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1, pointerEvents: 'none' }}
    />
  );
}
