import { Box, Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

import { Icon } from '@app/components';

import * as s from './ToggleFiltersButton.styles';

export interface IToggleFiltersButtonProps extends ButtonProps {
  dirtyAmount: number;
}

export const ToggleFiltersButton: React.FC<IToggleFiltersButtonProps> = (props) => {
  const {
    dirtyAmount,
    ...rest
  } = props;

  return (
    <Button
      variant={'simpleOutline'}
      leftIcon={
        !dirtyAmount
          ? <Icon name={'filters'} />
          : <Box {...s.AmountLabel}>{dirtyAmount}</Box>
      }
      {...s.Button}
      {...rest}
    >Filters</Button>
  );
}
