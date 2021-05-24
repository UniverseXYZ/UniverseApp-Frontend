import React from 'react';
import Pagination from './Pagination';

export default {
  title: 'Form/Pagination',
  component: Pagination,
};

export const Default = () => <Pagination className="default" />;
export const Previous = () => <Pagination className="arrows previous" />;
export const PreviousDisabled = () => <Pagination className="arrows previous" disabled />;
export const Next = () => <Pagination className="arrows next" />;
export const NextDisabled = () => <Pagination className="arrows next" disabled />;
export const Page = () => <Pagination className="page" />;
export const ActivePage = () => <Pagination className="page" active />;
export const Etc = () => <Pagination className="etc" />;
