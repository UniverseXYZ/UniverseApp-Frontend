import { Box, BoxProps, Image, Tooltip } from '@chakra-ui/react';
import React from 'react';

import CompositionIcon from '@assets/images/marketplace/v2/composition.svg';

interface ICompositionLabelProps extends BoxProps {
  count: number;
}

export const CompositionLabel = ({ count, children, ...rest }: ICompositionLabelProps) => {
  const label = `Composition: ${count ?? 0} assets`;
  return (
    <Tooltip hasArrow label={label} placement={'top'} variant={'black'} fontWeight={'700'}>
      <Box layerStyle={'NFTCardFooterLabel'} p={'5px 6px'} {...rest}>
        <Image src={CompositionIcon} alt={label} display={'inline'} />
      </Box>
    </Tooltip>
  );
};
