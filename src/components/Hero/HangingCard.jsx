import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import tejasPhoto from '../../assets/tejas_id_photo.png';

/* ─── Centerpiece Card dimensions ─── */
const CARD_W = 360;
const CARD_HALF = CARD_W / 2;
const REST_Y = 195; /* px from container top to card top */

export default function HangingCard({ onLoaded }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  /* ─── Physics State ─────────────────────────────────────── */
  const initialCX = typeof window !== 'undefined'
    ? Math.round(Math.min(window.innerWidth * 0.46, 500) / 2)
    : 220;

  const ph = useRef({
    x: initialCX, y: REST_Y,
    vx: 0, vy: 0,
    angle: 0, vAngle: 0,
    twist: 0, vTwist: 0,
    restX: initialCX,
    targetX: initialCX, targetY: REST_Y,
    hoverNX: 0, hoverNY: 0,
    isDragging: false, isHovered: false, isDroppedIn: false,
    dragStartX: 0, dragStartY: 0,
    dragStartScrollY: 0,
    cardStartX: 0, cardStartY: 0,
    idleT: Math.random() * 100,
  });

  const [xfm, setXfm] = useState({
    x: initialCX, y: -540, angle: -12, twist: 0,
    tiltX: 0, tiltY: 0, anchorX: initialCX,
  });
  const [cord, setCord] = useState('');

  /* ─── Anchor measurement ─────────────────────────────────── */
  const measureContainer = useCallback(() => {
    if (!containerRef.current) return;
    const cx = containerRef.current.getBoundingClientRect().width / 2;
    ph.current.restX = cx;
    if (!ph.current.isDragging && ph.current.isDroppedIn) {
      ph.current.targetX = cx;
    }
  }, []);

  useLayoutEffect(() => {
    measureContainer();
    window.addEventListener('resize', measureContainer);
    return () => window.removeEventListener('resize', measureContainer);
  }, [measureContainer]);

  /* ─── Drop-in elastic entry animation ────────────────────── */
  useEffect(() => {
    let raf;
    const DURATION = 1400;

    const easeElastic = (t) => {
      const c = 0.4;
      return t === 0 || t === 1 ? t
        : Math.pow(2, -10 * t) * Math.sin(((t - c / 4) * 2 * Math.PI) / c) + 1;
    };

    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const prog = Math.min(1, (ts - t0) / DURATION);
      const ease = easeElastic(prog);

      ph.current.y = -540 + (REST_Y + 540) * ease;
      ph.current.angle = -18 * (1 - prog) * Math.cos(prog * Math.PI * 3);

      if (prog < 1) {
        raf = requestAnimationFrame(step);
      } else {
        ph.current.y = REST_Y;
        ph.current.isDroppedIn = true;
        if (onLoaded) onLoaded();
      }
    };

    const t = setTimeout(() => { raf = requestAnimationFrame(step); }, 100);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [onLoaded]);

  /* ─── 60 fps Physics Loop ────────────────────────────────── */
  useEffect(() => {
    let raf;
    const tick = () => {
      const p = ph.current;
      const ax = p.restX;

      if (p.isDroppedIn) {
        if (p.isDragging) {
          /* track velocity during drag for momentum on release */
          p.vx = (p.targetX - p.x) * 0.38;
          p.vy = (p.targetY - p.y) * 0.38;
          p.x = p.targetX;
          p.y = p.targetY;

          /* angular deflection from drag displacement + speed */
          const tdx = p.x - ax;
          const tAngle = Math.max(-38, Math.min(38, tdx * 0.12 + p.vx * 1.4));
          p.angle += (tAngle - p.angle) * 0.22;

          /* slight 3D lanyard twist on horizontal displacement */
          const tTwist = Math.max(-18, Math.min(18, tdx * 0.08));
          p.twist += (tTwist - p.twist) * 0.2;
        } else {
          /* spring-pendulum physics — tuned for silky smooth realistic swing */
          const kx = 0.024, ky = 0.032, damp = 0.93, grav = 0.14;
          const dx = p.x - ax;
          const dy = p.y - REST_Y;
          p.vx = (p.vx + -kx * dx) * damp;
          p.vy = (p.vy + -ky * dy + grav) * damp;
          p.x += p.vx;
          p.y += p.vy;

          /* rotation follows pendulum dynamics */
          const tAngle = -dx * 0.105;
          const aa = (tAngle - p.angle) * 0.07 - p.vAngle * 0.11;
          p.vAngle = (p.vAngle + aa) * 0.915;
          p.angle += p.vAngle;

          /* twist settling */
          p.vTwist = (p.vTwist - p.twist * 0.08) * 0.88;
          p.twist += p.vTwist;

          /* subtle idle micro-sway when settled */
          p.idleT += 0.018;
          if (Math.abs(p.vx) < 0.07 && Math.abs(p.vy) < 0.07) {
            p.x += Math.sin(p.idleT) * 0.28;
            p.angle += Math.sin(p.idleT * 0.65) * 0.09;
            p.twist += Math.cos(p.idleT * 0.45) * 0.05;
          }
        }
      }

      /* 3-D hover tilt calculations */
      const tiltX = p.isHovered && !p.isDragging ? p.hoverNY * 12 : 0;
      const tiltY = p.isHovered && !p.isDragging ? -p.hoverNX * 15 : 0;

      setXfm({
        x: p.x, y: p.y,
        angle: p.angle, twist: p.twist,
        tiltX, tiltY,
        anchorX: ax
      });

      /* Bezier lanyard path with dynamic stretch curve */
      const cy = p.y - 14; // clip attachment point
      const mcx = ax + (p.x - ax) * 0.32;
      const mcy = 10 + (cy - 10) * 0.52;
      setCord(`M ${ax} 10 Q ${mcx} ${mcy} ${p.x} ${cy}`);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ─── Drag Event Handlers ────────────────────────────────── */
  const releaseDrag = useCallback(() => {
    const p = ph.current;
    p.isDragging = false;
    p.isHovered = false;
  }, []);

  const globalMove = useCallback((e) => {
    const p = ph.current;
    if (!p.isDragging) return;
    const scrollDelta = window.scrollY - p.dragStartScrollY;
    p.targetX = p.cardStartX + (e.clientX - p.dragStartX);
    p.targetY = Math.max(65, Math.min(480,
      p.cardStartY + (e.clientY - p.dragStartY) + scrollDelta));
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', globalMove, { passive: true });
    window.addEventListener('pointerup', releaseDrag);
    window.addEventListener('pointercancel', releaseDrag);
    const onScroll = () => {
      if (ph.current.isDragging) {
        ph.current.dragStartScrollY = window.scrollY;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', globalMove);
      window.removeEventListener('pointerup', releaseDrag);
      window.removeEventListener('pointercancel', releaseDrag);
      window.removeEventListener('scroll', onScroll);
    };
  }, [globalMove, releaseDrag]);

  const onPointerDown = (e) => {
    e.preventDefault();
    const p = ph.current;
    p.isDragging = true;
    p.dragStartX = e.clientX;
    p.dragStartY = e.clientY;
    p.dragStartScrollY = window.scrollY;
    p.cardStartX = p.x;
    p.cardStartY = p.y;
    try { cardRef.current?.setPointerCapture(e.pointerId); } catch (_) { }
  };

  const onPointerMove = (e) => {
    const p = ph.current;
    if (p.isDragging || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    p.hoverNX = (e.clientX - r.left) / r.width - 0.5;
    p.hoverNY = (e.clientY - r.top) / r.height - 0.5;
    p.isHovered = true;
  };

  const onPointerLeave = () => {
    ph.current.isHovered = false;
    ph.current.hoverNX = 0;
    ph.current.hoverNY = 0;
  };

  /* ─── Reactive Dynamic Shadows ───────────────────────────── */
  const shiftX = (xfm.x - xfm.anchorX) * 0.45;
  const shiftY = (xfm.y - REST_Y) * 0.35 + 35;
  const shScale = Math.max(0.72, 1 - Math.abs(xfm.y - REST_Y) * 0.0009);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none touch-none overflow-visible flex justify-center"
      style={{ height: 680, paddingLeft: 100 }}
      onPointerMove={onPointerMove}
    >
      {/* ── Floor Dynamic Soft Depth Shadow ── */}
      <div
        className="pointer-events-none absolute rounded-[100%] z-0"
        style={{
          width: 310,
          height: 95,
          left: `calc(50% - 155px + ${shiftX}px)`,
          top: `calc(${REST_Y + 380}px + ${shiftY}px)`,
          transform: `scale(${shScale}) rotate(${xfm.angle * 0.35}deg)`,
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.88) 0%, rgba(5, 8, 18, 0.4) 50%, transparent 75%)',
          filter: 'blur(28px)',
          opacity: 0.75,
        }}
      />

      {/* ── Realistic Braided Lanyard SVG ── */}
      <svg
        className="absolute inset-0 w-full pointer-events-none z-10 overflow-visible"
        style={{ height: '100%' }}
        aria-hidden
      >
        <defs>
          {/* Braided Lanyard Main Gradient */}
          <linearGradient
            id="braidedBody"
            gradientUnits="userSpaceOnUse"
            x1={xfm.anchorX - 4} y1="0" x2={xfm.anchorX + 4} y2="0"
          >
            <stop offset="0%" stopColor="#080d1a" />
            <stop offset="25%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="75%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#080d1a" />
          </linearGradient>

          {/* Lanyard Edge Highlight */}
          <linearGradient
            id="braidedEdge"
            gradientUnits="userSpaceOnUse"
            x1={xfm.anchorX - 3} y1="0" x2={xfm.anchorX + 3} y2="0"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>

          {/* Ceiling Metallic Mount Gradient */}
          <linearGradient id="metalMount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Soft Shadow Filter for Lanyard */}
          <filter id="lanyardGlow">
            <feDropShadow dx="1.5" dy="4" stdDeviation="3.5" floodColor="#000" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Top Ceiling Anchor Mount Bracket */}
        <rect
          x={xfm.anchorX - 18} y="0" width="36" height="7" rx="3.5"
          fill="url(#metalMount)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"
        />
        {/* Metallic Ring Mount */}
        <circle cx={xfm.anchorX} cy="8" r="5.5" fill="none" stroke="#3B82F6" strokeWidth="2" />
        <circle cx={xfm.anchorX} cy="8" r="2.5" fill="#3B82F6" />

        {/* Lanyard Drop Shadow */}
        {cord && (
          <path
            d={cord} stroke="#000" strokeWidth="9"
            strokeOpacity="0.25" fill="none" filter="url(#lanyardGlow)"
            strokeLinecap="round"
          />
        )}

        {/* Lanyard Base Strap */}
        {cord && (
          <path
            d={cord} stroke="url(#braidedBody)"
            strokeWidth="6.5" strokeLinecap="round" fill="none"
          />
        )}

        {/* Braided Cross-Weave Stitching Pattern Layer 1 */}
        {cord && (
          <path
            d={cord} stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.2" strokeDasharray="3 4"
            strokeLinecap="round" fill="none"
          />
        )}

        {/* Braided Cross-Weave Stitching Pattern Layer 2 (Criss-Cross Offset) */}
        {cord && (
          <path
            d={cord} stroke="rgba(59,130,246,0.4)"
            strokeWidth="1.2" strokeDasharray="3 4" strokeDashoffset="3.5"
            strokeLinecap="round" fill="none"
          />
        )}

        {/* Edge Specular Thread Highlight */}
        {cord && (
          <path
            d={cord} stroke="url(#braidedEdge)"
            strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75"
          />
        )}

        {/* Bottom Swivel Clip Mount attached to Badge */}
        {cord && (
          <g transform={`translate(${xfm.x}, ${xfm.y - 14}) rotate(${xfm.angle})`}>
            {/* Metallic Hook Loop */}
            <path
              d="M -5 -6 C -5 -12 5 -12 5 -6 L 4 0 L -4 0 Z"
              fill="url(#metalMount)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"
            />
            {/* Swivel Pin */}
            <circle cx="0" cy="-6" r="2" fill="#3B82F6" />
          </g>
        )}
      </svg>

      {/* ── Hanging Developer Conference Pass Badge ── */}
      <div
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerUp={releaseDrag}
        onPointerLeave={onPointerLeave}
        className="absolute z-20 cursor-grab active:cursor-grabbing will-change-transform"
        style={{
          left: 0, top: 0,
          width: CARD_W,
          transform: [
            `translate3d(${xfm.x - CARD_HALF}px,${xfm.y}px,0)`,
            `rotate(${xfm.angle}deg)`,
            `rotateY(${xfm.twist}deg)`,
            `rotateX(${xfm.tiltX}deg)`,
            `rotateY(${xfm.tiltY}deg)`,
          ].join(' '),
          transformOrigin: 'top center',
          perspective: 1000,
        }}
      >
        {/* ── Conference Pass Container ── */}
        <div
          className="relative rounded-[14px] overflow-hidden transition-shadow duration-300"
          style={{
            width: CARD_W,
            background: 'linear-gradient(165deg, #0d111d 0%, #070912 60%, #04050a 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: [
              '0 45px 90px -15px rgba(0,0,0,0.95)',
              '0 20px 50px -10px rgba(0,0,0,0.8)',
              '0 0 0 1px rgba(59,130,246,0.2)',
              '0 0 35px rgba(59,130,246,0.08)',
            ].join(','),
          }}
        >
          {/* ── Top Accent Stripe (Electric Blue #3B82F6) ── */}
          <div
            className="h-[5px] w-full"
            style={{ background: 'linear-gradient(90deg, #1d4ed8 0%, #3B82F6 50%, #1d4ed8 100%)' }}
          />

          {/* ── Badge Clip Slot Cutout ── */}
          <div className="absolute -top-[15px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            {/* Metallic Slot Clip Cap */}
            <div
              className="w-[26px] h-[13px] rounded-t-md flex items-end justify-center pb-[1px]"
              style={{ background: 'linear-gradient(180deg, #cbd5e1 0%, #475569 100%)' }}
            >
              <div className="w-[11px] h-[5px] rounded-full bg-slate-950 border border-slate-700" />
            </div>
            {/* Slot Clamp Bar */}
            <div
              className="w-[42px] h-[7px] rounded-sm"
              style={{ background: 'linear-gradient(90deg, #334155, #f1f5f9, #334155)' }}
            />
          </div>

          {/* ── Pass Header Section ── */}
          <div className="px-4 pt-4 pb-2.5 border-b border-white/[0.08] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-white/90 font-mono uppercase leading-none">
                IIIT LUCKNOW
              </p>
            </div>

            {/* Security Holographic Student Pass Pill */}
            <div
              className="px-2.5 py-1 rounded-md text-[8.5px] font-bold font-mono tracking-widest uppercase select-none"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(29,78,216,0.15))',
                border: '1px solid rgba(59,130,246,0.45)',
                color: '#93c5fd',
                boxShadow: 'inset 0 0 10px rgba(59,130,246,0.15)',
              }}
            >
              STUDENT
            </div>
          </div>

          {/* ── Photo Block Section ── */}
          <div className="px-4 pt-3 pb-4">
            {/* User Photo Frame */}
            <div
              className="relative w-full overflow-hidden rounded-lg mb-3 group border border-white/10"
              style={{ height: 310 }}
            >
              <img
                src={tejasPhoto}
                alt="Tejas Janagi"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ objectPosition: 'center 20%' }}
                draggable="false"
              />
              {/* Bottom Dark Gradient Fade */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #070912 0%, transparent 28%)' }}
              />
              {/* Top Subtle Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.06) 0%, transparent 30%)' }}
              />
            </div>

            {/* Department Info Block */}
            <div className="text-left space-y-[3px]">
              <p
                className="font-sans text-[11px] font-bold tracking-wide leading-snug"
                style={{ color: '#3B82F6' }}
              >
                Computer Science &amp; Artificial Intelligence
              </p>
              <p className="font-mono text-[8px] text-white/40 tracking-[0.12em] uppercase">
                IIIT Lucknow · Uttar Pradesh, India
              </p>
            </div>
          </div>



          {/* Corner Security Hologram Iridescent Foil Accent */}
          <div
            className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(circle at bottom right, rgba(59,130,246,0.3) 0%, rgba(37,99,235,0.1) 45%, transparent 70%)',
              borderRadius: '0 0 22px 0',
            }}
          />
        </div>
      </div>
    </div>
  );
}

