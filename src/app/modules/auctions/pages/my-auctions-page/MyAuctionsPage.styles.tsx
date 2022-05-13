import { BoxProps, StackProps, TabPanelProps } from '@chakra-ui/react';

import AuctionsBGImage from '@assets/images/auctions-bg.png';

export const Wrapper: BoxProps = {
  bg: `url(${AuctionsBGImage}) center top / contain no-repeat`,
  pb: '100px',
  px: {
    base: '20px',
    md: '60px',
    lg: '100px',
  },
};

export const Header: StackProps = {
  alignItems: {
    base: 'auto',
    md: 'center',
  },
  justifyContent: 'space-between',
  py: '60px',
};

export const TabPanel: TabPanelProps = {
  pt: '40px',
};
