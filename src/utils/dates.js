export const getNow = () => {
  const now = new Date();
  return now.getTime();
};

export const getDate = (_date) => {
  const date = new Date(_date);
  return date.getTime();
};

export const isBeforeNow = (_date, now = getNow()) => {
  const date = getDate(_date);
  return date < now;
};

export const isAfterNow = (_date, now = getNow()) => {
  const date = getDate(_date);
  return date > now;
};

export const getTimezoneOffset = () => new Date().getTimezoneOffset();

// export const getActive = (_startDate, _endDate) => {
//   const now = getNow();
//   const startDate = getDate(_startDate);
//   const endDate = getDate(_endDate);
//   return isBeforeNow(startDate, now) && isAfterNow(endDate, now);
// };
