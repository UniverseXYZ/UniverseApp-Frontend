import { ImageProps } from '@chakra-ui/react';

export const SliderPreviewImageStyle: ImageProps = {
  borderRadius: '12px',
  cursor: 'pointer',
  opacity: 0.2,
  mr: '12px',
  padding: '3px',

  sx: {
    img: {
      borderRadius: '9px',
      objectFit: 'cover',
      h: '64px',
      w: '64px',
    },
    video: {
      borderRadius: '9px',
      objectFit: 'cover',
      h: '64px',
      w: '64px',
    },
  },

  _hover: {
    opacity: 1,
  },

  _selected: {
    bg: 'linear-gradient(145deg, #bceb00 15.57%, #00eaea 84.88%)',
    opacity: 1,
  },

  _last: {
    mr: 0,
  },
};
