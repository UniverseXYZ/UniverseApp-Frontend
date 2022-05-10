import { LinkProps, TextProps } from '@chakra-ui/react';

export const NFTName: TextProps = {
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxW: '78%',
  whiteSpace: 'nowrap',
};

export const CollectionName: TextProps = {
  color: 'rgba(0 0 0 / 40%)',
  fontSize: '11px',
  fontWeight: 500,
  w: 'fit-content',
  maxW: '50%',

  _hover: {
    color: 'rgba(0 0 0 / 60%)',
    textDecoration: 'underline',
  }
};

export const CollectionLink: LinkProps = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  w: '100%',

  _focus: {
    boxShadow: 'none',
  },
};
