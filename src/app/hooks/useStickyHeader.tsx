import React, { useEffect, useMemo, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { useLayout } from '../providers';

// export const useStickyHeader = (ref: React.RefObject<HTMLElement>) => {
//   const { y: scrollY } = useWindowScroll();
//   const { height } = useWindowSize(0, 0);
//   const { headerRef } = useLayout();
//
//   const [originalRefY, setOriginalRefY] = useState<number>(0);
//
//   useEffect(() => {
//     if (ref.current) {
//       const root = document.getElementById('root');
//       if (root) {
//         root.style.height = 'auto';
//       }
//       ref.current.style.position = 'sticky';
//       ref.current.style.top = '0';
//
//       setOriginalRefY(ref.current.getBoundingClientRect().top + scrollY);
//     }
//   }, [height]);
//
//   useEffect(() => {
//     if (ref.current && headerRef.current) {
//       const headerHeight = headerRef.current.offsetHeight;
//       if (scrollY + headerHeight > originalRefY) {
//         headerRef.current.style.position = 'absolute';
//         headerRef.current.style.top = `${originalRefY - headerHeight}px`;
//         ref.current.style.zIndex = '30';
//       } else {
//         headerRef.current.style.position = 'fixed';
//         headerRef.current.style.top = `0`;
//       }
//
//       if (scrollY < originalRefY) {
//         ref.current.style.zIndex = '';
//       }
//     }
//   }, [originalRefY, scrollY, headerRef.current, ref.current]);
//
//   return scrollY > originalRefY;
// };

export const useStaticHeader = () => {
  const { headerRef } = useLayout();

  useEffect(() => {
    if (!headerRef.current) {
      return;
    }

    headerRef.current.style.position = 'static';
    document.body.style.setProperty('padding-top', '0', 'important');

    return () => {
      (headerRef.current as HTMLElement).style.position = '';
      document.body.style.setProperty('padding-top', '');
    }
  }, [headerRef.current]);
}

export const useStickyHeader2 = (ref: React.RefObject<HTMLElement>) => {
  const { y: scrollY } = useWindowScroll();
  const { headerRef } = useLayout();

  const [originalRefY, setOriginalRefY] = useState<number>(0);

  useEffect(() => {
    const body = document.body;
    const root = document.getElementById('root');

    if (!ref.current || !headerRef.current || !body || !root) {
      return;
    }

    const originalRefY = ref.current.getBoundingClientRect().top + scrollY - 84;
    setOriginalRefY(originalRefY);

    body.style.setProperty('padding-top', '0', 'important');
    root.style.height = `${originalRefY}px`;
    headerRef.current.style.position = 'sticky';
    headerRef.current.style.bottom = `${originalRefY}px`;
    ref.current.style.position = 'sticky';
    ref.current.style.top = '0';

    return () => {
      body.style.paddingTop = '';
      root.style.height = '';
      if (headerRef.current) {
        headerRef.current.style.position = 'sticky';
        headerRef.current.style.bottom = `${originalRefY}px`;
      }
      if (ref.current) {
        ref.current.style.position = '';
        ref.current.style.top = '';
      }
    }
  }, [ref.current, headerRef.current]);

  useEffect(() => {
    return () => {
      if (headerRef.current) {
        headerRef.current.style.position = 'fixed';
        headerRef.current.style.bottom = ``;
      }
    }
  }, []);

  return scrollY > originalRefY;
};
