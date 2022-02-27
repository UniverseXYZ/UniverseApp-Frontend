import { BoxProps } from '@chakra-ui/react';

export const getShareButtonStyle: (icon: string) => BoxProps = (icon) => ({
  bg: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '50%',
  cursor: 'pointer',
  h: '62px',
  display: 'block',
  m: 'auto',
  mb: '16px',
  position: 'relative',
  w: '62px',

  _after: {
    bg: `url(${icon}) center no-repeat, white`,
    borderRadius: 'inherit',
    content: '""',
    display: 'block',
    h: 'calc(100% - 2px)',
    left: '1px',
    position: 'absolute',
    top: '1px',
    w: 'calc(100% - 2px)',
  },

  _hover: {
    bg: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
  }
});
