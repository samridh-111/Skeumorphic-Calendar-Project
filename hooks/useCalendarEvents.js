import { useState, useEffect } from 'react';

const STORAGE_KEY_PREFIX = 'calendar-events';

export function useCalendarEvents(currentMonth) {
  const [events, setEvents] = useState([]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const storageKey = `${STORAGE_KEY_PREFIX}-${year}-${month}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        setEvents([]);
      }
    } else {
      setEvents([]);
    }
  }, [storageKey]);

  function addEvent(name, startDate, endDate) {
    const newEvent = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
  }

  function removeEvent(id) {
    const updatedEvents = events.filter((e) => e.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
  }

  return { events, addEvent, removeEvent };
}
