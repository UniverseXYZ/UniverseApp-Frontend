import { BoxProps, ButtonProps, LinkProps, TextProps } from '@chakra-ui/react';

import AuctionsBGImage from '@assets/images/auctions-bg.png';

export const Wrapper: BoxProps = {
  bg: `url(${AuctionsBGImage}) center top / 100% no-repeat`,
  pb: '100px',
  px: {
    base: '20px',
    md: '60px',
    lg: '100px',
  },
};

export const MyAuctionsLink: LinkProps = {
  fontSize: '16px',
  fontWeight: 500,
  mb: '20px',
};

export const PageDescription: TextProps = {
  color: 'rgba(0 0 0 / 60%)',
  fontSize: '18px',
  fontWeight: 400,
  maxW: '50%',
  mb: '60px',
};

export const StepTitle: TextProps = {
  fontSize: '20px',
  mb: '10px',
};

export const StepDescription: TextProps = {
  color: 'rgba(0 0 0 / 60%)',
  fontSize: '14px',
  fontWeight: 400,
  mb: '30px',
};

export const CancelButton: ButtonProps = {
  border: '1px solid #FF4949',
  borderRadius: '8px',
  color: '#FF4949',
  w: {
    base: '100%',
    md: 'fit-content',
  },
  _hover: {
    bg: 'rgba(255, 73, 73, 0.05)',
    borderColor: '#E90000',
    color: '#E90000',
  },
  _active: {
    transform: 'scale(0.95)',
  },
};
