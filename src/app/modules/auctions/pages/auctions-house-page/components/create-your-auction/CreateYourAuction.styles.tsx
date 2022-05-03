import { BoxProps, ButtonProps, ContainerProps, HeadingProps, TextProps } from '@chakra-ui/react';

import BGDesktopImage from '@assets/images/create-your-auction-bg-desktop.png';
import BGTabletImage from '@assets/images/create-your-auction-bg-tablet.png';
import BGMobileImage from '@assets/images/create-your-auction-bg-mobile.png';

export const WrapperStyle: BoxProps = {
  bg: {
    base: `url(${BGMobileImage}) center / cover`,
    md: `url(${BGTabletImage}) center / cover`,
    lg: `url(${BGDesktopImage}) center / cover`,
  },
  padding: '65px 60px',
};

export const ContainerStyle: ContainerProps = {
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: { base: 'center', md: 'space-between' },
  margin: '0 auto',
  maxW: '1110px',
  padding: 0,
};

export const HeadingStyle: HeadingProps = {
  fontSize: '26px',
  fontWeight: 600,
  mb: '12px',
  textAlign: { base: 'center', md: 'left' },
};

export const TextStyle: TextProps = {
  fontSize: '16px',
  mr: '24px',
  mb: { base: '24px', md: '0' },
  textAlign: { base: 'center', md: 'left' },
};

export const ButtonStyle: ButtonProps = {
  boxShadow: 'lg',
  w: { base: '100%', md: 'fit-content' },
};
