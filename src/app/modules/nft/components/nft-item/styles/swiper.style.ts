import { BoxProps } from '@chakra-ui/react';

import ArrowLeftIcon from '../../../../../../assets/images/marketplace/bundles-left-arrow.svg';
import ArrowRightIcon from '../../../../../../assets/images/marketplace/bundles-right-arrow.svg';

export const getSwiperArrowStyle = (icon: string) => ({
  bg: 'white',
  borderRadius: '50%',
  opacity: 0.4,
  height: '30px',
  width: '30px',
  mt: '-15px',
  _after: {
    bg: `url(${icon}) no-repeat center`,
    content: '""',
    fontFamily: 'inherit',
    h: 'inherit',
    w: 'inherit',
  },
  _hover: {
    opacity: 0.6,
  },
});


export const SwiperStyle: BoxProps = {
  sx: {
    '.swiper-button-prev': getSwiperArrowStyle(ArrowLeftIcon),
    '.swiper-button-next': getSwiperArrowStyle(ArrowRightIcon),
    '.swiper-pagination-bullet': {
      bg: 'white',
      opacity: 0.4,
    },
    '.swiper-pagination-bullet-active': {
      bg: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
      opacity: 1,
    },
  }
};
