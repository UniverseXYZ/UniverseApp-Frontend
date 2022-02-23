import { Box, BoxProps, Image, Tooltip } from '@chakra-ui/react';
import React from 'react';

import BundleIcon from '../../../../../../../../../assets/images/marketplace/v2/bundle.svg';

interface INFTItemFooterBundleLabelProps extends BoxProps {
  count: number;
}

export const NFTItemFooterBundleLabel = ({ count, children, ...rest }: INFTItemFooterBundleLabelProps) => {
  const label = `Bundle: ${count} NFTs`;
  return (
    <Tooltip hasArrow label={label} placement={'top'} variant={'black'} fontWeight={'700'}>
      <Box layerStyle={'nft-card-footer-label'} p={'5px 6px'} {...rest}>
        <Image src={BundleIcon} alt={label} display={'inline'} />
      </Box>
    </Tooltip>
  );
};
