import { Flex, FlexProps, Image, ImageProps, Tooltip } from '@chakra-ui/react';
import React from 'react';

const styles: FlexProps = {
  bg: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '8px',
  display: 'flex',
  p: '5px 6px',
  minW: '32px',
};

interface INFTItemTypeLabelProps extends FlexProps {
  label: string;
  icon: string;
  iconProps?: ImageProps;
}

export const NFTItemTypeLabel = ({ label, icon, iconProps = {}, ...rest }: INFTItemTypeLabelProps) => {
  return (
    <Tooltip hasArrow label={label} placement={'top'} variant={'black'} fontWeight={'700'}>
      <Flex {...styles} {...rest}>
        <Image src={icon} alt={label} {...iconProps} />
      </Flex>
    </Tooltip>
  );
}
