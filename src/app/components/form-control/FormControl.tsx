import {
  Box,
  FormControl as ChakraFormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel, HStack,
  Text, Tooltip,
} from '@chakra-ui/react';
import React from 'react';

import { Icon } from '@app/components';

import * as s from './FormControl.styles';

interface IFormControlProps extends FormControlProps {
  label?: string;
  tooltip?: string;
  description?: string;
  error?: string;
}

export const FormControl: React.FC<IFormControlProps> = (props) => {
  const {
    label,
    tooltip,
    description,
    error,
    children,
    ...rest
  } = props;

  return (
    <ChakraFormControl {...rest}>
      <HStack spacing={'4px'}>
        <FormLabel m={0}>{label}</FormLabel>
        {!!tooltip && (
          <Tooltip hasArrow placement={'top'} label={tooltip}>
            <Box>
              <Icon name={'info'} color={'#00000066'} />
            </Box>
          </Tooltip>
        )}
      </HStack>
      {!!description && (<Text mt={'4px'} {...s.Description}>{description}</Text>)}

      <Box mt={'8px'}>{children}</Box>

      <FormErrorMessage>{error}</FormErrorMessage>
    </ChakraFormControl>
  );
}
