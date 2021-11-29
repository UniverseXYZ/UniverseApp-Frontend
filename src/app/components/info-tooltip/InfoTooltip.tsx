import { Image, Tooltip, ImageProps } from '@chakra-ui/react';
import React from 'react';

import iIcon from './../../../assets/images/icon.svg';

interface IInfoTooltipProp extends ImageProps {
  label: string;
}

export const InfoTooltip = ({ label, ...rest }: IInfoTooltipProp) => {
  return (
    <Tooltip label={label}>
      <Image
        src={iIcon}
        alt={label}
        cursor={'pointer'}
        display={'inline'}
        mx={'8px'}
        {...rest}
      />
    </Tooltip>
  );
};
