import { ISaleTypeFilterValue } from './../SaleTypeFilter';

export interface IOption {
  key: keyof ISaleTypeFilterValue;
  label: string;
  description: string;
}

export const Options: IOption[] = [
  {
    key: 'buyNow',
    label: 'Buy now',
    description: 'Fixed price sale',
  },
  // {
  //   key: 'onAuction',
  //   label: 'On auction',
  //   description: 'You can place bids',
  // },
  {
    key: 'new',
    label: 'New',
    description: 'Recently added',
  },
  {
    key: 'hasOffers',
    label: 'Has offers',
    description: 'High in demand',
  }
];
