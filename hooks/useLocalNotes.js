import { useState, useEffect } from 'react';

/**
 * Notes state with automatic localStorage persistence, keyed by the specific month.
 */
export function useLocalNotes(currentMonth) {
  const [notes, setNotes] = useState('');
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const STORAGE_KEY = `calendar-notes-${year}-${month}`;

  // Restore from localStorage when month changes
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      setNotes(saved);
    } else {
      setNotes('');
    }
  }, [STORAGE_KEY]);

  // Persist whenever notes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, notes);
  }, [notes, STORAGE_KEY]);

  return { notes, setNotes };
}
