import React from 'react';
import Input from './Input';

export default {
  title: 'Form/Input',
  component: Input,
};

export const Default = () => <Input label="Label" />;
export const DefaultPlaceholder = () => <Input label="Label" placeholder="Input" />;
export const Hover = () => <Input className="hover" label="Label" placeholder="Input" />;
export const Active = () => <Input className="focus" label="Label" placeholder="Input" />;
export const Filled = () => <Input label="Label" value="Input" />;
export const Disabled = () => <Input label="Label" placeholder="Input" value="Input" disabled />;
export const Error = () => <Input className="error-inp" label="Label" placeholder="Input" />;
