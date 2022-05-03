import { BoxProps, ButtonProps, ContainerProps, HeadingProps, TextProps } from '@chakra-ui/react';

import BGDesktopImage from '@assets/images/auction-house-bg-desktop.png';
import BGTabletImage from '@assets/images/auction-house-bg-tablet.png';

export const Wrapper: BoxProps = {
  alignItems: 'center',
  bg: {
    base: `url(${BGTabletImage}) center / cover no-repeat, black`,
    md: `url(${BGDesktopImage}) center / cover no-repeat, black`,
  },
  display: 'flex',
  justifyContent: 'center',
  minH: '440px',
  padding: { base: '0px 20px', md: '0 60px' },
};

export const Container: ContainerProps = {
  margin: { base: '-50px auto 0', md: '0 auto' },
  maxW: '1110px',
  overflow: 'hidden',
};

export const Title: HeadingProps = {
  color: 'white',
  fontSize: { base: '26px', md: '48px' },
  fontWeight: 600,
  lineHeight: '120%',
  textAlign: 'center',
};

export const SubTitle: HeadingProps = {
  color: 'white',
  fontFamily: '"Space Grotesk"',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '140%',
  letterSpacing: '0.3em',
  mb: { base: '10px', md: '23px' },
  textAlign: 'center',
  textTransform: 'uppercase',
};

export const Text: TextProps = {
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '16px',
  fontWeight: 'normal',
  lineHeight: '150%',
  textAlign: 'center',
  margin: '12px auto 38px',
  maxW: { base: 'auto', sm: '307px', lg: '460px' },
};

export const Button: ButtonProps = {
  color: 'white',
  boxShadow: '2px 1000px 1px black inset !important',
  _hover: {
    boxShadow: '2px 1000px 1px rgba(0, 0, 0, 0.9) inset !important'
  },
};
