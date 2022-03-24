import { Box, BoxProps, Fade, Image, TabList, TabListProps } from '@chakra-ui/react';
import React, { useCallback, useMemo, useRef } from 'react';
import { useScroll } from 'react-use';

import ArrowRightIcon from '../../../../assets/images/marketplace/v2/arrow-right.svg';

const TabListStyles: TabListProps = {
  overflowX: 'scroll',
  overflowY: 'hidden',
};

const ArrowBoxBaseStyles: BoxProps = {
  position: 'absolute',

  sx: {
    img: {
      opacity: 0.4,
    },
  },

  _hover: {
    cursor: 'pointer',
    img: {
      opacity: 1,
    }
  },
};

const LeftArrowBoxBaseStyles: BoxProps = {
  ...ArrowBoxBaseStyles,
  bg: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 75%, rgba(255,255,255,0) 100%)',
  left: 0,
  pr: '20px',
};

const RightArrowBoxBaseStyles: BoxProps = {
  ...ArrowBoxBaseStyles,
  bg: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,1) 100%)',
  right: 0,
  pl: '20px',
};

export const LineTabList = ({ sx, ...props }: TabListProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { x } = useScroll(ref);

  const topPosition = useMemo(() => {
    if (!ref.current) {
      return 0;
    }
    return `${(((ref.current?.offsetHeight ?? 0) / 2) - (24 / 2) - 2)}px`;
  }, [ref.current])

  const showRightArrow = useMemo(() => {
    const el = ref.current;
    if (!el) {
      return false;
    }
    return (x + el.clientWidth) < el.scrollWidth - 20;
  }, [ref.current, x]);
  const showLeftArrow = useMemo(() => {
    const el = ref.current;
    if (!el) {
      return false;
    }
    return x > 20;
  }, [ref.current, x]);

  const handleClickLeftArrow = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.scrollTo(0, 0);
    }
  }, []);
  const handleClickRightArrow = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.scrollTo(el.scrollWidth - el.clientWidth, 0);
    }
  }, []);

  return (
    <Box position={'relative'}>
      <Fade in={showLeftArrow}>
        <Box
          {...LeftArrowBoxBaseStyles}
          top={topPosition}
          pointerEvents={showLeftArrow ? 'auto' : 'none'}
          onClick={handleClickLeftArrow}
        >
          <Image src={ArrowRightIcon} transform={'rotate(-180deg)'} />
        </Box>
      </Fade>
      <Fade in={showRightArrow}>
        <Box
          {...RightArrowBoxBaseStyles}
          top={topPosition}
          pointerEvents={showRightArrow ? 'auto' : 'none'}
          onClick={handleClickRightArrow}
        >
          <Image src={ArrowRightIcon} />
        </Box>
      </Fade>
      <TabList
        ref={ref}
        {...TabListStyles}
        sx={{
          ...sx,
          scrollBehavior: 'smooth',

          '> button:focus': {
            zIndex: '0',
          },
        }}
        {...props}
      />
    </Box>
  );
}
