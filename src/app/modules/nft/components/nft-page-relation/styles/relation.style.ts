import { LinkProps } from '@chakra-ui/react';

export const RelationStyle: LinkProps = {
  _hover: {
    textDecoration: 'none !important',
    'div p:nth-of-type(2)': {
      textDecoration: 'underline',
    }
  },
  _notLast: {
    '> div > div': {
      _last: {
        pr: '20px'
      }
    },
  },
};
