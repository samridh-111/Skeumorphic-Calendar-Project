import { useState, useEffect } from 'react';

/**
 * Manages only date-range selection state.
 * Month navigation has moved to usePageFlip.
 *
 * 3-click logic:
 *   1st click → sets startDate
 *   2nd click → sets endDate (swaps if earlier than start)
 *   3rd click → resets and starts a new range from clicked day
 */
export function useCalendarRange(currentMonth) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Reset selection when changing months
  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
  }, [currentMonth]);

  function selectDate(day) {
    if (!startDate) {
      setStartDate(day);
    } else if (!endDate) {
      if (day < startDate) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  }

  function resetRange() {
    setStartDate(null);
    setEndDate(null);
  }

  return { startDate, endDate, selectDate, resetRange };
}
