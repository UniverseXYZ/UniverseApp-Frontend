import { calcTimeDelta } from 'react-countdown';

export const getAddedAtLabel = (addedAt: Date) => {
  const [leftDate, rightDate] = new Date() > new Date(addedAt)
     ? [new Date(), new Date(addedAt)]
     : [new Date(addedAt), new Date()];

  const res = calcTimeDelta(leftDate, {
    now: () => rightDate.getTime(),
  });

  if (res.days) {
    if (res.days > 365) {
      return `${Math.floor(res.days / 365)} years ${res.days - Math.floor(res.days / 365)} days`;
    } else {
      return `${res.days} days ${res.hours} hours`;
    }
  }

  if (res.hours) {
    return `${res.hours} hours ${res.minutes} minutes`;
  }

  return `${res.minutes} minutes`;
}
