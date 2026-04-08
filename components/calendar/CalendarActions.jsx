import React from 'react';

/**
 * Spiral binding strip rendered at the top of the calendar.
 * @param {{ count: number }} props
 */
export default function CalendarActions({ count = 12 }) {
  return (
    <div className="bg-gray-100 h-10 w-full flex justify-around items-center px-8 border-b border-gray-300/20">
      <div className="flex justify-between w-full max-w-4xl mx-auto">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-12 -mt-6 bg-gradient-to-b from-gray-400 to-gray-300 rounded-full border border-black/10 shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}
