import React from 'react';
import { useLocalNotes } from '../../hooks/useLocalNotes';

/**
 * Notes panel — desktop shows a lined-paper textarea, mobile shows a stacked layout.
 * Notes are persisted to localStorage automatically.
 *
 * @param {{ variant: 'desktop' | 'mobile', events: Array }} props
 */
export default function NotesPanel({ variant = 'desktop', currentMonth, events = [] }) {
  const { notes, setNotes } = useLocalNotes(currentMonth);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  const EventsList = () => {
    if (!events || events.length === 0) return null;
    return (
      <div className="mt-4 pt-4 border-t border-gray-900/10">
        <h4 className="font-serif italic text-lg text-gray-900 mb-2">Saved Events</h4>
        <ul className="space-y-2">
          {events.map((ev) => (
            <li key={ev.id} className="flex flex-col">
              <span className="font-serif text-gray-900 font-medium">{ev.name}</span>
              <span className="font-sans text-xs text-gray-500 font-medium uppercase tracking-wider">
                {formatDate(ev.startDate)} &mdash; {formatDate(ev.endDate)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (variant === 'mobile') {
    return (
      <footer className="mt-2 px-6 pb-6 bg-gray-100/30">
        <h3 className="font-serif italic text-2xl mb-4 text-gray-900">Notes</h3>
        <textarea
          className="w-full bg-transparent font-serif text-base text-gray-900 resize-none focus:outline-none placeholder:text-gray-400 border-t border-gray-900/20 pt-3"
          rows={3}
          placeholder="Add notes here…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <EventsList />
      </footer>
    );
  }

  return (
    <div className="w-full md:w-5/12 p-6 border-r border-gray-300/20 bg-gray-50/40">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-serif italic text-2xl text-gray-900">Notes</h3>
        <span className="material-symbols-outlined text-gray-600">edit_note</span>
      </div>
      <textarea
        className="lined-paper w-full min-h-[160px] bg-transparent text-gray-900 font-serif text-lg italic leading-[2rem] resize-none focus:outline-none placeholder:text-gray-400 placeholder:font-serif placeholder:italic"
        placeholder={"Write your notes here…"}
        value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <EventsList />
      </div>
  );
}
