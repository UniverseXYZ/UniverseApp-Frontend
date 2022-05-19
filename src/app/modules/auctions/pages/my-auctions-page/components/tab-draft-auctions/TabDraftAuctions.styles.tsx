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
  w: {
    base: '100%',
    md: 'fit-content',
  },
};
