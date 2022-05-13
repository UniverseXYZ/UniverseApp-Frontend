import { BoxProps, ButtonProps, StackProps } from '@chakra-ui/react';

export const Wrapper: BoxProps = {
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  padding: '30px',
  w: '100%',
};

export const TitleWrapper: StackProps = {
  alignItems: { base: 'flex-start', md: 'center' },
  direction: { base: 'column', md: 'row' },
  spacing: { base: '10px', md: '20px' },
  mb: '20px',
  w: '100%',
};

export const NFTAsset: BoxProps = {
  boxSize: '85px',
  borderRadius: '8px',
  pos: 'relative',
}

export const AmountBadge: BoxProps = {
  bg: 'rgba(0, 0, 0, 0.8)',
  borderRadius: '4px',
  color: 'white',
  fontSize: '10px',
  fontWeight: 500,
  pos: 'absolute',
  top: '4px',
  right: '4px',
  padding: '0 4px',
};

export const SwiperLeftButton: ButtonProps = {
  bg: 'rgba(0, 0, 0, 0.1)',
  border: '1px solid transparent',
  borderRadius: 'full',
  boxShadow: 'inset 2px 1000px 1px hsl(0deg 0% 100%)',
  boxSize: '36px',
  cursor: 'pointer',
  pos: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translate(-50%, -50%)',
  zIndex: 10,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  minW: 'auto',
  sx: {
    transformStyle: 'preserve-3d',
  },

  _hover: {
    bg: 'linear-gradient(175deg, #bceb00, #00eaea)',
    backgroundOrigin: 'border-box',
  },
  _focus: {
    bg: 'rgba(0, 0, 0, 0.1)',
    backgroundOrigin: 'border-box',
    boxShadow: 'inset 2px 1000px 1px hsl(0deg 0% 100%)',
  },
  _disabled: {
    display: 'none',
  },

  _after: {
    bg: 'linear-gradient(90deg, white 0%, rgba(255, 255, 255, 0) 100%)',
    content: '""',
    display: 'block',
    h: '85px',
    pointerEvents: 'none',
    pos: 'absolute',
    transform: 'translateX(50%) translateZ(-1px)',
    w: '60px',
    zIndex: -1,
  },
};

export const SwiperRightButton: ButtonProps = {
  ...SwiperLeftButton,
  left: 'auto',
  right: 0,
  transform: 'translate(50%, -50%)',

  _after: {
    ...SwiperLeftButton._after,
    bg: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
    transform: 'translateX(-50%) translateZ(-1px) rotate(180deg)',
  }
};

export const WinnerSelectorButton: ButtonProps = {
  minWidth: '200px',
  mt: {
    base: '12px',
    md: 0,
  },
  width: {
    base: '100%',
    md: 'fit-content',
  }
};

