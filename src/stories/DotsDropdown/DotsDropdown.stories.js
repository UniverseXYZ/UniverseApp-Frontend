import React from 'react';
import DotsDropdown from './DotsDropdown';

export default {
  title: 'Form/DotsDropdown',
  component: DotsDropdown,
};

export const Default = () => <DotsDropdown className="default" />;
export const Closed = () => <DotsDropdown hide />;
export const Opened = () => <DotsDropdown className="opened" />;
