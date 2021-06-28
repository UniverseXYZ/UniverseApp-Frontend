import React from 'react';
import SpecialButton from './SpecialButton';

export default {
  title: 'Form/Special Button',
  component: SpecialButton,
};

export const Active = () => <SpecialButton className="active" />;
export const Disable = () => <SpecialButton className="disable" />;
