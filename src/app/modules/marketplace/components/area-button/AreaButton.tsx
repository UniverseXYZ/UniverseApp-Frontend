import { BoxProps, Center, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import * as s from './AreaButton.styles';

export interface IAreaButton extends BoxProps {
  title: string;
  description: string;
  icon: string;
  disabled?: boolean;
}

export const AreaButton: React.FC<IAreaButton> = (props) => {
  const { title, description, icon, disabled = false, onClick, ...rest } = props;

  return (
    <Center
      {...s.Item}
      data-disabled={disabled || undefined}
      onClick={!disabled ? onClick : undefined}
      {...rest}
    >
      <VStack spacing={'24px'}>
        <Image src={icon} {...s.Icon} />

        <VStack spacing={'4px'}>
          <Text fontSize={'18px'} fontWeight={700}>{title}</Text>
          <Text color={'rgba(0, 0, 0, 0.4)'} fontSize={'14px'}>{description}</Text>
        </VStack>
      </VStack>
    </Center>
  );
};
