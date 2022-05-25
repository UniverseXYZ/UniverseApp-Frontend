import { BoxProps, ImageProps, TextProps } from '@chakra-ui/react';

export const DescriptionStyle: TextProps = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: '12px',
  fontWeight: 500,
};

export const ImageStyle: ImageProps = {
  borderRadius: '50%',
  h: '42px',
  mr: '16px',
  w: '42px',
};

export const NameStyle: TextProps = {
  fontSize: '14px',
  fontWeight: 700,
};

export const PriceStyles: BoxProps = {
  as: 'strong',
  color: 'black',
};
