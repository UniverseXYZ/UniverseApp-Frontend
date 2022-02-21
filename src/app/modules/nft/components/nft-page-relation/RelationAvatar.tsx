import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

interface IRelationAvatarProps extends BoxProps {
  src?: string;
}

export const RelationAvatar = ({ src, ...rest }: IRelationAvatarProps) => (
  <Box
    bg={`url(${src}) center / cover`}
    borderRadius={'50%'}
    objectFit={'cover'}
    h={'30px'}
    w={'30px'}
    {...rest}
  />
);
