import { ButtonProps, StackProps, TextProps } from '@chakra-ui/react';

export const FooterWrapper: StackProps = {
  direction: {
    base: 'column',
    md: 'row'
  },
  spacing: '16px',
  justifyContent: 'center',
  w: '100%',
};

export const Message: TextProps = {
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: {
    base: '14px',
    md: '16px'
  },
  fontWeight: 400,
};

export const Button: ButtonProps = {
  w: {
    base: '100%',
    md: 'fit-content'
  },
}
