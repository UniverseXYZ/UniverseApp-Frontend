import { Image } from '@chakra-ui/react';
import React from 'react';

import collectionsIcon from '../../../../../../assets/images/marketplace/collections.svg';
import { Dropdown } from '../../../../../components';

export const CollectionsFilter = () => {
  return (
    <Dropdown
      label={'Collections'}
      buttonProps={{ leftIcon: <Image src={collectionsIcon} /> }}
    />
  );
}
