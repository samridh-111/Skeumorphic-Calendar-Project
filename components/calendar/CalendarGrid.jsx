import React from 'react';
import CalendarHeader from './CalendarHeader';
import DateCell from './DateCell';
import { getDaysInMonth, getPrevMonthTrailingDays } from '../../utils/calendar';

/**
 * Shared calendar grid for both desktop and mobile.
 * All day rendering and range state live here — no duplication.
 *
 * @param {{
 *   variant: 'desktop' | 'mobile',
 *   currentMonth: Date,
 *   startDate: number | null,
 *   endDate: number | null,
 *   onSelectDate: (day: number) => void
 * }} props
 */
export default function CalendarGrid({
  variant = 'desktop',
  currentMonth,
  startDate,
  endDate,
  onSelectDate,
}) {
  const daysInMonth      = getDaysInMonth(currentMonth);
  const prevTrailingDays = getPrevMonthTrailingDays(currentMonth);

  const gapClass     = variant === 'mobile' ? 'gap-y-0' : 'gap-y-1';
  const wrapperClass = variant === 'mobile' ? 'px-4 pb-4' : 'w-full md:w-7/12 p-6 bg-white paper-texture';

  return (
    <div className={wrapperClass}>
      <CalendarHeader variant={variant} />

      <div className={`grid grid-cols-7 ${gapClass}`}>
        {/* Trailing days from previous month */}
        {prevTrailingDays.map((d) => (
          <DateCell key={`prev-${d}`} day={d} isPrevMonth variant={variant} />
        ))}

        {/* Current month days */}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;

          const isRangeStart = day === startDate;
          const isRangeEnd   = day === endDate;
          const isInRange    =
            startDate !== null &&
            endDate   !== null &&
            day > startDate &&
            day < endDate;

          return (
            <DateCell
              key={day}
              day={day}
              isRangeStart={isRangeStart}
              isRangeEnd={isRangeEnd}
              isInRange={isInRange}
              variant={variant}
              onClick={() => onSelectDate(day)}
            />
          );
        })}
      </div>

      {variant === 'desktop' && (
        <div className="mt-4 flex justify-end">
          <p className="font-serif italic text-gray-400 text-sm tracking-widest">EST. 1924</p>
        </div>
      )}
    </div>
  );
}
