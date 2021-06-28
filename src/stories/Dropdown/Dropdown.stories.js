import React from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'Form/Dropdown',
  component: Dropdown,
};

export const Default = () => <Dropdown label="Label" />;
export const DefaulPlaceholder = () => <Dropdown label="Label" placeholder="Input" />;
export const Hover = () => <Dropdown className="hover" label="Label" />;
export const Active = () => <Dropdown className="focus" label="Label" placeholder="Select one" />;
export const Filled = () => <Dropdown label="Label" value="Input" />;
export const Disabled = () => (
  <Dropdown label="Label" placeholder="Placeholder..." value="Input" disabled />
);
export const Error = () => (
  <Dropdown className="error-inp" label="Label" placeholder="Input" error />
);
