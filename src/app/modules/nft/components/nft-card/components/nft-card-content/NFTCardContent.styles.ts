import { TextProps } from '@chakra-ui/react';

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
  maxW: '50%',
  w: 'fit-content',

  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',

  _hover: {
    color: 'rgba(0 0 0 / 60%)',
    textDecoration: 'underline',
  }
};
