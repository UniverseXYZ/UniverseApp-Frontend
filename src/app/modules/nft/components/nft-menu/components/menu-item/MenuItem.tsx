import { Image, MenuItemProps, MenuItem as ChakraMenuItem } from '@chakra-ui/react';
import React from 'react';

import * as styles from './../../styles';

interface IMenuItemProps extends Omit<MenuItemProps, 'icon'> {
  name: string;
  icon?: string;
  redColor?: boolean;
}

export const MenuItem = ({name, icon, redColor = false, ...rest}: IMenuItemProps) => {
  return (
    <ChakraMenuItem
      {...styles.ItemStyle}
      color={redColor ? '#FF4949' : ''}
      {...rest}
    >
      {icon && <Image src={icon} mr={'6px'} />}
      {name}
    </ChakraMenuItem>
  );
}
