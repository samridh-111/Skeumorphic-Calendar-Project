import { useState, useRef, useCallback } from 'react';
import { useMotionValue, animate } from 'framer-motion';
import { currentMonthStart, shiftMonth } from '../utils/calendar';

/**
 * Manages the 3D page-flip animation for the hanging calendar.
 *
 * NEXT: flipAngle 0 → 180  (front page peels upward, towards viewer)
 * PREV: flipAngle 180 → 0  (front page drops down from top)
 *
 * The "front" animated layer is always the page that MOVES:
 *   NEXT → currentMonth moves away, pendingMonth is revealed behind
 *   PREV → pendingMonth moves in from 180, currentMonth is behind
 */
export function usePageFlip() {
  const [currentMonth, setCurrentMonth] = useState(currentMonthStart);
  const [pendingMonth, setPendingMonth] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState('next');
  const flipAngle = useMotionValue(0);
  const busy = useRef(false);

  const executeFlip = useCallback(async (toMonth, direction, startAngle = null) => {
    if (busy.current) return;
    busy.current = true;
    setIsFlipping(true);
    setFlipDir(direction);
    setPendingMonth(toMonth);

    const from = startAngle !== null ? startAngle : (direction === 'next' ? 0 : 180);
    const to   = direction === 'next' ? 180 : 0;
    flipAngle.set(from);

    await animate(flipAngle, to, {
      duration: 0.8, // Slightly slower for a more physical feel
      ease: [0.22, 1.0, 0.36, 1.0], // expo-out 
    });

    setCurrentMonth(toMonth);
    setPendingMonth(null);
    setIsFlipping(false);
    flipAngle.set(0);
    busy.current = false;
  }, [flipAngle]);

  const flipToNext = useCallback((startAngle) => {
    executeFlip(shiftMonth(currentMonth, 1), 'next', startAngle);
  }, [currentMonth, executeFlip]);

  const flipToPrev = useCallback((startAngle) => {
    executeFlip(shiftMonth(currentMonth, -1), 'prev', startAngle);
  }, [currentMonth, executeFlip]);

  const flipToToday = useCallback(() => {
    const today = currentMonthStart();
    const same  =
      today.getFullYear() === currentMonth.getFullYear() &&
      today.getMonth()    === currentMonth.getMonth();
    if (same) return;
    executeFlip(today, today > currentMonth ? 'next' : 'prev');
  }, [currentMonth, executeFlip]);

  return {
    currentMonth,
    pendingMonth,
    isFlipping,
    flipDir,
    flipAngle,
    flipToNext,
    flipToPrev,
    flipToToday,
  };
}
