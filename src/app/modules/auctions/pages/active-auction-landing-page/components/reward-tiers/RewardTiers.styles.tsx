import { BoxProps, ContainerProps, HeadingProps, TextProps } from '@chakra-ui/react';

export const WrapperStyle: BoxProps = {
  bg: '#fff',
  padding: '120px 0',
};

export const ContainerStyle: ContainerProps = {
  margin: '0 auto',
  maxW: '1110px',
  padding: { base: '0 20px', xl: '0' },
};

export const HeadingWrapperStyle: BoxProps = {
  textAlign: 'center',
  padding: { base: '0 20px', md: '0 80px', xl: '0' },
};

export const HeadingStyle: HeadingProps = {
  fontSize: '26px',
  lineHeight: '32px',
  fontWeight: 600,
  marginBottom: '8px',
};

export const TextStyle: TextProps = {
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '20px',
};
