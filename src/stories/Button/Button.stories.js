import React from 'react';
import Button from './Button';

export default {
  title: 'Form/Button',
  component: Button,
};

export const Light = () => <Button variant="light-button">Light</Button>;
export const LightDisabled = () => (
  <Button variant="light-button" disabled>
    Light Disabled
  </Button>
);
export const LightBorder = () => <Button variant="light-border-button">Light Border</Button>;
export const LightBorderDisabled = () => (
  <Button variant="light-border-button" disabled>
    Light Border Disabled
  </Button>
);
