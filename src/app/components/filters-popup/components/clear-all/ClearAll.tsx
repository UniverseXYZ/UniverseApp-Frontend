import { Link, LinkProps } from '@chakra-ui/react';
import React, { useCallback } from 'react';

const ClearAllStyle: LinkProps = {
  fontFamily: 'Space Grotesk',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'underline',
  _hover: {
    textDecoration: 'none',
  },
};

export const ClearAll = ({ onClick, ...props }: LinkProps) => {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    onClick && onClick(e);
  }, [onClick]);

  return (
    <Link
      href={'#'}
      {...ClearAllStyle}
      {...props}
      onClick={handleClick}
    >Clear all</Link>
  );
};
