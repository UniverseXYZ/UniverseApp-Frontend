import React from 'react';
import SearchInput from './SearchInput';

export default {
  title: 'Form/SearchInput',
  component: SearchInput,
};

export const Default = () => <SearchInput />;
export const DefaultPlaceholder = () => <SearchInput placeholder="Input" />;
export const Hover = () => <SearchInput className="hover" placeholder="Input" />;
export const Active = () => <SearchInput className="focus" placeholder="Input" />;
export const Filled = () => <SearchInput className="filled" value="Input" />;
export const Disabled = () => <SearchInput placeholder="Input" disabled />;
export const Error = () => <SearchInput className="error-inp" placeholder="Input" />;
