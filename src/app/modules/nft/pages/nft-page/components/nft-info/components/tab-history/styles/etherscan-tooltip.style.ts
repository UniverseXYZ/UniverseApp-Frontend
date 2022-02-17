import { TooltipProps } from '@chakra-ui/react';

export const EtherscanTooltipStyle: Omit<TooltipProps, 'children'> = {
  placement: 'top',
  label: 'View on Etherscan',
  ml: '-5px',
  fontWeight: '700',
};
