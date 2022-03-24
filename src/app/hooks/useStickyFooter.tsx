import React, { useEffect } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { useLayout } from '../providers';

export const useStickyFooter = (ref: React.RefObject<HTMLElement>) => {
  const { y: scrollY } = useWindowScroll();
  const { height } = useWindowSize(0, 0);
  const { footerRef } = useLayout();

  useEffect(() => {
    if (ref.current && footerRef.current) {
      const isFixed = !(scrollY + height >= footerRef.current.offsetTop ?? 0);
      ref.current.style.bottom = isFixed ? '0' : '';
      ref.current.style.position = isFixed ? 'fixed' : '';
    }
  }, [scrollY, height, footerRef.current, ref.current]);
};
