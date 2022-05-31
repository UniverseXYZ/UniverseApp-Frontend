import { BoxProps, ButtonProps, TextProps } from '@chakra-ui/react';

export const RoyaltyRemoveButton: ButtonProps = {
  borderRadius: '12px',
  boxSize: '48px',
  color: '#00000066',
  minW: 'auto',

  _hover: {
    borderColor: '#FF4949',
    color: '#FF4949',
  },
};

export const RoyaltyAddButtonIconWrapper: BoxProps = {
  bg: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
  borderRadius: 'full',
  boxSize: '20px',
};

export const RoyaltyAddButtonText: TextProps = {
  color: 'black !important',
  fontSize: '16px !important',
  fontWeight: '500 !important',

  _hover: {
    cursor: 'pointer',
    textDecoration: 'underline',
  }
};
