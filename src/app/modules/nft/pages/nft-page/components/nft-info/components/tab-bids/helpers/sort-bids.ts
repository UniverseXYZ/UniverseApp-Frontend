import { default as dayjs } from 'dayjs';

import { Bids } from '../../../../../mocks';

export const sortBids = (bids: typeof Bids) => {
  return bids.sort((a, b) => {
    const aPrice = dayjs(a.expiredAt).diff(new Date()) > 0 ? a.price : -Infinity;
    const bPrice = dayjs(b.expiredAt).diff(new Date()) > 0 ? b.price : -Infinity;
    return aPrice > bPrice ? -1 : 1;
  });
};
