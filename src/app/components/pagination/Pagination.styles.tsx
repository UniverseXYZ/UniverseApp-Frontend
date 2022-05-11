import { BoxProps } from '@chakra-ui/react';

export const Wrapper: BoxProps = {
  sx: {
    'ul': {
      display: 'flex',
    },
    'li': {
      mr: '8px',
      '&.selected a': {
        bg: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
        backgroundOrigin: 'border-box',
        borderColor: 'transparent',
      },
      '&.disabled a': {
        bg: 'rgba(0, 0, 0, 0.05)',
        borderColor: 'transparent',
        cursor: 'not-allowed',
      },
    },
    'a': {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: 700,
      h: '32px',
      minW: '32px',
    },
  }
}
