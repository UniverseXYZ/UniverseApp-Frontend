import { ButtonProps } from '@chakra-ui/react';

export const ButtonStyles: ButtonProps = {
  background: 'white',
  border: 0,
  borderRadius: '50%',
  height: '30px',
  minW: 'auto',
  padding: 0,
  position: 'absolute',
  top: 'calc(50% - 15px)',
  width: '30px',
  zIndex: 10,

  _before: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 'inherit',
    position: 'absolute',
    content: '" "',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: -1,
  },
  _disabled: {
    display: 'none',
  },
  _hover: {
    _before: {
      backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
      backgroundOrigin: 'border-box',
      borderColor: 'transparent',
      boxShadow: 'inset 2px 1000px 1px white',
    },
  },
  _focus: {
    boxShadow: 'none',
    _before: {
      backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
      backgroundOrigin: 'border-box',
      borderColor: 'transparent',
      boxShadow: 'inset 2px 1000px 1px white',
    },
  },
};
