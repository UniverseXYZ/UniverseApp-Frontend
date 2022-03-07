import { BoxProps } from '@chakra-ui/react';

import IntroMobileBGImage from '../../../../../../assets/images/v2/marketplace/img_hero_mobile.png';
import IntroTabletBGImage from '../../../../../../assets/images/v2/marketplace/img_hero_tablet.png';
import IntroDesktopBGImage from '../../../../../../assets/images/v2/marketplace/img_hero_desktop.png';

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
