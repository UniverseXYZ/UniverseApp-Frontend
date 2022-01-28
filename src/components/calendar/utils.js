import { format } from 'date-fns';

export const parseDateForDatePicker = (date) => ({
  month: format(date, 'LLL'),
  day: Number(format(date, 'dd')),
  year: Number(format(date, 'y')),
  hours: Number(format(date, 'hh')),
  minutes: Number(format(date, 'mm')),
  timezone: format(date, 'O'),
  format: format(date, 'aa'),
});
