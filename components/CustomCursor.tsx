import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── Site palette ────────────────────────────────────────────────────────────
// accent-400 : #818cf8  (bright indigo, highlights / spikes)
// accent-500 : #6366f1  (core indigo, body stroke / iris)
// deep-body  : #1a1033  (near-black indigo, dragon fill)
// mid        : #312e81  (mid indigo, secondary strokes)
// dark       : #1e1b4b  (deep indigo shade)
// smoke      : #0f0e2a  (almost black indigo, smoke)
// particle fire sweeps from 240° (indigo) → 270° (violet) → 290° (purple)
// ─────────────────────────────────────────────────────────────────────────────

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; decay: number;
  type: 'fire' | 'shard' | 'ember' | 'smoke';
  r?: number; hue?: number;
  w?: number; h?: number;
  rot?: number; rotv?: number;
  col?: string;
}

const TAIL_COUNT = 16;
const HIST_LEN   = 120;
const SEG_GAP    = 5;

// Tail segment color ramp: bright indigo → deep indigo → near-black
const SEG_COLORS = ['#6366f1', '#4f46e5', '#3730a3', '#1e1b4b'];

const CustomCursor: React.FC = () => {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const cursorRef  = useRef<HTMLDivElement>(null);
  const segRefs    = useRef<(HTMLDivElement | null)[]>([]);

  const mouse       = useRef({ x: -500, y: -500 });
  const cur         = useRef({ x: -500, y: -500 });
  const angle       = useRef(0);
  const scale       = useRef(1);
  const targetScale = useRef(1);
  const isVisible   = useRef(false);
  const hovering    = useRef(false);
  const particles   = useRef<Particle[]>([]);
  const histX       = useRef<number[]>(Array(HIST_LEN).fill(-500));
  const histY       = useRef<number[]>(Array(HIST_LEN).fill(-500));
  const histIdx     = useRef(0);
  const rafRef      = useRef<number>(0);

  const [mounted, setMounted] = useState(false);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Click → shatter in indigo shards + violet embers
  const spawnShatter = useCallback((x: number, y: number) => {
    for (let i = 0; i < 22; i++) {
      const a  = (i / 22) * Math.PI * 2 + Math.random() * 0.3;
      const sp = 3.5 + Math.random() * 6;
      particles.current.push({
        x, y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 1.5,
        life: 1, decay: 0.026 + Math.random() * 0.022,
        w: 5 + Math.random() * 10, h: 1.5 + Math.random() * 3,
        rot: Math.random() * Math.PI * 2,
        rotv: (Math.random() - 0.5) * 0.35,
        type: 'shard',
        col: Math.random() < 0.5 ? '#6366f1' : '#312e81',
      });
    }
    for (let i = 0; i < 14; i++) {
      const a  = Math.random() * Math.PI * 2;
      const sp = 1.5 + Math.random() * 4;
      particles.current.push({
        x, y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 0.8,
        life: 1, decay: 0.018 + Math.random() * 0.018,
        r: 2 + Math.random() * 3.5,
        type: 'ember',
        // indigo → violet hue range  240–290
        col: `hsl(${240 + Math.random() * 50}, 90%, ${55 + Math.random() * 25}%)`,
      });
    }
  }, []);

  // Continuous energy trail in indigo / violet hues (240–290°)
  const emitFire = useCallback(() => {
    const isHov  = hovering.current;
    const count  = isHov ? 4 : 1;
    const spread = isHov ? 0.7 : 0.3;
    const cx     = cur.current.x;
    const cy     = cur.current.y;
    const ang    = angle.current;

    if (!isHov && Math.random() > 0.45) return;

    for (let i = 0; i < count; i++) {
      const back = ang + Math.PI + (Math.random() - 0.5) * spread;
      const sp   = isHov ? (2 + Math.random() * 4) : (1 + Math.random() * 2.5);
      particles.current.push({
        x: cx + Math.cos(ang) * 10,
        y: cy + Math.sin(ang) * 10,
        vx: Math.cos(back) * sp,
        vy: Math.sin(back) * sp - 0.25,
        life: 1,
        decay: isHov ? 0.016 : 0.030,
        r: isHov ? (4 + Math.random() * 5) : (2 + Math.random() * 3),
        type: 'fire',
        hue: 240 + Math.random() * 50,   // 240 indigo → 290 violet
      });
    }

    if (isHov && Math.random() < 0.25) {
      particles.current.push({
        x: cx, y: cy,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -1.8 - Math.random() * 1.5,
        life: 1, decay: 0.01,
        r: 10 + Math.random() * 14,
        type: 'smoke',
      });
    }
  }, []);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible.current) {
        isVisible.current = true;
        if (cursorRef.current) cursorRef.current.style.opacity = '1';
        segRefs.current.forEach(s => { if (s) s.style.opacity = '1'; });
      }
      const t = e.target as HTMLElement;
      const clickable =
        t.tagName === 'A' || t.tagName === 'BUTTON' ||
        t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' ||
        !!t.closest('a') || !!t.closest('button');
      hovering.current = clickable;
      targetScale.current = clickable ? 1.4 : 1;
    };

    const onLeave = () => {
      isVisible.current = false;
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      segRefs.current.forEach(s => { if (s) s.style.opacity = '0'; });
    };
    const onEnter = () => { isVisible.current = true; };
    const onDown  = (e: MouseEvent) => { targetScale.current = 0.65; spawnShatter(e.clientX, e.clientY); };
    const onUp    = () => { targetScale.current = hovering.current ? 1.4 : 1; };

    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);

    const ctx = canvas.getContext('2d')!;

    const loop = () => {
      cur.current.x = lerp(cur.current.x, mouse.current.x, 0.15);
      cur.current.y = lerp(cur.current.y, mouse.current.y, 0.15);
      scale.current = lerp(scale.current, targetScale.current, 0.1);

      const dx = mouse.current.x - cur.current.x;
      const dy = mouse.current.y - cur.current.y;
      if (Math.hypot(dx, dy) > 0.5) angle.current = Math.atan2(dy, dx);

      const deg = angle.current * (180 / Math.PI) + 90;
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${cur.current.x - 26}px, ${cur.current.y - 26}px) rotate(${deg}deg) scale(${scale.current})`;
      }

      histX.current[histIdx.current] = cur.current.x;
      histY.current[histIdx.current] = cur.current.y;
      histIdx.current = (histIdx.current + 1) % HIST_LEN;

      for (let i = 0; i < TAIL_COUNT; i++) {
        const idx = (histIdx.current - 1 - i * SEG_GAP + HIST_LEN * 10) % HIST_LEN;
        const seg = segRefs.current[i];
        if (!seg) continue;
        const sz = Math.max(4, 20 - i * 1.1);
        const sc = Math.max(0.08, (1 - i / TAIL_COUNT) * scale.current);
        seg.style.transform =
          `translate(${histX.current[idx] - sz}px, ${histY.current[idx] - sz}px) scale(${sc})`;
      }

      emitFire();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = particles.current;
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.97; p.vy *= 0.97;
        p.life -= p.decay;
        if (p.life <= 0) { pts.splice(i, 1); continue; }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);

        if (p.type === 'fire' && p.r !== undefined && p.hue !== undefined) {
          // Core: bright white-indigo center → indigo mid → transparent edge
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * p.life + 2);
          g.addColorStop(0,   `hsla(${p.hue + 20}, 100%, 90%, 1)`);
          g.addColorStop(0.35,`hsla(${p.hue},      100%, 60%, 0.85)`);
          g.addColorStop(1,   `hsla(${p.hue - 10}, 80%,  20%, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * p.life + 2, 0, Math.PI * 2);
          ctx.fill();

        } else if (p.type === 'smoke' && p.r !== undefined) {
          ctx.globalAlpha = p.life * 0.06;
          ctx.fillStyle   = '#1e1b4b';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (2 - p.life), 0, Math.PI * 2);
          ctx.fill();

        } else if (
          p.type === 'shard' &&
          p.rot !== undefined && p.rotv !== undefined &&
          p.w   !== undefined && p.h   !== undefined
        ) {
          p.rot += p.rotv; p.vy += 0.14;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle   = p.col ?? '#6366f1';
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w * p.life, p.h);
          ctx.strokeStyle = '#818cf8';
          ctx.lineWidth   = 0.5;
          ctx.strokeRect(-p.w / 2, -p.h / 2, p.w * p.life, p.h);

        } else if (p.type === 'ember' && p.r !== undefined) {
          p.vy += 0.09;
          ctx.fillStyle = p.col ?? '#818cf8';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize',      resize);
      window.removeEventListener('mousemove',   onMove);
      window.removeEventListener('mouseleave',  onLeave);
      window.removeEventListener('mouseenter',  onEnter);
      window.removeEventListener('mousedown',   onDown);
      window.removeEventListener('mouseup',     onUp);
    };
  }, [mounted, emitFire, spawnShatter]);

  const segSvgs = Array.from({ length: TAIL_COUNT }, (_, i) => {
    const sz = Math.max(4, 20 - i * 1.1);
    const op = Math.max(0.04, 0.78 - i * 0.046).toFixed(2);
    const c  = SEG_COLORS[Math.min(Math.floor(i / 4), SEG_COLORS.length - 1)];
    // scale lines in indigo-900
    const lc = '#1e1b4b';
    return { sz, op, c, lc };
  });

  if (!mounted) return null;

  return (
    <>
      {/* Energy / particle canvas — screen blend so particles glow over dark bg */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99997]"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Tail segments */}
      {segSvgs.map(({ sz, op, c, lc }, i) => (
        <div
          key={i}
          ref={el => { segRefs.current[i] = el; }}
          className="fixed top-0 left-0 pointer-events-none z-[99998]"
          style={{ opacity: 0, willChange: 'transform' }}
        >
          <svg width={sz * 2 + 2} height={sz * 2 + 2} viewBox={`0 0 ${sz * 2 + 2} ${sz * 2 + 2}`}>
            <polygon
              points={`${sz + 1},1 ${sz * 2 + 1},${sz + 1} ${sz + 1},${sz * 2 + 1} 1,${sz + 1}`}
              fill={c} opacity={op}
            />
            <line x1={sz * 0.55 + 1} y1={sz * 0.55 + 1} x2={sz * 1.45 + 1} y2={sz * 0.55 + 1} stroke={lc} strokeWidth="0.5"/>
            <line x1={sz * 0.4  + 1} y1={sz + 1}         x2={sz * 1.6  + 1} y2={sz + 1}         stroke={lc} strokeWidth="0.5"/>
          </svg>
        </div>
      ))}

      {/* Dragon head — full indigo palette */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ opacity: 0, willChange: 'transform', width: 52, height: 52 }}
      >
        <svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="dfg">
              <feGaussianBlur stdDeviation="0.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <g filter="url(#dfg)" transform="translate(1,1)">

            {/* ── Body shell ── */}
            <polygon
              points="25,2 30,10 36,6 33,14 42,12 37,20 45,22 37,25 42,33 33,30 35,40 27,34 25,44 23,34 15,40 17,30 8,33 13,25 5,22 13,20 8,12 17,14 14,6 20,10"
              fill="#1a1033" stroke="#6366f1" strokeWidth="1.2" strokeLinejoin="round"
            />
            {/* Inner depth halves */}
            <polygon
              points="25,5 28,11 32,8 30,13 37,12 33,18 40,20 33,23 38,29 30,27 32,35 25,30"
              fill="#0f0d26" stroke="#4f46e5" strokeWidth="0.6" opacity="0.7"
            />
            <polygon
              points="25,5 22,11 18,8 20,13 13,12 17,18 10,20 17,23 12,29 20,27 18,35 25,30"
              fill="#0f0d26" stroke="#4f46e5" strokeWidth="0.6" opacity="0.7"
            />

            {/* ── Spikes — bright accent-400 ── */}
            <polygon points="25,2 21,6 23,4"  fill="#818cf8" opacity="0.95"/>
            <polygon points="25,2 29,6 27,4"  fill="#6366f1" opacity="0.95"/>
            <polygon points="5,22 2,17 7,21"  fill="#818cf8" opacity="0.85"/>
            <polygon points="45,22 48,17 43,21" fill="#818cf8" opacity="0.85"/>
            <polygon points="8,12 4,8 9,13"   fill="#6366f1" opacity="0.75"/>
            <polygon points="42,12 46,8 41,13" fill="#6366f1" opacity="0.75"/>
            <polygon points="8,33 4,37 9,32"  fill="#6366f1" opacity="0.75"/>
            <polygon points="42,33 46,37 41,32" fill="#6366f1" opacity="0.75"/>

            {/* ── Horn / wing ridges ── */}
            <path d="M17,10 Q14,13 15,16 Q16,19 14,22" fill="none" stroke="#6366f1" strokeWidth="0.9"/>
            <path d="M33,10 Q36,13 35,16 Q34,19 36,22" fill="none" stroke="#6366f1" strokeWidth="0.9"/>
            <path d="M12,26 Q9,28 10,31"  fill="none" stroke="#4f46e5" strokeWidth="0.7"/>
            <path d="M38,26 Q41,28 40,31" fill="none" stroke="#4f46e5" strokeWidth="0.7"/>

            {/* ── Eyes — outer socket ── */}
            <ellipse cx="19" cy="21" rx="4.5" ry="3.5" fill="#07061a" stroke="#6366f1" strokeWidth="0.9"/>
            <ellipse cx="31" cy="21" rx="4.5" ry="3.5" fill="#07061a" stroke="#6366f1" strokeWidth="0.9"/>
            {/* Iris — bright accent */}
            <ellipse cx="19" cy="21" rx="2.8" ry="3"   fill="#818cf8" opacity="0.95"/>
            <ellipse cx="31" cy="21" rx="2.8" ry="3"   fill="#818cf8" opacity="0.95"/>
            {/* Slit pupil */}
            <ellipse cx="19.5" cy="21" rx="1.2" ry="2.2" fill="#07061a"/>
            <ellipse cx="31.5" cy="21" rx="1.2" ry="2.2" fill="#07061a"/>
            {/* Eye highlight — pure white glint */}
            <circle cx="19" cy="20" r="0.7" fill="#e0e7ff" opacity="0.95"/>
            <circle cx="31" cy="20" r="0.7" fill="#e0e7ff" opacity="0.95"/>

            {/* ── Fang row ── */}
            <path
              d="M17,30 L19,28 L21,31 L23,27 L25,31 L27,27 L29,31 L31,28 L33,30"
              fill="none" stroke="#6366f1" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round"
            />
            {/* Mouth arc */}
            <path d="M21,33 Q25,37 29,33" fill="#312e81" stroke="#6366f1" strokeWidth="0.8"/>

            {/* ── Tail prongs ── */}
            <path d="M25,44 L22,48 M25,44 L28,48"  fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M25,46 L19,50 M25,46 L31,50"  fill="none" stroke="#312e81" strokeWidth="0.8" strokeLinecap="round"/>

            {/* ── Scale texture lines ── */}
            <line x1="10" y1="15" x2="14" y2="17" stroke="#312e81" strokeWidth="0.5"/>
            <line x1="10" y1="18" x2="14" y2="19" stroke="#312e81" strokeWidth="0.5"/>
            <line x1="40" y1="15" x2="36" y2="17" stroke="#312e81" strokeWidth="0.5"/>
            <line x1="40" y1="18" x2="36" y2="19" stroke="#312e81" strokeWidth="0.5"/>
            <line x1="16" y1="10" x2="18" y2="14" stroke="#312e81" strokeWidth="0.5"/>
            <line x1="34" y1="10" x2="32" y2="14" stroke="#312e81" strokeWidth="0.5"/>
          </g>
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
