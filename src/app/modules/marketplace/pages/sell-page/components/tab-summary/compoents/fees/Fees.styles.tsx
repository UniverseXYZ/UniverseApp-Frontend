import { BoxProps } from '@chakra-ui/react';

export const Wrapper: BoxProps = {
  color: '#00000099',
  mb: '30px',
  p: '16px 24px',
  w: '100%',
};

export const Item: BoxProps = {
  alignItems: 'flex-end',
  display: 'flex',
  gap: '5px',
  mb: '8px',

  _last: {
    color: 'black',
    fontWeight: 'bold',
    mb: 0,
  },
};

export const Dots: BoxProps = {
  borderBottom: '2px dotted rgba(0, 0, 0, 0.1)',
  flex: 1,
  mb: '5px',
};
