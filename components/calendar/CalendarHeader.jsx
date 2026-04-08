import React from 'react';

const DAYS_DESKTOP = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_MOBILE  = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * Day-of-week header row.
 * @param {{ variant: 'desktop' | 'mobile' }} props
 */
export default function CalendarHeader({ variant = 'desktop' }) {
  const days = variant === 'mobile' ? DAYS_MOBILE : DAYS_DESKTOP;

  return (
    <div className="grid grid-cols-7 mb-2">
      {days.map((day, i) =>
        variant === 'mobile' ? (
          <div
            key={i}
            className="text-center font-serif text-xs font-bold text-gray-400 tracking-widest py-2"
          >
            {day}
          </div>
        ) : (
          <div
            key={day}
            className="text-center font-serif text-xs uppercase tracking-[0.2em] text-gray-600 font-semibold"
          >
            {day}
          </div>
        )
      )}
    </div>
  );
}
