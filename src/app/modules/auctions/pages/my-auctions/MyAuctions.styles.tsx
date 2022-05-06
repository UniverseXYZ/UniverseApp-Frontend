import { BoxProps, TabPanelProps } from '@chakra-ui/react';

import AuctionsBGImage from '@assets/images/auctions-bg.png';

export const Wrapper: BoxProps = {
  bg: `url(${AuctionsBGImage}) center top / contain no-repeat`,
  pb: '100px',
  px: '100px',
};

export const Header: BoxProps = {
  alignItems: 'center',
  justifyContent: 'space-between',
  py: '60px',
};

export const TabPanel: TabPanelProps = {
  pt: '40px',
};
