import React from 'react';
import Popups from './RemovePopup';
import SelectTokenPopup from './SelectTokenPopup';

export default {
  title: 'Form/Popups',
  component: Popups,
};
export const RemovePopups = () => <Popups />;
export const SelectTokenPopups = () => <SelectTokenPopup />;
