import {
  Box,
  BoxProps,
  Button,
  Input,
  InputProps,
  useMultiStyleConfig,
  useNumberInput,
  UseNumberInputProps,
} from '@chakra-ui/react';
import React from 'react';

import { Icon } from '@app/components';

interface IAmountSelectorProps extends BoxProps {
  options: UseNumberInputProps;
  size?: string;
}

export const AmountSelector: React.FC<IAmountSelectorProps> = (props) => {
  const { options, size, ...rest } = props;

  const styles = useMultiStyleConfig('AmountSelector', { size });

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput(options);

  const decrement = getDecrementButtonProps();
  const increment = getIncrementButtonProps();
  const input = getInputProps();

  return (
    <Box __css={styles.container} {...rest}>
      <Button
        {...decrement}
        __css={styles.leftButton}
      >
        <Icon name={'minus'} />
      </Button>
      <Input
        {...input}
        {...styles.input as InputProps}
      />
      <Button
        {...increment}
        __css={styles.rightButton}
      >
        <Icon name={'plus'} />
      </Button>
    </Box>
  );
}
