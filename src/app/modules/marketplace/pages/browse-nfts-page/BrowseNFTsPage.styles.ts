import { BoxProps, ButtonProps, ContainerProps } from '@chakra-ui/react';

import IntroMobileBGImage from '../../../../../assets/images/v2/marketplace/img_hero_mobile.png';
import IntroTabletBGImage from '../../../../../assets/images/v2/marketplace/img_hero_tablet.png';
import IntroDesktopBGImage from '../../../../../assets/images/v2/marketplace/img_hero_desktop.png';

export const IntroSectionStyle: BoxProps = {
  alignItems: 'center',
  bg: {
    base: `url(${IntroMobileBGImage}) bottom / cover`,
    md: `url(${IntroTabletBGImage}) bottom / cover`,
    lg: `url(${IntroDesktopBGImage}) bottom / cover`
  },
  color: 'black',
  justifyContent: 'center',
  pt: '100px',
  h: '250px',
  minH: '250px',
  textAlign: 'center',
};

export const SearchBarWrapperStyle: BoxProps = {
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

export const FiltersStickyWrapper: BoxProps = {
  my: '20px',
  p: '20px !important',
  position: 'sticky',
  top: '-1px',
  transition: '200ms',
  w: '100%',
  zIndex: 30,
};

export const FiltersContainer: ContainerProps = {
  maxW: '1360px',
  py: '0 !important',
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
}

export const FiltersWrapper: BoxProps = {
  sx: {
    '> button, a': {
      mr: '14px',
    },
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
