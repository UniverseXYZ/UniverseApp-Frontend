import { format } from 'date-fns';

export const parseDateForDatePicker = (date) => ({
  month: format(date, 'LLL'),
  day: format(date, 'dd'),
  year: format(date, 'y'),
  hours: format(date, 'hh'),
  minutes: format(date, 'mm'),
  timezone: format(date, 'O'),
  format: format(date, 'aa'),
});
