import { useState, useEffect } from 'react';

const STORAGE_KEY = 'calendar-notes';

/**
 * Notes state with automatic localStorage persistence.
 */
export function useLocalNotes() {
  const [notes, setNotes] = useState('');

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) setNotes(saved);
  }, []);

  // Persist whenever notes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, notes);
  }, [notes]);

  return { notes, setNotes };
}
