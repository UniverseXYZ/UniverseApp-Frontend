import { Button, ButtonProps, Fade, Image } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useWindowScroll } from 'react-use';

import BackToTopIcon from '../../../assets/images/marketplace/v2/back-to-top_icon.svg';

const size = 40;
const positionOffset = {
  base: '16px',
  sm: '24px',
  lg: '40px',
};

const styles: ButtonProps = {
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.1)',
  border: '1px solid transparent',
  borderColor: 'transparent',
  borderRadius: '12px',
  bottom: positionOffset,
  boxShadow: 'inset 2px 1000px 1px #fff',
  display: {
    base: 'none',
    md: 'flex',
  },
  height: `${size}px`,
  justifyContent: 'center',
  padding: 0,
  position: 'fixed',
  right: positionOffset,
  width: `${size}px`,
  zIndex: 30,
  sx: {
    backgroundOrigin: 'border-box !important',
  },
  _hover: {
    background: 'linear-gradient(175deg,#bceb00,#00eaea)',
  },
  _focus: {
    background: 'linear-gradient(175deg,#bceb00,#00eaea)',
  },
  _active: {
    background: 'linear-gradient(175deg,#bceb00,#00eaea)',
  },
};

export const BackToTopButton = () => {
  const { y: scrollY } = useWindowScroll();

  const handleClickGoToTop = useCallback(() => {
    window && window.scrollTo(0, 0)
  }, []);

  return (
    <Fade in={scrollY > 50 }>
      <Button {...styles} onClick={handleClickGoToTop}>
        <Image src={BackToTopIcon} />
      </Button>
    </Fade>
  );
};
