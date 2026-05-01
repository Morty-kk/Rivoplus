import React, { useState, useEffect, useRef, useMemo } from 'react';

const RUNES = '◈⟨⟩∑∞∀∂∇⊕△◉⬡01↑↓←→ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

type Phase = 'scramble' | 'reveal' | 'scan' | 'done';

interface Props {
  /** Text to display */
  text: string;
  /** Tailwind size classes e.g. "text-5xl md:text-7xl" */
  sizeCls?: string;
  /** Extra class names for the wrapper */
  className?: string;
  /** Milliseconds to wait before starting (default 0) */
  startDelay?: number;
  /** Font-family override */
  fontFamily?: string;
}

export function GlitchTitle({
  text,
  sizeCls = 'text-5xl md:text-7xl',
  className = '',
  startDelay = 0,
  fontFamily = 'Helvetica, Cairo, Arial, sans-serif',
}: Props) {
  const letters = useMemo(() => text.split(''), [text]);

  const [display,      setDisplay]      = useState<string[]>(() => letters.map(c => c === ' ' ? ' ' : '◈'));
  const [resolvedIdx,  setResolvedIdx]  = useState(-1);     // how many chars are locked
  const [phase,        setPhase]        = useState<Phase>('scramble');
  const [scanPct,      setScanPct]      = useState(0);      // 0–100
  const [glitch,       setGlitch]       = useState(false);
  const [glitchX,      setGlitchX]      = useState(0);

  const rafRef   = useRef(0);
  const phaseRef = useRef<Phase>('scramble');

  // ── Animation loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    phaseRef.current = 'scramble';
    setDisplay(letters.map(c => c === ' ' ? ' ' : '◈'));
    setResolvedIdx(-1);
    setPhase('scramble');
    setScanPct(0);

    const SCRAMBLE_MS = 620;
    const REVEAL_MS   = Math.max(800, letters.length * 55);
    const SCAN_MS     = 550;

    let raf = 0;
    let started = false;

    const delayId = setTimeout(() => {
      started = true;
      const startTime = Date.now();

      const tick = () => {
        const now = Date.now();
        const el  = now - startTime;
        const ph  = phaseRef.current;

        if (ph === 'scramble') {
          if (el < SCRAMBLE_MS) {
            setDisplay(letters.map(c =>
              c === ' ' ? ' ' : RUNES[Math.floor(Math.random() * RUNES.length)]
            ));
            raf = requestAnimationFrame(tick);
          } else {
            phaseRef.current = 'reveal';
            raf = requestAnimationFrame(tick);
          }
        } else if (ph === 'reveal') {
          const revEl = el - SCRAMBLE_MS;
          if (revEl < REVEAL_MS) {
            const resolved = Math.floor((revEl / REVEAL_MS) * letters.length);
            setDisplay(letters.map((c, i) =>
              c === ' ' ? ' ' : (i < resolved ? c : RUNES[Math.floor(Math.random() * RUNES.length)])
            ));
            setResolvedIdx(resolved);
            raf = requestAnimationFrame(tick);
          } else {
            setDisplay(letters);
            setResolvedIdx(letters.length);
            phaseRef.current = 'scan';
            raf = requestAnimationFrame(tick);
          }
        } else if (ph === 'scan') {
          const scanEl = el - SCRAMBLE_MS - REVEAL_MS;
          if (scanEl < SCAN_MS) {
            setScanPct((scanEl / SCAN_MS) * 110);
            raf = requestAnimationFrame(tick);
          } else {
            setScanPct(110);
            phaseRef.current = 'done';
            setPhase('done');
          }
        }
      };

      raf = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(delayId);
      cancelAnimationFrame(raf);
    };
  }, [text, startDelay]); // restart if text changes (language switch)

  // ── Periodic RGB glitch ─────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'done') return;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;

    const flash = (cb: () => void) => {
      setGlitch(true);
      setGlitchX((Math.random() - 0.5) * 6);
      t2 = setTimeout(() => {
        setGlitch(false);
        t3 = setTimeout(cb, 90 + Math.random() * 120);
      }, 110 + Math.random() * 130);
    };

    const schedule = () => {
      t1 = setTimeout(() => flash(() => schedule()), 5000 + Math.random() * 8000);
    };
    schedule();

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase]);

  const isDone = phase === 'done';
  const isScanning = phaseRef.current === 'scan' || (!isDone && scanPct > 0 && scanPct < 110);
  const isRTL = /[؀-ۿ]/.test(text); // detect Arabic

  const baseTextStyle: React.CSSProperties = {
    fontFamily,
    fontWeight: 900,
    letterSpacing: isRTL ? '-0.01em' : '-0.03em',
    display: 'block',
    lineHeight: 1.0,
  };

  return (
    <div
      className={`relative inline-block ${sizeCls} ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ── RGB glitch layers ── */}
      {isDone && glitch && (
        <>
          <span aria-hidden style={{
            ...baseTextStyle,
            position: 'absolute', inset: 0,
            transform: `translateX(${glitchX + 5}px) scaleY(1.03)`,
            background: 'linear-gradient(90deg,#ff2255,#ff5500)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', opacity: 0.55,
          }}>
            {text}
          </span>
          <span aria-hidden style={{
            ...baseTextStyle,
            position: 'absolute', inset: 0,
            transform: `translateX(${glitchX - 5}px) scaleY(0.97)`,
            background: 'linear-gradient(90deg,#00eeff,#0066ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', opacity: 0.55,
          }}>
            {text}
          </span>
        </>
      )}

      {/* ── Main text ── */}
      {isDone ? (
        /* Flowing gradient — CSS animation only, zero re-renders */
        <span style={{
          ...baseTextStyle,
          background: 'linear-gradient(90deg,#90e0f8 0%,#29acf0 22%,#818cf8 50%,#a78bfa 72%,#29acf0 100%)',
          backgroundSize: '300% 100%',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gtGrad 6s ease-in-out infinite',
          filter: 'drop-shadow(0 0 18px rgba(41,172,240,0.35))',
        }}>
          {text}
        </span>
      ) : (
        /* Scramble/reveal — per-character render */
        <span style={baseTextStyle}>
          {display.map((ch, i) => {
            const resolved = i < resolvedIdx;
            const isSpace  = letters[i] === ' ';
            return (
              <span key={i} style={{
                display: 'inline',
                color: isSpace ? 'transparent'
                  : resolved ? '#7dd8f8'
                  : 'rgba(41,172,240,0.28)',
                fontFamily: resolved
                  ? fontFamily
                  : `'Courier New', monospace`,
                textShadow: resolved
                  ? '0 0 18px rgba(41,172,240,0.75), 0 0 6px rgba(125,216,248,0.5)'
                  : 'none',
                transition: 'color 0.12s ease, text-shadow 0.12s ease',
              }}>
                {ch}
              </span>
            );
          })}
        </span>
      )}

      {/* ── Scan line overlay ── */}
      {isScanning && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(125,216,248,0.6) 48%, rgba(255,255,255,0.8) 50%, rgba(125,216,248,0.6) 52%, transparent 100%)',
            clipPath: `inset(0 ${Math.max(0, 100 - scanPct)}% 0 0)`,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        />
      )}

      <style>{`
        @keyframes gtGrad {
          0%   { background-position: 0% center; }
          50%  { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
      `}</style>
    </div>
  );
}
