import { BoxProps, ImageProps } from '@chakra-ui/react';

export const Wrapper: BoxProps = {
  position: 'relative',
  height: '400px',
  width: '100%',
  overflow: 'hidden',

  _before: {
    bg: 'linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0.878906) 6.25%, rgba(0, 0, 0, 0.765625) 12.5%, rgba(0, 0, 0, 0.660156) 18.75%, rgba(0, 0, 0, 0.5625) 25%, rgba(0, 0, 0, 0.472656) 31.25%, rgba(0, 0, 0, 0.390625) 37.5%, rgba(0, 0, 0, 0.316406) 43.75%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.191406) 56.25%, rgba(0, 0, 0, 0.140625) 62.5%, rgba(0, 0, 0, 0.0976562) 68.75%, rgba(0, 0, 0, 0.0625) 75%, rgba(0, 0, 0, 0.0351562) 81.25%, rgba(0, 0, 0, 0.015625) 87.5%, rgba(0, 0, 0, 0.00390625) 93.75%, rgba(0, 0, 0, 0) 100%)',
    position: 'absolute',
    content: '""',
    top: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
};

export const Upload: BoxProps = {
  bg: '#00000033',
  position: 'absolute',
  right: '18px',
  top: '18px',
  borderRadius: '12px',
  padding: '11px',
  cursor: 'pointer',
  zIndex: 1,

  _hover: {
    bg: 'rgba(0 0 0 / 40%)'
  },
};

export const BGImage: ImageProps = {
  objectFit: 'cover',
  pointerEvents: 'none',
  h: '100%',
  w: '100%',
};
