import { default as dayjs } from 'dayjs';

export const getAddedAtLabel = (addedAt: Date) => {
  const dayDiff = dayjs().diff(addedAt, 'days');

  switch (dayDiff) {
    case 0: return 'Today';
    case 1: return `1 day ago`;
    default: return `${dayDiff} days ago`;
  }
}
