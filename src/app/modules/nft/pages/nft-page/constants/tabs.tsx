import React from 'react';

import { TabMetadata, TabOwners, TabProperties, TabBids, TabOffers, } from '../components';

// TODO: remove
const TabTemp = () => (<p>Temp tab</p>);

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
    component: TabTemp,
  },
];
