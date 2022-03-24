import { TextProps } from '@chakra-ui/react';

export const ContentBidLabelStyle: TextProps = {
  color: 'rgba(0, 0, 0, 0.4)',
  mb: '6px',
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxW: {
    sm: '220px',
    md: '300px'
  },

  sx: {
    strong: {
      color: 'black',
      fontWeight: 700,
    },
  },
};
