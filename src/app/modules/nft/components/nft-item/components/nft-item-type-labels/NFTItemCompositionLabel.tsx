import { FlexProps } from '@chakra-ui/react';
import React from 'react';

import { NFTItemTypeLabel } from './NFTItemTypeLabel';

import compositionIcon from '../../../../../../../assets/images/marketplace/v2/composition.svg';

interface INFTItemCompositionLabelProps extends FlexProps {
  count: number;
}

export const NFTItemCompositionLabel = ({ count, ...rest }: INFTItemCompositionLabelProps) => (
  <NFTItemTypeLabel
    icon={compositionIcon}
    label={`Composition: ${count ?? 0} assets`}
    {...rest}
  />
);
