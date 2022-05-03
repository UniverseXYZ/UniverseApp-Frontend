import { Icon as ChakraIcon, Alert as ChakraAlert, AlertProps, AlertStatus, Box } from '@chakra-ui/react';
import { useCallback } from 'react';

import { ReactComponent as DangerSVG } from '@assets/images/danger.svg';

interface IAlertProps extends Omit<AlertProps, 'status'> {
  status: AlertStatus;
}

export const Alert = (props: IAlertProps) => {
  const { children, ...rest } = props;

  const getIcon = useCallback(() => {
    switch (rest.status) {
      case 'warning': return <ChakraIcon viewBox={'0 0 21 19'} w={'18px'} h={'16px'}><DangerSVG /></ChakraIcon>
      default: return <></>
    }
  }, [rest.status]);

  return (
    <ChakraAlert {...rest}>
      <Box mr={'18px'}>
        {getIcon()}
      </Box>
      {children}
    </ChakraAlert>
  );
};
