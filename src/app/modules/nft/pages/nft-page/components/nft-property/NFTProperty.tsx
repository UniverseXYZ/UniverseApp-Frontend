import { Box, BoxProps, Text, TextProps } from '@chakra-ui/react';
import React from 'react';

const PropertyContainerStyles: BoxProps = {
  bg: 'rgba(0, 0, 0, 0.02)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '12px',
  fontSize: '12px',
  padding: '13px',
  textAlign: 'center',
}

const PropertyNameStyles: TextProps = {
  fontSize: '10px',
  fontWeight: 500,
  mb: '5px',
  textTransform: 'uppercase',
}

const PropertyValueStyles: TextProps = {
  fontWeight: 700,
  mb: '3px',
};

const PropertyDescriptionStyles: TextProps = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontWeight: 400,
};

interface INFTPropertyProps {
  name: string;
  value: string;
  description?: string;
}

export const NFTProperty = ({ name, value, description }: INFTPropertyProps) => {
  return (
    <Box {...PropertyContainerStyles}>
      <Text {...PropertyNameStyles}>{name}</Text>
      <Text {...PropertyValueStyles}>{value}</Text>
      {description && (<Text {...PropertyDescriptionStyles}>{description}</Text>)}
    </Box>
  );
};
