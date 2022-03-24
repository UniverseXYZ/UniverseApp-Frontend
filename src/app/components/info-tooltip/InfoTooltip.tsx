import { Image, Tooltip, ImageProps } from '@chakra-ui/react';
import React from 'react';

import iIcon from './../../../assets/images/v2/marketplace/i.svg';

interface IInfoTooltipProp extends ImageProps {
  label: string;
  icon?: string;
}

export const InfoTooltip = ({ label, icon, ...rest }: IInfoTooltipProp) => {
  return (
    <Tooltip label={label}>
      <Image
        src={icon || iIcon}
        alt={label}
        cursor={'pointer'}
        display={'inline'}
        mx={'8px'}
        {...rest}
      />
    </Tooltip>
  );
};
