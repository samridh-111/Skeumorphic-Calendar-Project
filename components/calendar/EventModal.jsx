import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventModal({ isOpen, onClose, onSave, startDate, endDate }) {
  const [eventName, setEventName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEventName('');
    }
  }, [isOpen]);

  const handleSave = () => {
    if (eventName.trim()) {
      onSave(eventName.trim());
      onClose();
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -2, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, rotate: -1, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } }}
            className="w-full max-w-sm p-6 shadow-2xl relative"
            style={{
              backgroundColor: '#fef3c7', // sticky note yellow
              backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, transparent 100%)',
              boxShadow: '4px 4px 15px rgba(0,0,0,0.1), 1px 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            {/* Skeuomorphic tape/pin could go here */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 w-16 h-6 bg-yellow-100/40 backdrop-blur-md shadow-sm border border-yellow-200/50 transform -rotate-2 mix-blend-multiply" />
            
            <h4 className="font-serif italic text-2xl text-amber-900 mb-2">Name this event</h4>
            
            <p className="font-sans text-sm text-amber-800/70 mb-4 font-medium tracking-wide">
              {formatDate(startDate)} &mdash; {formatDate(endDate)}
            </p>
            
            <input
              type="text"
              autoFocus
              placeholder="E.g., Vacation, Project Alpha..."
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') onClose();
              }}
              className="w-full bg-transparent border-b-2 border-amber-900/20 focus:border-amber-900 text-amber-950 font-serif text-lg py-2 outline-none mb-6 placeholder:text-amber-900/30 transition-colors"
            />
            
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-amber-900/60 font-serif text-sm tracking-wider uppercase hover:text-amber-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!eventName.trim()}
                className="px-5 py-2 bg-amber-900 text-amber-50 font-serif text-sm tracking-wider uppercase hover:bg-amber-950 disabled:opacity-50 transition-colors shadow-sm"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
