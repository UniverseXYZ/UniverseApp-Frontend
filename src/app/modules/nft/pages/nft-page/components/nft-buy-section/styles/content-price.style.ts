import { TextProps } from '@chakra-ui/react';

export const ContentPriceStyle: TextProps = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontWeight: 500,
  mr: '6px',

  sx: {
    strong: {
      color: 'black',
      fontSize: '20px',
      lineHeight: '20px',
      fontWeight: 700,
      mr: '6px',
    },

    img: {
      display: 'inline-block',
      h: '22px',
      mr: '6px',
      mt: '-8px',
      w: '14px',
    }
  },
};
