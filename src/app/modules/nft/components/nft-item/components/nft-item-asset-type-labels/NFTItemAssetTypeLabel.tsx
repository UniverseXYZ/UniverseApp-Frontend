import { Flex, FlexProps, Image } from '@chakra-ui/react';
import React from 'react';

const styles: FlexProps = {
  bg: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  ml: '4px',
  p: '5px',
  h: '20px',
  w: '20px',
  zIndex: 1,
};

interface IMediaIconProps extends FlexProps {
  icon: any;
}

export const NFTItemAssetTypeLabel = ({ icon, ...rest }: IMediaIconProps) => (
  <Flex {...styles} {...rest}>
    <Image src={icon} />
  </Flex>
);
