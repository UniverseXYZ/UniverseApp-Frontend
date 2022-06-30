import { BoxProps, ButtonProps, ContainerProps, HeadingProps, TextProps } from '@chakra-ui/react';

export const WrapperStyle: BoxProps = {
  bg: 'linear-gradient(103.48deg, rgba(240, 233, 57, 0.16) 0%, rgba(254, 176, 254, 0.16) 49.86%, rgba(66, 164, 255, 0.16) 100%)',
  padding: '44px 0',
};

export const ContainerStyle: ContainerProps = {
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  margin: '0 auto',
  maxW: '1110px',
  padding: { base: '0 20px', xl: '0' },
};

export const HeadingStyle: HeadingProps = {
  fontSize: '20px',
  lineHeight: '24px',
  fontWeight: 600,
  marginBottom: { base: '20px', md: '0' },
};

export const ButtonStyle: ButtonProps = {
  boxShadow: 'lg',
  w: { base: '100%', md: 'fit-content' },
};
