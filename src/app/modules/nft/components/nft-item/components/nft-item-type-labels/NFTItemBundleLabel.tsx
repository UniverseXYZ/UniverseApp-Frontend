import { FlexProps } from '@chakra-ui/react';
import React from 'react';

import { NFTItemTypeLabel } from './NFTItemTypeLabel';

import bundleIcon from '../../../../../../../assets/images/marketplace/v2/bundle.svg';

interface INFTItemBundleLabelProps extends FlexProps {
  count: number;
}

export const NFTItemBundleLabel = ({ count, ...rest }: INFTItemBundleLabelProps) => (
  <NFTItemTypeLabel
    icon={bundleIcon}
    label={`Bundle: ${count} NFTs`}
    {...rest}
  />
);
