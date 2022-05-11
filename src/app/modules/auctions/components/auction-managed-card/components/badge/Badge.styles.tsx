import { StackProps } from '@chakra-ui/react';

export const Wrapper: StackProps = {
  bg: 'rgba(0, 0, 0, 0.05)',
  border: '1px solid transparent',
  borderRadius: '100px',
  padding: '6px 16px',
  fontSize: '14px',

  _invalid: {
    bg: 'rgba(255, 73, 73, 0.1)',
    borderColor: '#FF4949',
    color: '#FF4949',
  }
};
