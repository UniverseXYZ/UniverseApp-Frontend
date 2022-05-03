import { ButtonProps, TooltipProps } from '@chakra-ui/react';

export const BackButtonTooltipStyle: Omit<TooltipProps, 'children'> = {
  borderRadius: '8px',
  padding: '12px 16px',
  fontSize: '14px',
};

export const BackButtonStyle: ButtonProps = {
  borderColor: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  boxSize: '42px',
  display: {
    base: 'none',
    xl: 'block',
  },
  left: '40px',
  pos: 'absolute',
  top: '40px',

  _hover: {
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  _active: {
    transform: 'scale(0.9)'
  },
};

export const MobileBackButtonStyle: ButtonProps = {
  border: 0,
  display: {
    base: 'inline-flex',
    xl: 'none',
  },
  fontSize: '16px',
  mb: '24px',
};
