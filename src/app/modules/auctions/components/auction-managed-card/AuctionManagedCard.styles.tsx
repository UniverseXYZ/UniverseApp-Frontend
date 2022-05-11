import { BoxProps, ButtonProps } from '@chakra-ui/react';

export const GradientWrapper: BoxProps = {
  bg: 'radial-gradient(2232.66% 100% at 55.56% 0%, #2AD0CA 0%, #E1F664 22.92%, #FEB0FE 46.87%, #ABB3FC 68.23%, #5DF7A4 87.5%, #58C4F6 100%)',
  borderRadius: '10px',
  boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
  pl: '10px',
  overflow: 'hidden',
  w: '100%',
};

export const Wrapper: BoxProps = {
  bg: 'white',
  minH: '280px',
  padding: '30px',
};

export const ExpandButton: ButtonProps = {
  _hover: {
    bg: 'rgba(0, 0, 0, 0.05)',
  },
};
