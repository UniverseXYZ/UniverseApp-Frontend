import React from 'react';
import CopyURL from './CopyURL';

export default {
  title: 'Form/Copy URL',
  component: CopyURL,
};

export const Active = () => <CopyURL />;
export const Hover = () => <CopyURL className="on__hover" hidden />;
export const Pressed = () => <CopyURL className="pressed" hidden />;
export const Copied = () => <CopyURL className="on__hover" hidden={false} />;
