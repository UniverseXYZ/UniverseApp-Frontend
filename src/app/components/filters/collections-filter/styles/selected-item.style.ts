import { BoxProps } from '@chakra-ui/react';

export const SelectedItemStyle: BoxProps = {
  alignItems: 'center',
  bg: 'linear-gradient(135deg, rgba(188, 235, 0, 0.1) 15.57%, rgba(0, 234, 234, 0.1) 84.88%), #FFFFFF',
  border: '1px solid #BCEB00',
  borderRadius: '8px',
  display: 'flex',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
  p: '5px 11px 5px 6px',
  maxH: '32px',
  mb: '8px',
  mr: '8px',

  _last: {
    mb: '20px',
  }
};
