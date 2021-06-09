import React from 'react';

import Header from './Header';

export default {
  title: 'Form/Header',
  component: Header,
};

export const Light = () => <Header variant="light" />;

export const Dark = () => <Header variant="dark" />;

export const LighLoggedIn = () => <Header variant="light logged" />;

export const DarkLoggedIn = () => <Header variant="dark logged" />;
