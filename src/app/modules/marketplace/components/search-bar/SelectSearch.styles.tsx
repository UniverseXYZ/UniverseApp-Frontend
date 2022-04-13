import { BoxProps, ImageProps } from '@chakra-ui/react';

export const ItemsContainerStyle: BoxProps = {
  maxH: '215px',
  minH: '215px',
  mt: '5px',
  overflowY: 'scroll',
  px: '5px',
  background: 'white',
  borderRadius: '12px',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  w: '100%',
  zIndex: '100'
};

export const ItemStyle: BoxProps = {
  alignItems: 'center',
  borderRadius: '10px',
  display: 'flex',
  fontSize: '14px',
  fontWeight: 500,
  padding: '10px',
  _hover: {
    bg: 'rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
  },
  _last: {
    mb: '10px',
  },
};

export const ItemImageStyle: ImageProps = {
  borderRadius: '50%',
  boxSize: '30px',
  display: 'inline-block',
  marginRight: '12px',
};


