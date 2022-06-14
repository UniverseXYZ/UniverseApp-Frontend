import { Box, BoxProps } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useIntersection } from 'react-use';

interface IFiltersStickyWrapperProps extends BoxProps {}

export const FiltersStickyWrapper: React.FC<IFiltersStickyWrapperProps> = (props) => {
  const ref = useRef(null);

  const intersection = useIntersection(ref, {
    threshold: 1,
    rootMargin: "0px",
    root: null,
  });

  return (
    <Box
      ref={ref}
      bg={(intersection?.intersectionRect.top ?? 1) === 0 ? 'white' : 'transparent'}
      {...props}
    />
  );
}
