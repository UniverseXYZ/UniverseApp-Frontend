import { BoxProps, ButtonProps, StackProps, TextProps } from '@chakra-ui/react';

export const GradientWrapper: BoxProps = {
  bg: 'radial-gradient(95.11% 95.11% at 36.64% 4.89%, #2AD0CA 0%, #E1F664 22.92%, #FEB0FE 46.88%, #ABB3FC 68.23%, #5DF7A4 87.5%, #58C4F6 100%)',
  backgroundBlendMode: 'overlay',
  backgroundClip: 'padding-box, border-box',
  borderRadius: '10px',
  padding: '4px',
  w: '100%',
  sx: {
    backgroundOrigin: 'padding-box, border-box',
  },
};

export const Wrapper: BoxProps = {
  bg: 'linear-gradient(100.17deg, rgba(42, 208, 202, 0.05) 0%, rgba(225, 246, 100, 0.05) 22.92%, rgba(254, 176, 254, 0.05) 46.87%, rgba(171, 179, 252, 0.05) 68.23%, rgba(93, 247, 164, 0.05) 87.5%, rgba(88, 196, 246, 0.05) 100%), white',
  borderRadius: '8px',
  py: {
    base: '30px',
    lg: '40px',
  }
};

export const RewardBalanceItemWrapper: BoxProps = {
  px: {
    base: '30px',
    lg: '60px',
  },
  _notLast: {
    borderRight: '1px solid rgba(0, 0, 0, 0.1)',
  },
};

export const Label: TextProps = {
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '10',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
};

export const AmountContainer: StackProps = {
  direction: {
    base: 'column',
    md: 'row',
  },
  alignItems: {
    base: 'flex-start',
    md: 'center',
  },
  spacing: {
    base: 0,
    md: '4px',
  },
  mr: '4px',
};

export const Amount: TextProps = {
  fontSize: '24px',
  fontWeight: 600,
};

export const USDAmount: TextProps = {
  color: 'rgba(0 0 0 / 40%)',
  fontSize: '14px',
  fontWeight: 400,
};

export const ButtonContainer: BoxProps = {
  mt: {
    base: '14px',
    md: '14px',
    lg: 0,
  },
  w: {
    base: '100%',
    md: '100%',
    lg: 'fit-content',
  },
};

export const Button: ButtonProps = {
  boxShadow: 'lg',
  p: '11px 16px',
  w: {
    base: '100%',
    md: 'fit-content'
  },
};
