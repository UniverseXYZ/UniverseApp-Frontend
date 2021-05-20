import React from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
};

export const Default = () => <Checkbox className="default" />;
export const Hover = () => <Checkbox className="onHover" />;
export const Checked = () => <Checkbox className="default" checked />;
export const Disabled = () => <Checkbox className="default" disabled />;
