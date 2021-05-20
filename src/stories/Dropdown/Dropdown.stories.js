import React from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'Form/Dropdown',
  component: Dropdown,
};

export const Default = () => <Dropdown label="label" placeholder="Placeholder..." />;
export const Disabled = () => (
  <Dropdown label="Label" placeholder="Placeholder..." value="value" disabled />
);
export const Error = () => <Dropdown label="Label" placeholder="Placeholder..." error />;
