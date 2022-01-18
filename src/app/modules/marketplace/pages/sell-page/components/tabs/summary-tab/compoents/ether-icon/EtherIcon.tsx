import { Image, ImageProps } from '@chakra-ui/react';
import React from 'react';

import ethereumIcon from '../../../../../../../../../../assets/images/eth-icon-new.svg';

export const EtherIcon = (props: ImageProps) => (
  <Image src={ethereumIcon} alt='Ethereum icon' {...props} />
)
