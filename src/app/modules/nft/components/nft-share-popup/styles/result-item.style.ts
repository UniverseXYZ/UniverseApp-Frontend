import { FlexProps } from '@chakra-ui/react';

export const ResultItemStyle: FlexProps = {
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: '20px',

  _last: {
    mb: 0,
  },

  sx: {
    img: {
      borderRadius: '50%',
      h: '42px',
      mr: '16px',
      objectFit: 'cover',
      w: '42px',
    },

    p: {
      flex: 1,
      fontSize: '16px',
      fontWeight: 700,
    }
  }
}
