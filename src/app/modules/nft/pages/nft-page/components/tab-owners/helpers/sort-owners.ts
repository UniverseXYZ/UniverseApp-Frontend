import { Owners } from '../../../mocks';

export const sortOwners = (owners: typeof Owners) => {
  return owners.sort((a, b) => {
    return (a.price || Infinity) > (b.price || Infinity) ? 1 : -1;
  });
};
