import { ButtonProps, TextProps } from '@chakra-ui/react';

export const StepLabel: TextProps = {
  color: 'rgba(0 0 0 / 40%)',
  fontSize: '10px',
  fontWeight: '600',
  lineHeight: '15px',
};

export const StepTitle: TextProps = {
  color: 'black',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '21px',
  mb: '2px',
};

export const StepButton: ButtonProps = {
  margin: 'auto',
  padding: '11px 16px',
  width: {
    base: '100%',
    md: 'fit-content',
  },
};

export const RemoveButton: ButtonProps = {
  border: '1px solid #FF4949',
  borderRadius: '8px',
  color: '#FF4949',
  w: {
    base: '100%',
    md: 'fit-content',
  },
  _hover: {
    bg: 'rgba(255, 73, 73, 0.05)',
    borderColor: '#E90000',
    color: '#E90000',
  },
  _active: {
    transform: 'scale(0.95)',
  },
};
