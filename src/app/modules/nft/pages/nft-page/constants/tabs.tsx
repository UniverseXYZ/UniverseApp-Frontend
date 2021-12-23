import React from 'react';

import { TabMetadata, TabOwners, TabProperties } from '../components';

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
    component: TabTemp,
  },
  {
    name: 'Offers',
    component: TabTemp,
  },
  {
    name: 'History',
    component: TabTemp,
  },
];
