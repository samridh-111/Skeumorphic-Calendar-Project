import React from 'react';

/**
 * A single calendar day cell with range-aware visual states.
 *
 * @param {{
 *   day: number,
 *   isRangeStart: boolean,
 *   isRangeEnd: boolean,
 *   isInRange: boolean,
 *   isPrevMonth: boolean,
 *   onClick: () => void,
 *   variant: 'desktop' | 'mobile'
 * }} props
 */
export default function DateCell({
  day,
  isRangeStart = false,
  isRangeEnd   = false,
  isInRange    = false,
  isPrevMonth  = false,
  onClick,
  variant      = 'desktop',
}) {
  const isEndpoint = isRangeStart || isRangeEnd;

  const heightClass = variant === 'mobile' ? 'h-10' : 'h-10';
  const textSize    = variant === 'mobile' ? 'text-base' : 'text-lg';

  if (isPrevMonth) {
    return (
      <div className={`${heightClass} flex items-center justify-center font-serif ${textSize} text-gray-400`}>
        {day}
      </div>
    );
  }

  if (isEndpoint) {
    return (
      <div
        className={`relative ${heightClass} flex items-center justify-center z-10 cursor-pointer`}
        onClick={onClick}
      >
        {/* Half-strip connecting to adjacent range cell */}
        <div
          className={`absolute inset-0 ${
            isRangeStart ? 'left-1/2 rounded-l-full' : 'right-1/2 rounded-r-full'
          } bg-gray-200/60`}
        />
        {variant === 'mobile' ? (
          <>
            <div className="absolute inset-0 bg-gray-900 rounded-full z-10 w-8 h-8 m-auto flex items-center justify-center">
              <span className="text-white font-bold text-base">{day}</span>
            </div>
            <div
              className={`absolute ${
                isRangeStart ? 'right-0' : 'left-0'
              } top-1/2 -translate-y-1/2 w-1/2 h-8 bg-gray-900/10 z-0`}
            />
          </>
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center z-20 shadow-lg font-serif text-lg font-semibold">
            {day}
          </div>
        )}
      </div>
    );
  }

  if (isInRange) {
    return (
      <div
        className={`relative ${heightClass} flex items-center justify-center z-10 ${
          variant === 'mobile' ? 'font-serif text-lg text-gray-900 bg-gray-900/10' : 'bg-gray-200/60'
        } cursor-pointer`}
        onClick={onClick}
      >
        <span className={`font-serif ${textSize} text-gray-900 font-medium`}>{day}</span>
      </div>
    );
  }

  return (
    <div
      className={`${heightClass} flex items-center justify-center font-serif ${textSize} text-gray-900 cursor-pointer hover:text-gray-500 transition-colors`}
      onClick={onClick}
    >
      {day}
    </div>
  );
}
