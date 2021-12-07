import { Box, Image, ImageProps, Tooltip } from '@chakra-ui/react';
import React from 'react';

interface INFTItemTypeLabelProps {
  label: string;
  icon: any;
  iconProps?: ImageProps;
}

export const NFTItemTypeLabel = ({ label, icon, iconProps = {} }: INFTItemTypeLabelProps) => {
  return (
    <Tooltip hasArrow label={label} placement={'top'} variant={'black'} fontWeight={'700'}>
      <Box
        border={'1px solid rgba(0, 0, 0, 0.1)'}
        borderRadius={'8px'}
        display={'inline-flex'}
        p={'5px 6px'}
        mr={'6px'}
        minW={'32px'}
      >
        <Image src={icon} alt={label} {...iconProps} />
      </Box>
    </Tooltip>
  );
}
