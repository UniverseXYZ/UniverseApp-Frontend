import { BoxProps, ImageProps, TextProps } from '@chakra-ui/react';

export const Image: ImageProps & BoxProps = {
  borderRadius: '50%',
  boxSize: '42px',
};

export const Name: TextProps = {
  fontSize: '14px',
  fontWeight: 700,
};

export const Description: TextProps = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: '12px',
  fontWeight: 500,
};

export const Price: BoxProps = {
  as: 'strong',
  color: 'black',
};
