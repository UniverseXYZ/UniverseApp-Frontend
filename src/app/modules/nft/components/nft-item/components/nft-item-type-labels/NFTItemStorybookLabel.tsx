import React from 'react';

import { NFTItemTypeLabel } from './NFTItemTypeLabel';

import storybookIcon from '../../../../../../../assets/images/marketplace/storybook.svg';

export const NFTItemStorybookLabel = ({ count }: { count: number }) => (
  <NFTItemTypeLabel
    icon={storybookIcon}
    label={`Storybook: ${count ?? 0} assets`}
  />
);
