import { Box, Image, ImageProps, Tooltip } from '@chakra-ui/react';
import React from 'react';

import bundleIcon from '../../../../../../../assets/images/marketplace/bundle.svg';
import storybookIcon from '../../../../../../../assets/images/marketplace/storybook.svg';

interface INFTTypeLabelProps {
  label: string;
  icon: any;
  iconProps?: ImageProps;
}

const NFTTypeLabel = ({ label, icon, iconProps = {} }: INFTTypeLabelProps) => {
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

export const BundleLabel = ({ count }: { count: number }) => (
  <NFTTypeLabel
    icon={bundleIcon}
    label={`Bundle: ${count} NFTs`}
    iconProps={{ opacity: 0.4 }}
  />
);

export const StorybookLabel = ({ count }: { count: number }) => (
  <NFTTypeLabel
    icon={storybookIcon}
    label={`Storybook: ${count ?? 0} assets`}
  />
);
