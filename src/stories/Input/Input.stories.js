import React from 'react';
import Input from './Input';

export default {
  title: 'Form/Input',
  component: Input,
};

export const Default = () => <Input label="Label" placeholder="Placeholder..." />;
export const Disabled = () => (
  <Input label="Label" placeholder="Placeholder..." value="value" disabled />
);
export const Error = () => <Input label="Label" placeholder="Placeholder..." error />;
