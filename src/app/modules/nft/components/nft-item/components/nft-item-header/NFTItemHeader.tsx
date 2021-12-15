import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

interface IStyles {
  wrapper: FlexProps;
}

const styles: IStyles = {
  wrapper: {
    alignItems: 'center',
    bg: 'radial-gradient(289.96% 2371.58% at 0% 50%, rgba(225, 246, 100, 0.1) 0%, rgba(254, 176, 254, 0.1) 49.34%, rgba(171, 179, 252, 0.1) 100%)',
    fontSize: '12px',
    justifyContent: 'space-between',
    padding: '14px',
  }
};

interface INFTItemHeaderProps extends FlexProps {}

export const NFTItemHeader = (props: INFTItemHeaderProps) => {
  return (
    <Flex {...styles.wrapper} {...props} />
  );
};
