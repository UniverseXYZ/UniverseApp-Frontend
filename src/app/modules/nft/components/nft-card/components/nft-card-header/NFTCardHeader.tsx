import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

import * as styles from './NFTCardHeader.styles';

interface INFTCardHeaderProps extends FlexProps {}

export const NFTCardHeader = (props: INFTCardHeaderProps) => {
  return (
    <Flex {...styles.Wrapper} {...props} />
  );
};
