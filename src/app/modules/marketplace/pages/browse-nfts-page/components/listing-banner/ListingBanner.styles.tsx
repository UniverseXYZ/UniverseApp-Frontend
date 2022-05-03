import { BoxProps } from '@chakra-ui/react';

import NoiseTextureImage from '@assets/images/v2/marketplace/noise_texture.png';

export const BannerWrapperStyle: BoxProps = {
  bg: `linear-gradient(92.86deg, #D5ACFD -3.25%, #ABB3FC 49.31%, #81EEBF 104.41%)`,
  borderRadius: '12px',
  position: 'relative',
  filter: 'drop-shadow(0px 10px 36px rgba(136, 120, 172, 0.14))',
  mt: '60px',
  p: {
    sm: '30px',
    md: '60px'
  },

  _before: {
    bg: `url(${NoiseTextureImage}) center / 20%, linear-gradient(92.86deg, #D5ACFD -3.25%, #ABB3FC 49.31%, #81EEBF 104.41%)`,
    borderRadius: 'inherit',
    position: 'absolute',
    backgroundBlendMode: 'overlay',
    top: 0,
    left: 0,
    w: '100%',
    h: '100%',
    content: '""',
    opacity: 0.3,
    zIndex: -1,
  }
};
