import React, { useEffect, useRef, useState } from 'react';

const CIRC = 2 * Math.PI * 50; // circumference for r=50

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const DURATION = 1800;
    const start = Date.now();
    let raf = 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setTimeout(() => {
          setFading(true);
          setTimeout(onDone, 550);
        }, 220);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const offset = CIRC * (1 - progress / 100);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-[9999]"
      style={{
        background: '#0b0f1a',
        transition: 'opacity 0.55s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(41,172,240,0.07) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(100,100,255,0.05) 0%, transparent 70%)', animation: 'pulse 3s ease-in-out infinite' }} />
      </div>

      {/* Ring + logo */}
      <div className="relative mb-7">
        {/* Outer decorative ring */}
        <svg width="140" height="140" className="absolute inset-0" style={{ transform: 'rotate(-90deg) scale(1.18)' }}>
          <circle cx="70" cy="70" r="62" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        </svg>

        {/* Progress ring */}
        <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#29acf0" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle cx="70" cy="70" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          {/* Progress arc */}
          <circle
            cx="70" cy="70" r="50"
            fill="none"
            stroke="url(#lg)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 80ms linear', filter: 'drop-shadow(0 0 6px rgba(41,172,240,0.6))' }}
          />
          {/* Glowing head dot */}
          {progress > 2 && progress < 99 && (() => {
            const angle = ((progress / 100) * 360 - 90) * (Math.PI / 180);
            const hx = 70 + 50 * Math.cos(angle);
            const hy = 70 + 50 * Math.sin(angle);
            return <circle cx={hx} cy={hy} r="4" fill="#29acf0" style={{ filter: 'drop-shadow(0 0 4px #29acf0)' }} />;
          })()}
        </svg>

        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className="text-2xl font-black tracking-tight leading-none"
              style={{ fontFamily: 'Cairo, sans-serif', color: '#fff' }}
            >
              Rivo<span style={{ color: '#29acf0' }}>+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress text */}
      <div className="text-white/40 text-xs font-semibold tracking-[0.25em] mb-4">
        {Math.floor(progress).toString().padStart(3, '0')}%
      </div>

      {/* Bouncing dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: '#29acf0',
              animation: `bounce 1.2s ${i * 0.18}s ease-in-out infinite`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Scan line */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(41,172,240,0.15), transparent)',
          animation: 'scanline 3s linear infinite',
        }}
      />

      <style>{`
        @keyframes scanline {
          0%   { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%            { transform: translateY(-7px); }
        }
      `}</style>
    </div>
  );
}
