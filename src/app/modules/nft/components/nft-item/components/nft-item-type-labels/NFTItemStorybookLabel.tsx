import React from 'react';

import { NFTItemTypeLabel } from './NFTItemTypeLabel';

import storybookIcon from '../../../../../../../assets/images/marketplace/storybook.svg';

// TODO: rename to composition
export const NFTItemStorybookLabel = ({ count }: { count: number }) => (
  <NFTItemTypeLabel
    icon={storybookIcon}
    label={`Composition: ${count ?? 0} assets`}
  />
);
