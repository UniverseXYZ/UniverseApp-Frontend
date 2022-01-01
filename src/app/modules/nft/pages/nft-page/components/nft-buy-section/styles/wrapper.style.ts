import { BoxProps } from '@chakra-ui/react';

export const WrapperStyle: BoxProps = {
  bg: 'linear-gradient(135deg, rgba(188, 235, 0, 0.03) 15.57%, rgba(0, 234, 234, 0.03) 84.88%), rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  position: 'sticky',
  bottom: 0,

  _before: {
    position: 'absolute',
    height: '3px',
    bg: 'linear-gradient(90deg, #2AD0CA 0%, #E1F664 22.92%, #FEB0FE 46.88%, #ABB3FC 68.23%, #5DF7A4 87.5%, #58C4F6 100%)',
    content: '""',
    w: '100%',
    top: 0,
    left: 0,
  },
};
