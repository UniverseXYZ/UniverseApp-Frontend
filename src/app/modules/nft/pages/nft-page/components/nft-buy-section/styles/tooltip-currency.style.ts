import { TooltipProps } from '@chakra-ui/react';

export const TooltipCurrencyStyle: Omit<TooltipProps, 'children'> = {
  hasArrow: true,
  variant: 'black',
  placement: 'top',
  fontWeight: 700,
};
