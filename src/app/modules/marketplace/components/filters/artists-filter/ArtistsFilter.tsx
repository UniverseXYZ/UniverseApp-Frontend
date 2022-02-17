import { Image } from '@chakra-ui/react';
import React from 'react';

import artistIcon from '../../../../../../assets/images/marketplace/artist.svg';
import { Dropdown } from '../../../../../components';

export const ArtistsFilter = () => {
  return (
    <Dropdown
      label={'Artists'}
      buttonProps={{ leftIcon: <Image src={artistIcon} /> }}
    />
  );
};
