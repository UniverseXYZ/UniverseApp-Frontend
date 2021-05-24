import React from 'react';
import ItemPerPage from './ItemPerPage';

export default {
  title: 'Form/ItemPerPage',
  component: ItemPerPage,
};

export const Default = () => <ItemPerPage className="default" />;
export const Closed = () => <ItemPerPage className="closed" show={false} />;
export const Opened = () => <ItemPerPage className="opened" show />;
