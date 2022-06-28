import { BoxProps } from '@chakra-ui/react';

export const DatesContainerStyle: BoxProps = {
  color: '#00000066',
  mb: '24px',
  w: '100%',
  h: {
    md: '80px',
  },

  flexDir: {
    base: 'column',
    md: 'row'
  },

  sx: {
    '.date-item': {
        padding: '16px 0px 16px 24px',
        justifyContent: 'center',
        'div': {
            _first: {
                color: 'black',
                fontWeight: 'bold',
                lineHeight: '24px'
            },
            _last: {
                color: '#1A1A1A',
                lineHeight: '24px'
            }
        }
    },
  },
};
