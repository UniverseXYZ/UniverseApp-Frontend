import { useState } from 'react';
import { useInterval } from 'react-use';
import { default as dayjs } from 'dayjs';

export const useDateCountdown = (_initialDate: Date, onCountDownEnd?: () => void) => {
  const [targetDate] = useState(dayjs(_initialDate));
  const [isRunning, setIsRunning] = useState(!!_initialDate);
  const [formattedString, setFormattedString] = useState<string>();

  useInterval(() => {
    const now = new Date();

    if (targetDate.diff(now) < 0) {
      setIsRunning(false);
      onCountDownEnd && onCountDownEnd();
      return;
    }

    const daysDiff = targetDate.diff(now, 'd');
    const hoursDiff = targetDate.diff(now, 'h');
    const minutesDiff = targetDate.diff(now, 'm');
    const secondsDiff = targetDate.diff(now, 's');

    let hours = hoursDiff - daysDiff * 24;
    const minutes = minutesDiff - hoursDiff * 60;
    const seconds = secondsDiff - minutesDiff * 60;
    
    const daysString = daysDiff ? `${daysDiff}d` : '';
    const hoursString = hours || daysString ? `${hours.toString().padStart(2, '0')}h` : '';
    const minutesString = minutes || hoursString ? `${minutes.toString().padStart(2, '0')}m` : '';
    const secondsString = `${seconds.toString().padStart(2, '0')}s`;

    const formattedString = [daysString, hoursString, minutesString, secondsString].filter(v => !!v).join(' : ');

    setFormattedString(formattedString);

  }, isRunning ? 1000 : null);

  return { countDownString: formattedString, isRunning };
};
