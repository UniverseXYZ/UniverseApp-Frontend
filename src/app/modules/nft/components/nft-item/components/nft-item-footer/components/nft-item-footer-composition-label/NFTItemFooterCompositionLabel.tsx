import { Box, BoxProps, Image, Tooltip } from '@chakra-ui/react';
import React from 'react';

import CompositionIcon from '../../../../../../../../../assets/images/marketplace/v2/composition.svg';

interface INFTItemFooterCompositionLabelProps extends BoxProps {
  count: number;
}

export const NFTItemFooterCompositionLabel = ({ count, children, ...rest }: INFTItemFooterCompositionLabelProps) => {
  const label = `Composition: ${count ?? 0} assets`;
  return (
    <Tooltip hasArrow label={label} placement={'top'} variant={'black'} fontWeight={'700'}>
      <Box layerStyle={'nft-card-footer-label'} p={'5px 6px'} {...rest}>
        <Image src={CompositionIcon} alt={label} display={'inline'} />
      </Box>
    </Tooltip>
  );
};
