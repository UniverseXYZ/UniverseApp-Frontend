import React from 'react';

import { NFTItemTypeLabel } from './NFTItemTypeLabel';

import bundleIcon from '../../../../../../../assets/images/marketplace/bundle.svg';

export const NFTItemBundleLabel = ({ count }: { count: number }) => (
  <NFTItemTypeLabel
    icon={bundleIcon}
    label={`Bundle: ${count} NFTs`}
    iconProps={{ opacity: 0.4 }}
  />
);
