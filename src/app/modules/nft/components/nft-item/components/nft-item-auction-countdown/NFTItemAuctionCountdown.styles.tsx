import { BoxProps, FlexProps, ImageProps, TextProps } from '@chakra-ui/react';

export const Wrapper: FlexProps = {
  position: 'absolute',
  bottom: '8px',
  justifyContent: 'center',
  w: '100%',
  zIndex: 1,
};

export const Container: BoxProps = {
  background: 'rgba(0 0 0 / 20%)',
  backdropFilter: 'blur(4px)',
  borderRadius: '8px',
  color: 'white',
  padding: '6px 12px',
}

export const Icon: ImageProps = {
  display: 'inline',
  mr: '6px',
  mt: '-3px',
};

export const Text: TextProps = {
  fontSize: '12px',
  fontWeight: '700',
  sx: {
    background: '-webkit-linear-gradient(#BCEB00, #00EAEA)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
};
