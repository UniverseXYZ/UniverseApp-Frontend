import { BoxProps, ButtonProps, ContainerProps, ImageProps, TextProps } from '@chakra-ui/react';

import IntroMobileBGImage from '../../../../../assets/images/v2/marketplace/img_hero_mobile.png';
import IntroTabletBGImage from '../../../../../assets/images/v2/marketplace/img_hero_tablet.png';
import IntroDesktopBGImage from '../../../../../assets/images/v2/marketplace/img_hero_desktop.png';

export const IntroSection: BoxProps = {
  bg: {
    base: `url(${IntroMobileBGImage}) bottom / cover`,
    md: `url(${IntroTabletBGImage}) bottom / cover`,
    lg: `url(${IntroDesktopBGImage}) bottom / cover`
  },
  color: 'black',
  padding: '80px 0 60px',
  flexDir: 'column',
  textAlign: 'center',
};

export const SearchBarWrapper: BoxProps = {
  margin: 'auto',
  maxW: '600px',
  px: {
    base: '16px',
    md: '24px',
    lg: 0,
  },
  w: '100%',
};

export const FiltersStickyWrapper: BoxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  mb: '20px',
  py: '20px',
  px: {
    base: '16px',
    md: '24px',
    lg: '40px',
  },
  position: 'sticky',
  top: '-1px',
  transition: '200ms',
  w: '100%',
  zIndex: 30,
};

export const FiltersWrapper: BoxProps = {
  sx: {
    '> button:nth-of-type(n+3):not(:nth-last-of-type(1))': {
      display: {
        base: 'none',
        lg: 'inline-flex',
      }
    }
  }
};

export const MoreFiltersButton: ButtonProps = {
  fontSize: '14px',
  minWidth: 'fit-content',
  padding: '0 12px',
  position: 'relative',
  zIndex: 1,
  display: {
    base: 'none',
    md: 'inline-flex',
    lg: 'none',
  }
};

export const MoreFiltersButtonArrow: ImageProps = {
  width: '10px',
  transition: '200ms',
  transform: 'rotate(0deg)',
};

export const BetaBadge: BoxProps = {
  bg: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
  borderRadius: '6px',
  display: 'inline-flex',
  fontFamily: '"Space Grotesk"',
  fontSize: '12px',
  fontWeight: 700,
  ml: '8px',
  padding: '4px 9px',
  pos: 'relative',
  textTransform: 'uppercase',
  top: '-20px',
};

export const WelcomeText: TextProps = {
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '5px',
  mb: '20px',
  textTransform: 'uppercase',
};

export const ContentWrapper: BoxProps = {
  px: {
    base: '16px',
    md: '24px',
    lg: '40px',
  },
  pt: {
    base: '20px',
    md: 0
  },
  pb: '60px',
};
