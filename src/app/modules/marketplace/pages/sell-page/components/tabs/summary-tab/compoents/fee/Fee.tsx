import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

interface IFeeProps {
  name: string;
  amount: number;
}

export const Fee = ({ name, amount }: IFeeProps) => (
  <Flex py={'5px'}>
    <Box>{name}</Box>
    <Flex flex={1} borderBottom={'2px dotted rgba(0, 0, 0, 0.1)'} m={'5px'} />
    <Box>{amount}%</Box>
  </Flex>
)
