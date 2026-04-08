import { useState, useRef, useEffect } from 'react';
import { useAnimation } from 'framer-motion';

/**
 * Encapsulates all hanging calendar physics:
 *  - initial load swing
 *  - idle sway loop
 *  - click-based directional force swing
 */
export function useCalendarMotion() {
  const controls = useAnimation();
  const calendarRef = useRef(null);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);

  useEffect(() => {
    if (!hasLoadedInitial) {
      controls.start({
        rotate: [0, 6, -5, 3, -2, 0],
        transition: {
          duration: 2.5,
          ease: 'easeOut',
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        },
      });
      setHasLoadedInitial(true);

      setTimeout(() => {
        startIdleSway();
      }, 2500);
    }
  }, [controls, hasLoadedInitial]);

  function startIdleSway() {
    controls.start({
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 5.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    });
  }

  function handleSwing(e) {
    if (!calendarRef.current) return;
    const rect = calendarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const direction = clickX < rect.width / 2 ? -1 : 1;
    const baseForce = 3;
    const verticalMultiplier = (clickY / rect.height) * 2;
    const amplitude = (baseForce + verticalMultiplier) * direction;

    controls.stop();
    controls
      .start({
        rotate: [0, amplitude, -amplitude * 0.7, amplitude * 0.4, -amplitude * 0.2, 0],
        transition: {
          duration: 1.8,
          ease: [0.34, 1.56, 0.64, 1],
          times: [0, 0.25, 0.5, 0.7, 0.85, 1],
        },
      })
      .then(() => startIdleSway());
  }

  return { controls, calendarRef, handleSwing };
}
