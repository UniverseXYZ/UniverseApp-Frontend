import React, { useEffect, useMemo, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { useLayout } from '../providers';

export const useStickyHeader = (ref: React.RefObject<HTMLElement>) => {
  const { y: scrollY } = useWindowScroll();
  const { height } = useWindowSize(0, 0);
  const { headerRef } = useLayout();

  const [originalRefY, setOriginalRefY] = useState<number>(0);

  useEffect(() => {
    if (ref.current) {
      const root = document.getElementById('root');
      if (root) {
        root.style.height = 'auto';
      }
      ref.current.style.position = 'sticky';
      ref.current.style.top = '0';

      setOriginalRefY(ref.current.getBoundingClientRect().top + scrollY);
    }
  }, [height]);

  useEffect(() => {
    if (ref.current && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      if (scrollY + headerHeight > originalRefY) {
        headerRef.current.style.position = 'absolute';
        headerRef.current.style.top = `${originalRefY - headerHeight}px`;
        ref.current.style.zIndex = '30';
      } else {
        headerRef.current.style.position = 'fixed';
        headerRef.current.style.top = `0`;
      }

      if (scrollY < originalRefY) {
        ref.current.style.zIndex = '';
      }
    }
  }, [originalRefY, scrollY, headerRef.current, ref.current]);

  return scrollY > originalRefY;
};
