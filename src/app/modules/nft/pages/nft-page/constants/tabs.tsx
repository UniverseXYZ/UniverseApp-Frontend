import React from 'react';

import { TabMetadata, TabOwners, TabProperties, TabBids, TabOffers, TabHistory } from '../components';

export const Tabs = [
  {
    name: 'Properties',
    component: TabProperties,
  },
  {
    name: 'Metadata',
    component: TabMetadata,
  },
  {
    name: 'Owners',
    component: TabOwners,
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
