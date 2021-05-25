import React from 'react';

import MobileHeader from './MobileHeader';

export default {
  title: 'Form/MobileHeader',
  component: MobileHeader,
};

export const MobileLight = () => <MobileHeader variant="light" />;

export const MobileDark = () => <MobileHeader variant="dark" />;

export const MobileLighLoggedIn = () => <MobileHeader variant="light logged" />;

export const MobileDarkLoggedIn = () => <MobileHeader variant="dark logged" />;
