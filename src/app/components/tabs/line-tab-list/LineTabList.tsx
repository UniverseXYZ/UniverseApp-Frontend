import { Box, Fade, Image, TabList, TabListProps } from '@chakra-ui/react';
import React, { useCallback, useMemo, useRef } from 'react';
import { useScroll } from 'react-use';

import ArrowRightIcon from '@assets/images/marketplace/v2/arrow-right.svg';

import * as styles from './LineTabList.styles';

export const LineTabList = (props: TabListProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { x } = useScroll(ref);

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
          {...styles.LeftArrowBoxBaseStyles}
          pointerEvents={showLeftArrow ? 'auto' : 'none'}
          onClick={handleClickLeftArrow}
        >
          <Image src={ArrowRightIcon} transform={'rotate(-180deg)'} />
        </Box>
      </Fade>
      <TabList ref={ref} {...props} />
      <Fade in={showRightArrow}>
        <Box
          {...styles.RightArrowBoxBaseStyles}
          pointerEvents={showRightArrow ? 'auto' : 'none'}
          onClick={handleClickRightArrow}
        >
          <Image src={ArrowRightIcon} />
        </Box>
      </Fade>
    </Box>
  );
}
