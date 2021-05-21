import React from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
};

export const Default = () => <Checkbox className="default" disabled={false} />;
export const Hover = () => <Checkbox className="on__hover" checked={false} disabled={false} />;
export const Checked = () => <Checkbox checked />;
export const Disabled = () => <Checkbox disabled />;
export const Indeterminate = () => <Checkbox className="indeterminate" checked />;
