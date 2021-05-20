import React from 'react';
import Switchers from './Switchers';

export default {
  title: 'Form/Switchers',
  component: Switchers,
};

export const Off = () => <Switchers checked={false} />;
export const On = () => <Switchers checked />;
