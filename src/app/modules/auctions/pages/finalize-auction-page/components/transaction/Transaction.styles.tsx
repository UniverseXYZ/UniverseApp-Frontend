import { BoxProps, ButtonProps, StackProps } from '@chakra-ui/react';

export const Wrapper: BoxProps = {
  bg: 'white',
  borderRadius: '12px',
  boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
  padding: '20px 30px 30px',
  w: '100%',
};

export const TitleContainer: StackProps = {
  direction: {
    base: 'column',
    md: 'row',
  },
  spacing: {
    base: '10px',
    md: '40px',
  },
  alignItems: {
    base: 'flex-start',
    md: 'center',
  },
  mb: '20px',
};

export const Button: ButtonProps = {
  w: {
    base: '100%',
    md: 'fit-content'
  },
};

export const TireWrapper: BoxProps = {
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  padding: '20px 0 30px',
  _last: {
    paddingBottom: {
      base: '30px',
      md: 0,
    },
  },
};
