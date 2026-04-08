import React from 'react';
import { motion } from 'framer-motion';
import { useCalendarMotion } from '../../hooks/useCalendarMotion';
import { useCalendarRange } from '../../hooks/useCalendarRange';
import CalendarActions from './CalendarActions';
import CalendarHero from './CalendarHero';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';

/**
 * HangingCalendarShell
 * Owns: hanging motion hook, hook/nail UI, swing physics, transform origin.
 * Delegates: all calendar logic to sub-components and hooks.
 */
export default function HangingCalendarShell() {
  const { controls, calendarRef, handleSwing } = useCalendarMotion();
  const {
    currentMonth,
    startDate,
    endDate,
    selectDate,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  } = useCalendarRange();

  const gridProps = { currentMonth, startDate, endDate, onSelectDate: selectDate };

  return (
    <div className="wall-texture min-h-screen flex flex-col items-center pt-6 md:pt-8 pb-6 px-4">

      {/* Fixed Wall Hook */}
      <div className="relative z-50 mb-[-12px]">
        <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full shadow-lg flex items-center justify-center border-t border-white/20">
          <div className="w-1.5 h-1.5 bg-black/60 rounded-full" />
        </div>
        <div className="w-1 h-8 bg-gray-500/40 mx-auto -mt-1" />
      </div>

      {/* Hanging Calendar — ANIMATED SHELL */}
      <motion.div
        ref={calendarRef}
        animate={controls}
        style={{ transformOrigin: 'top center' }}
        onClick={handleSwing}
        className="cursor-pointer"
      >

        {/* ── DESKTOP ── */}
        <div className="hidden md:block max-w-5xl w-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08),0_25px_50px_rgba(0,0,0,0.05)] overflow-hidden paper-texture">
          <CalendarActions count={12} />
          <CalendarHero
            variant="desktop"
            currentMonth={currentMonth}
            onPrev={goToPrevMonth}
            onNext={goToNextMonth}
            onToday={goToToday}
          />
          <div className="flex flex-col md:flex-row">
            <NotesPanel variant="desktop" />
            <CalendarGrid variant="desktop" {...gridProps} />
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="md:hidden w-[92%] max-w-md bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden paper-grain">
          <div className="flex justify-around px-4 py-3 bg-gray-200 border-b border-black/5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-3 h-8 spiral-loop rounded-full shadow-sm" />
            ))}
          </div>
          <CalendarHero
            variant="mobile"
            currentMonth={currentMonth}
            onPrev={goToPrevMonth}
            onNext={goToNextMonth}
            onToday={goToToday}
          />
          <CalendarGrid variant="mobile" {...gridProps} />
          <NotesPanel variant="mobile" />
        </div>

      </motion.div>

      {/* Shadow */}
      <div className="max-w-5xl w-full h-8 bg-black/5 blur-xl -mt-4 rounded-full" />

      <style jsx>{`
        .paper-texture {
          background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuDvwxS6f4hR46JJfBhXnS7ZeelP4CLvdAemp6iLS_u0pqoMkrX3clB9rGWnl084lfI4egh9gTE9QSRKqHvDGX5RhEmqvtK1seDH_dCjdpJgZa03f9Re42AF-XvoNYPUM9ecmGHs18cMHMGqq-Mu1qEi_4eywOvaXWMppEUzL0xkt0Pbwk_F1VBRRNga3z_4HgMX3R8Gg9oYXvuuaOjahPJtps_uFhOFRz5BVd4FHFN1Gi-IO-gB4vsqYagaQjNDhoVZMWvkrv8YjeI);
        }
        .wall-texture {
          background-color: #f2f1ed;
          background-image: radial-gradient(#d6dbd7 0.5px, transparent 0.5px);
          background-size: 24px 24px;
        }
        .lined-paper {
          background-image: linear-gradient(#d1d5db 1px, transparent 1px);
          background-size: 100% 2.5rem;
        }
        .paper-grain {
          background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuAsWbd147SDdJPAVFEK9Rh3NceuMxOE0hh5bIX7fE2AMcc1a73B7NXSUtkgPkvVsZ9i3U3ljcdFmKv-MmceEe92RcarQDFx6sgD-MLRRaDicRkGPwk0GMEGxszc6fH1k0pNTFemSYttwbEEm7l2IflQxFJczVfD6EUwlVQlGtmtp5keQ_IGo-O2NsJeZxaXl3L067uy8RHbWOUEpotzwGvM9CGgNgwweoQsdTDyYswe5NECqjJTipZvB7Hudrg6GkrJDMHxl7xSQrw);
          background-repeat: repeat;
        }
        .spiral-loop {
          background: linear-gradient(to right, #cfd3cf, #f1f1ef, #cfd3cf);
        }
      `}</style>
    </div>
  );
}
