import { BoxProps, ButtonProps } from '@chakra-ui/react';

export const Button: ButtonProps = {
  bg: 'white',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  fontWeight: 500,
  height: '48px',
  padding: '13px 16px',

  _hover: {
    border: '1px solid rgba(0, 0, 0, 0.2)',
  }
};

export const AmountLabel: BoxProps = {
  alignItems: 'center',
  bg: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
  borderRadius: 'full',
  boxSize: '20px',
  display: 'inlineFlex',
  fontSize: '11px',
  fontWeight: 700,
  justifyContent: 'center',
};
