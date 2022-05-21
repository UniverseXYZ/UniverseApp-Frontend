import { ButtonProps, HeadingProps, ImageProps, keyframes } from '@chakra-ui/react';

export const spinnerAnimationKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Icon: ImageProps = {
  boxSize: {
    base: '128px',
    md: '96px',
  },
  margin: 'auto',
}

export const Title: HeadingProps = {
  fontSize: {
    base: '16px',
    md: '20px',
  },
};

export const CloseButton: ButtonProps = {
  margin: 'auto',
  width: {
    base: '100%',
    md: 'fit-content',
  },
};
