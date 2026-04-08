import { useState } from 'react';
import { currentMonthStart, shiftMonth } from '../utils/calendar';

/**
 * Manages date range selection state and current month navigation.
 * Click logic:
 *   1st click  → sets startDate
 *   2nd click  → sets endDate (swaps if earlier than start)
 *   3rd click  → resets and starts a new range from clicked day
 */
export function useCalendarRange() {
  const [currentMonth, setCurrentMonth] = useState(currentMonthStart);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  function goToPrevMonth() {
    setCurrentMonth((m) => shiftMonth(m, -1));
    setStartDate(null);
    setEndDate(null);
  }

  function goToNextMonth() {
    setCurrentMonth((m) => shiftMonth(m, 1));
    setStartDate(null);
    setEndDate(null);
  }

  function goToToday() {
    setCurrentMonth(currentMonthStart());
    setStartDate(null);
    setEndDate(null);
  }

  return {
    currentMonth,
    startDate,
    endDate,
    selectDate,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  };
}
