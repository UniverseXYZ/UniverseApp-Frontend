import React from 'react';

import { TabMetadata, TabProperties } from '../components';

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
    component: TabTemp,
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
