import React from 'react';
import CalendarActions from './CalendarActions';
import CalendarHero from './CalendarHero';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';

/**
 * Renders a single complete calendar page (hero + grid + notes).
 * Used as both the "current" and "incoming" face during page flips.
 */
export default function CalendarPage({
  variant = 'desktop',
  currentMonth,
  startDate,
  endDate,
  onSelectDate,
  onPrev,
  onNext,
  onToday,
  events = [],
}) {
  const gridProps = { currentMonth, startDate, endDate, onSelectDate };

  if (variant === 'mobile') {
    return (
      <div className="w-full bg-white overflow-hidden paper-grain">
        <div className="flex justify-around px-4 py-3 bg-gray-200 border-b border-black/5">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-3 h-8 spiral-loop rounded-full shadow-sm" />
          ))}
        </div>
        <CalendarHero variant="mobile" currentMonth={currentMonth} onPrev={onPrev} onNext={onNext} onToday={onToday} />
        <CalendarGrid variant="mobile" {...gridProps} />
        <NotesPanel variant="mobile" currentMonth={currentMonth} events={events} />
      </div>
    );
  }

  return (
    <div className="w-full bg-white overflow-hidden paper-texture">
      <CalendarActions count={12} />
      <CalendarHero variant="desktop" currentMonth={currentMonth} onPrev={onPrev} onNext={onNext} onToday={onToday} />
      <div className="flex flex-col md:flex-row">
        <NotesPanel variant="desktop" currentMonth={currentMonth} events={events} />
        <CalendarGrid variant="desktop" {...gridProps} />
      </div>
    </div>
  );
}
