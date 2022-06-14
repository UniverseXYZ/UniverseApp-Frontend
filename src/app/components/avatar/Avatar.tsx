import React from 'react';
import { Box, Avatar as ChakraAvatar, AvatarProps } from "@chakra-ui/react";
import { getStrGradient } from "@app/helpers";

interface ExtendedAvatarProps extends AvatarProps {
  address: string;
}

export const Avatar = ({ address, src, name, size = 'sm', width = '32px', height = '32px' }: ExtendedAvatarProps) => {

  const [color1, color2] = getStrGradient(address);

  if (src) return (
    <ChakraAvatar
      size={size}
      name={name}
      src={src}
      width={width}
      height={height}
    />
  )

  return (
    <Box
      bgGradient={`linear(to-br, ${color1}, ${color2})`}
      borderRadius={'full'}
      width={width}
      height={height}
    />
  );
};
