import { Image, ImageProps } from '@chakra-ui/react';
import React from 'react';

import EthSVGIcon from '../../../../../../../../../assets/images/eth-icon-new.svg';

export const EthIcon = (props: ImageProps) => (
  <Image src={EthSVGIcon} display={'inline'} mr={'4px'} mt={'-3px'} {...props} />
);
