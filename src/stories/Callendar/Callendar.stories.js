import React from 'react';
import Callendar from './Callendar';

export default {
  title: 'Form/Callendar',
  component: Callendar,
};

export const StartDate = () => <Callendar className="start__date" />;
export const EndDate = () => <Callendar className="end__date" />;
