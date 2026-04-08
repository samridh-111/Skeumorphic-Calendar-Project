import React from 'react';
import { getMonthName, getYear } from '../../utils/calendar';

/**
 * Hero image banner with dynamic month/year display and navigation controls.
 *
 * @param {{
 *   currentMonth: Date,
 *   onPrev: () => void,
 *   onNext: () => void,
 *   onToday: () => void,
 *   variant: 'desktop' | 'mobile'
 * }} props
 */
export default function CalendarHero({
  currentMonth,
  onPrev,
  onNext,
  onToday,
  variant = 'desktop',
}) {
  const monthName = getMonthName(currentMonth);
  const year      = getYear(currentMonth);

  if (variant === 'mobile') {
    return (
      <>
        {/* Hero image */}
        <section className="w-full h-40 overflow-hidden relative">
          <img
            alt={`${monthName} ${year}`}
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq89GobEgj7lg-q03LY54GtIkvk0osoTdIWNhcllKe6q-pmhBdpmXReLduAfGyBEyr_6Rdb5unH_Dhcj7mxlSGAar4NFZ57yyCs9qVGKRmzYvhAQys-P48xSipQVLlD7_uIoReyroqQ6vioPNuahXTbOzNDbe7h6CkIlaprcj0LfO3YbeQzUL4bK5IJ5_YyczWe-LQzjjuUtqyB8--RYsGQUsQ5hLBZ60rdWlhWiE8kYRFpV-CIwAlHJyWqlbMirdkakpi5oODDb0"
          />
        </section>

        {/* Header */}
        <header className="px-6 pt-4 pb-3">
          <h1 className="font-serif italic text-4xl text-gray-900 tracking-tight mb-1">
            {monthName} {year}
          </h1>
          <div className="w-12 h-[2px] bg-gray-900 mb-4" />
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="text-gray-600 hover:text-gray-900 transition-colors font-serif text-lg select-none"
                aria-label="Previous month"
              >
                ‹
              </button>
              <p className="text-gray-600 font-serif text-sm uppercase tracking-[0.15em] italic">
                The Editorial Edition
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="text-gray-600 hover:text-gray-900 transition-colors font-serif text-lg select-none"
                aria-label="Next month"
              >
                ›
              </button>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onToday(); }}
              className="bg-gray-900 text-white px-5 py-2 font-serif text-xs tracking-widest uppercase active:scale-95 transition-transform"
            >
              TODAY
            </button>
          </div>
        </header>
      </>
    );
  }

  return (
    <div className="relative h-[200px] w-full overflow-hidden">
      <img
        alt={`${monthName} ${year}`}
        className="w-full h-full object-cover grayscale-[10%] brightness-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIbrW5cCKE3sryI8x5EDHBX6aLSwlvqgJuCoRSB3lJfnT8z80VEC8w8Helpn0WU3cGMKhBtKFde1qdts2UjhXxyT3tU2SpyOl6-5Hzfoi5xD7NAVS9LxY3NcMFk1gLbKnyPcBz2MoCQxgSfQn1jTcYql2oKZnsKF_ih-Yg3WdrUxg6AaE1VULIGV70x2QfNxaSndDkko1ef1Fc5mr0wGt89v9zyjZsPttvQqUoDzMiu2HQlMYEUbuXJFmVP70CjwQlivyv-P6gTPo"
      />

      {/* Month / Year overlay */}
      <div className="absolute bottom-6 left-8">
        <h2 className="font-serif text-5xl font-light text-white drop-shadow-md tracking-tight italic">
          {monthName}
        </h2>
        <p className="font-serif text-xl text-white/90 ml-1 mt-[-2px] tracking-[0.25em]">
          {year}
        </p>
      </div>

      {/* Navigation & TODAY */}
      <div className="absolute bottom-6 right-8 flex items-center gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="text-white/80 hover:text-white transition-colors font-serif text-4xl leading-none select-none"
          aria-label="Previous month"
        >
          ‹
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="text-white/80 hover:text-white transition-colors font-serif text-4xl leading-none select-none"
          aria-label="Next month"
        >
          ›
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onToday(); }}
          className="bg-gray-900 px-10 py-3 text-white font-serif text-sm uppercase tracking-[0.2em] hover:bg-gray-700 transition-all shadow-xl active:scale-95"
        >
          TODAY
        </button>
      </div>
    </div>
  );
}
