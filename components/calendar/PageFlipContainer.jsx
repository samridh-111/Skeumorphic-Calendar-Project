import React, { useRef, useCallback } from 'react';
import { motion, useTransform, animate } from 'framer-motion';
import CalendarPage from './CalendarPage';

export default function PageFlipContainer({
  variant,
  currentMonth,
  pendingMonth,
  isFlipping,
  flipDir,
  flipAngle,
  flipToNext,
  flipToPrev,
  flipToToday,
  startDate,
  endDate,
  onSelectDate,
  events,
}) {
  const containerRef = useRef(null);
  const dragging     = useRef(false);
  const dragStartY   = useRef(0);
  const dragLive     = useRef(0);

  // When angle is 0, back shadow is 0. 
  // At 90 (peak arch standing up), shadow is darkest.
  // At 180 (fallen backwards), shadow is 0 again.
  const backShadow = useTransform(flipAngle, [0, 90, 180], [0, 0.45, 0]);

  // Front glow gives a slight shine as it lifts
  const frontGlow = useTransform(flipAngle, [0, 45, 90, 135, 180], [0, 0.2, 0.35, 0.1, 0]);

  const frontMonth = (isFlipping && flipDir === 'prev') ? pendingMonth : currentMonth;
  const backMonth  = (isFlipping && flipDir === 'next') ? pendingMonth : currentMonth;

  const navProps = { onPrev: flipToPrev, onNext: flipToNext, onToday: flipToToday };

  const frontProps = {
    variant,
    currentMonth: frontMonth,
    startDate:    isFlipping ? null : startDate,
    endDate:      isFlipping ? null : endDate,
    onSelectDate: isFlipping ? () => {} : onSelectDate,
    events,
    ...navProps,
  };

  const backProps = {
    variant,
    currentMonth: backMonth,
    startDate:    (!isFlipping || flipDir === 'prev') ? startDate : null,
    endDate:      (!isFlipping || flipDir === 'prev') ? endDate   : null,
    onSelectDate: (!isFlipping || flipDir === 'prev') ? onSelectDate : () => {},
    events,
    ...navProps,
  };

  const onPointerDown = useCallback((e) => {
    e.stopPropagation();
    if (isFlipping) return;
    dragging.current   = true;
    dragStartY.current = e.clientY;
    dragLive.current   = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [isFlipping]);

  const onPointerMove = useCallback((e) => {
    if (!dragging.current) return;
    const dy = e.clientY - dragStartY.current; // negative = dragging UP
    const height = containerRef.current?.getBoundingClientRect().height || 500;
    
    if (dy < 0) {
      // 45% of height drag = 180 degree flip
      const progress = Math.min(1, Math.max(0, -dy / (height * 0.45)));
      const angle = progress * 180;
      dragLive.current = angle;
      flipAngle.set(angle);
    }
  }, [flipAngle]);

  const onPointerUp = useCallback(async () => {
    if (!dragging.current) return;
    dragging.current = false;
    const angle = dragLive.current;
    dragLive.current = 0;

    // Autoflip at 45% (81 degrees)
    if (angle > 81) {
      flipToNext(angle);
    } else {
      await animate(flipAngle, 0, { type: 'spring', stiffness: 350, damping: 25 });
    }
  }, [flipAngle, flipToNext]);

  const wrapClass = variant === 'desktop' ? 'max-w-5xl w-full' : 'w-[92%] max-w-md';

  return (
    <div
      ref={containerRef}
      className={wrapClass}
      style={{ position: 'relative', perspective: '2000px', perspectiveOrigin: 'top center' }}
    >
      {/* ── BASE LAYER (Revealed next month) ── */}
      <div style={{ position: 'relative', zIndex: 0 }}>
        <CalendarPage {...backProps} />

        {isFlipping && (
          <motion.div
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
              opacity: backShadow,
            }}
          />
        )}
      </div>

      {/* ── FRONTAL FLIP LAYER (Provides 3D space for double-sided sheet) ── */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          transformStyle: 'preserve-3d',
          rotateX: flipAngle,
          transformOrigin: 'top center',
          willChange: 'transform',
        }}
      >
        {/* FACE A: Current Calendar Page */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(1px)' }}>
          <CalendarPage {...frontProps} />
          <motion.div
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(to top, rgba(255,255,255,0.4) 0%, transparent 40%)',
              opacity: frontGlow,
            }}
          />
        </div>

        {/* FACE B: Blank Paper Back (Revealed as it flips up and over) */}
        <div style={{ 
            position: 'absolute', inset: 0, 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
            backgroundColor: '#fefdfa',
            boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.05)'
        }} className="paper-texture flex items-center justify-center">
            {/* Subtle paper structure / bleed-through could go here */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent mix-blend-multiply" />
        </div>
      </motion.div>

      {/* ── DRAG HANDLE ── */}
      {!isFlipping && (
        <div
          style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 80, height: 80, zIndex: 20, touchAction: 'none',
            cursor: 'grab',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 60, height: 60,
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            background: 'linear-gradient(225deg, #ece9e3 0%, #d8d3cb 50%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 4, right: 4,
            width: 42, height: 42,
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            background: 'rgba(0,0,0,0.1)',
            filter: 'blur(4px)',
          }} />
          <div style={{
            position: 'absolute', bottom: 12, right: 14,
            fontSize: 10, color: 'rgba(0,0,0,0.4)',
            fontFamily: 'serif', lineHeight: 1, userSelect: 'none',
            transform: 'rotate(-45deg)',
          }}>
            ▲
          </div>
        </div>
      )}
    </div>
  );
}
