import dayjs from 'dayjs';

export const getAddedAtLabel = (addedAt: Date) => {
  const [leftDate, rightDate] = new Date() > new Date(addedAt)
    ? [dayjs(), dayjs(addedAt)]
    : [dayjs(addedAt), dayjs()];

  const diffYears = leftDate.diff(rightDate, 'years');
  if (diffYears > 0) {
    return `${diffYears} years ${leftDate.add(-diffYears, 'years').diff(rightDate, 'days')} days`;
  }

  const diffDays = leftDate.diff(rightDate, 'days');
  if (diffDays > 0) {
    return `${diffDays} days ${leftDate.add(-diffDays, 'days').diff(rightDate, 'hours')} hours`;
  }

  const diffHours = leftDate.diff(rightDate, 'hours');
  if (diffHours > 0) {
    return `${diffHours} hours ${leftDate.add(-diffHours, 'hours').diff(rightDate, 'minutes')} minutes`;
  }


  return `${leftDate.diff(rightDate, 'minutes')} minutes`;
}
