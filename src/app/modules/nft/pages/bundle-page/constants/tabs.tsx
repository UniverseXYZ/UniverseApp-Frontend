import React from 'react';

import { TabNFTs } from '../components';
import { TabBids, TabHistory, TabOffers } from '../../nft-page/components/nft-info/components';

export const Tabs = [
  {
    name: 'NFTs',
    component: TabNFTs,
  },
  {
    name: 'Bids',
    component: TabBids,
  },
  {
    name: 'Offers',
    component: TabOffers,
  },
  {
    name: 'History',
    component: TabHistory,
  },
];
