import React, { useEffect, useState } from 'react';
import { useIsomorphicLayoutEffect, useWindowScroll, useWindowSize } from 'react-use';

import { useLayout } from '../providers';

export const useStickyHeader = (ref: React.RefObject<HTMLElement>) => {
  const { y: scrollY } = useWindowScroll();
  const { height } = useWindowSize(0, 0);
  const { headerRef } = useLayout();

  const [originalRefY, setOriginalRefY] = useState<number>(0);

  // useEffect(() => {
  //   if (ref.current) {
  //     setOriginalRefY(ref.current.getBoundingClientRect().top + scrollY);
  //   }
  // }, [height]);
  //
  // useIsomorphicLayoutEffect(() => {
  //   if (ref.current && headerRef.current) {
  //     const headerHeight = headerRef.current.offsetHeight;
  //
  //     if (scrollY + headerHeight > originalRefY) {
  //       headerRef.current.style.position = 'absolute';
  //       headerRef.current.style.top = `${originalRefY - headerHeight}px`;
  //     } else {
  //       headerRef.current.style.position = 'fixed';
  //       headerRef.current.style.top = `0`;
  //     }
  //
  //     if (scrollY > originalRefY) {
  //       if (ref.current.parentElement) {
  //         ref.current.parentElement.style.paddingTop = `${ref.current.offsetHeight}px`;
  //       }
  //       ref.current.style.position = 'fixed';
  //       ref.current.style.top = `0`;
  //       ref.current.style.zIndex = `30`;
  //     } else {
  //       if (ref.current.parentElement) {
  //         ref.current.parentElement.style.paddingTop = ``;
  //       }
  //       ref.current.style.position = '';
  //       ref.current.style.top = ``;
  //       ref.current.style.zIndex = ``;
  //     }
  //   }
  // }, [originalRefY, scrollY, headerRef.current, ref.current]);

  useEffect(() => {
    if (ref.current) {
      if (ref.current.parentElement) {
        ref.current.parentElement.style.height = 'auto';
      }
      ref.current.style.position = 'sticky';
      ref.current.style.top = '0';
      ref.current.style.zIndex = '30';

      setOriginalRefY(ref.current.getBoundingClientRect().top + scrollY);
    }
  }, [height]);

  useEffect(() => {
    if (ref.current && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      if (scrollY + headerHeight > originalRefY) {
        headerRef.current.style.position = 'absolute';
        headerRef.current.style.top = `${originalRefY - headerHeight}px`;
      } else {
        headerRef.current.style.position = 'fixed';
        headerRef.current.style.top = `0`;
      }
    }
  }, [originalRefY, scrollY, headerRef.current, ref.current]);
};
