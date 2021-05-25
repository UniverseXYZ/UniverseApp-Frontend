import React from 'react';

import Tabs from './Tabs';

export default {
  title: 'Form/Tabs',
  component: Tabs,
};

export const Horizontal = (args) => <Tabs {...args} variant="horizontal" />;
export const Vertical = (args) => <Tabs {...args} variant="vertical" />;
